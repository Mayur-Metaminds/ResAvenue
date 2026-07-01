"use client"

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import * as React from "react"
import { useRef } from "react"

import { SectionHeader, type SectionHeaderProps } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

/** Where a card sits around the center image on desktop. Also drives reveal order. */
export type CardPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export interface ScrollRevealCard {
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  /** Where the card sits around the image AND its order in the scroll reveal. */
  position: CardPosition
  /**
   * Optional override for the desktop "break the grid" translate offset.
   * Defaults are picked per position to nudge cards toward/away from the image.
   */
  offsetClassName?: string
}

export interface ScrollRevealShowcaseProps {
  /** Optional header rendered above the showcase. */
  header?: SectionHeaderProps
  /** Up to 4 cards, one per position. Reveal order: TL → TR → BL → BR. */
  cards: ScrollRevealCard[]
  /** The center image. */
  image: { src: string; alt: string }
  /** Section background utility class (default light). */
  bgClassName?: string
  /** Extra classes for the center image frame. */
  imageClassName?: string
  /** Extra classes for the cards layout wrapper (left/center/right grid + mobile stack). Merged on top of the default layout classes. */
  cardsWrapperClassName?: string
  /** Extra classes for each individual card (the icon+title+description block). Applied to every desktop card in this showcase — e.g. to give them a bordered/white "card" look, or switch from the default vertical (icon-on-top) layout to a horizontal one (icon-beside-text) via `flex-row`. */
  cardClassName?: string
  /** Extra classes for the icon's wrapper box on desktop cards — e.g. to give it a colored rounded badge background behind the icon. */
  iconWrapperClassName?: string
  /** Extra classes for the icon's wrapper box in the mobile/tablet stacked list (below `lg`). Defaults to a 24px icon; pass e.g. `"[&>svg]:w-10 [&>svg]:h-10"` to size up. */
  mobileIconWrapperClassName?: string
  /** Extra classes for the title+description wrapper — controls the gap between title and description independent of the icon/text gap. */
  textWrapperClassName?: string
  /** Extra classes for the feature title `<h3>`, applied on both desktop cards and the mobile stacked list. */
  featureTitleClassName?: string
  /** Extra classes for the feature description `<p>`, applied on both desktop cards and the mobile stacked list. */
  descriptionClassName?: string
  /** The hex color used for the active/highlighted state (e.g. icons, active title). Defaults to #ED862E. */
  activeColor?: string
  /** The hex color used for the inactive state (e.g. inactive mobile titles). Defaults to #94A3B8. */
  inactiveColor?: string
}

// Canonical reading-flow order for positions. This is used to SORT the cards
// that are actually present — it is no longer used directly as the numeric
// scroll "step", since that must be re-indexed to however many cards exist
// (see `useRevealSteps` below). Otherwise a card whose canonical slot is 3
// (bottom-right) but which is, say, the 3rd of only 3 cards passed in, would
// never reach an achievable scroll step and would stay invisible forever.
const POSITION_ORDER: Record<CardPosition, number> = {
  "top-left": 0,
  "top-right": 1,
  "bottom-left": 2,
  "bottom-right": 3,
}

// No per-position nudge by default: both cards on each side share the same x
// (stacked one below the other). Distance from the image is the column gap.
// Callers can still pass `offsetClassName` to break the grid per card.
const DEFAULT_OFFSET: Record<CardPosition, string> = {
  "top-left": "",
  "top-right": "",
  "bottom-left": "",
  "bottom-right": "",
}

/**
 * Re-indexes whichever positions are actually present (in canonical
 * reading-flow order) to consecutive integers 0..N-1. This guarantees every
 * card's reveal step falls within the achievable `progress` range of
 * `[0, cards.length]`, regardless of which positions were skipped.
 */
function useRevealSteps(cards: ScrollRevealCard[]): Partial<Record<CardPosition, number>> {
  return React.useMemo(() => {
    const present = (Object.keys(POSITION_ORDER) as CardPosition[])
      .filter((pos) => cards.some((c) => c.position === pos))
      .sort((a, b) => POSITION_ORDER[a] - POSITION_ORDER[b])

    return Object.fromEntries(present.map((pos, i) => [pos, i]))
  }, [cards])
}

export function ScrollRevealShowcase({
  header,
  cards,
  image,
  bgClassName = "bg-[#FAFAFA]",
  imageClassName,
  cardsWrapperClassName,
  cardClassName,
  iconWrapperClassName,
  mobileIconWrapperClassName,
  textWrapperClassName,
  featureTitleClassName,
  descriptionClassName,
  activeColor = "#ED862E",
  inactiveColor = "#94A3B8",
}: ScrollRevealShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Map the sticky scroll range to one logical step per card. Each card reveals
  // from the START of its step (so the first scroll tick after the section
  // sticks immediately starts revealing the first card).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const progress = useTransform(smoothScrollY, [0, 1], [0, cards.length])

  const revealSteps = useRevealSteps(cards)

  const cardAt = (position: CardPosition) => cards.find((c) => c.position === position)
  const leftCards = ["top-left", "bottom-left"].map((p) => cardAt(p as CardPosition))
  const rightCards = ["top-right", "bottom-right"].map((p) => cardAt(p as CardPosition))

  // Mobile list follows the same reveal order as desktop.
  const mobileCards = [...cards].sort(
    (a, b) => POSITION_ORDER[a.position] - POSITION_ORDER[b.position]
  )

  return (
    <section
      className={cn("relative w-full lg:h-[var(--desktop-height)]", bgClassName)}
      ref={containerRef}
      style={{ '--desktop-height': `${cards.length * 100}vh` } as React.CSSProperties}
    >
      {/* Sticky pinned frame at every size on desktop. On phones it flows normally. */}
      <div className="lg:sticky lg:top-0 lg:left-0 flex lg:h-dvh w-full flex-col items-start justify-start lg:overflow-hidden">
        <div className="container mx-auto flex h-full flex-col items-start justify-start ">
          {header && (
            <div className="mx-auto mb-[32px] md:mb-[27.56px] w-full">
              <SectionHeader {...header} />
            </div>
          )}

          {/* Grid Layout (Desktop Sticky, Mobile Stacked via Tailwind) */}
          <div
            className={cn(
              "relative flex w-full flex-col items-center max-w-[1440px] mx-auto justify-between gap-3 md:gap-8 lg:flex-row lg:items-stretch lg:gap-12.5 lg:flex-1 lg:min-h-0 lg:pb-8",
              cardsWrapperClassName
            )}
          >
            {/* Left Features */}
            <div className="hidden w-full flex-col justify-center gap-[40px] lg:flex lg:w-1/4">
              {leftCards.map(
                (card) =>
                  card && (
                    <RevealCard
                      key={card.position}
                      progress={progress}
                      card={card}
                      activeColor={activeColor}
                      step={revealSteps[card.position] ?? 0}
                      cardClassName={cardClassName}
                      iconWrapperClassName={iconWrapperClassName}
                      textWrapperClassName={textWrapperClassName}
                      featureTitleClassName={featureTitleClassName}
                      descriptionClassName={descriptionClassName}
                    />
                  )
              )}
            </div>

            {/* Center Image — only shown at lg, where the side-card grid layout
                is active. Below lg the stacked list is the layout, so the image
                is hidden to keep all 4 points within the pinned screen (it was
                clipping them at the md/tablet breakpoint). */}
            <div className="relative z-10 hidden h-full w-full lg:flex lg:items-center lg:justify-center lg:w-2/4">
              <div
                className={cn(
                  "relative mx-auto w-full aspect-[4/3] max-h-[60vh] xl:max-h-[70vh] 3xl:max-h-[800px] overflow-hidden rounded-[16px]",
                  imageClassName
                )}
              >
                {/* Fallback gradient before the image loads */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            </div>

            {/* Right Features */}
            <div className="hidden w-full flex-col justify-center gap-[40px] lg:flex lg:w-1/4">
              {rightCards.map(
                (card) =>
                  card && (
                    <RevealCard
                      key={card.position}
                      progress={progress}
                      card={card}
                      activeColor={activeColor}
                      step={revealSteps[card.position] ?? 0}
                      cardClassName={cardClassName}
                      iconWrapperClassName={iconWrapperClassName}
                      textWrapperClassName={textWrapperClassName}
                      featureTitleClassName={featureTitleClassName}
                      descriptionClassName={descriptionClassName}
                    />
                  )
              )}
            </div>

            {/* Mobile/Tablet Layout (Scroll Highlighted List) */}
            <div className="flex w-full flex-col gap-[32px]  lg:hidden mt-0 md:mt-4">
              {/* Mobile Image */}
              <div className="flex flex-col h-[225px] py-[24px] justify-center items-center self-stretch rounded-t-[16px] border-[3px] border-[rgba(1,14,56,0.05)] relative overflow-hidden shrink-0 mb-2">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                <Image src={image.src} alt={image.alt} fill className="object-cover object-center" />
              </div>

              {/* Each card owns the progress slice [i, i+1] (progress spans
                  [0, cards.length]). This keeps every card's deactivation point
                  within range — so the second-last greys out when the last
                  gains focus, instead of the window running past max progress. */}
              {mobileCards.map((card, i) => (
                <MobileFeatureItem
                  key={card.position}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  activeColor={activeColor}
                  inactiveColor={inactiveColor}
                  featureTitleClassName={featureTitleClassName}
                  descriptionClassName={descriptionClassName}
                  iconWrapperClassName={mobileIconWrapperClassName}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RevealCard({
  progress,
  card,
  activeColor,
  step,
  cardClassName,
  iconWrapperClassName,
  textWrapperClassName,
  featureTitleClassName,
  descriptionClassName,
}: {
  progress: MotionValue<number>
  card: ScrollRevealCard
  activeColor: string
  step: number
  cardClassName?: string
  iconWrapperClassName?: string
  textWrapperClassName?: string
  featureTitleClassName?: string
  descriptionClassName?: string
}) {
  // Fade + slide up over the first 80% of the card's step, leaving a brief
  // "settle" tail before the next card starts.
  const opacity = useTransform(progress, [step, step + 0.8], [0, 1])
  const y = useTransform(progress, [step, step + 0.8], [40, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "flex flex-col items-start gap-[12px] pt-[8px]",
        card.offsetClassName ?? DEFAULT_OFFSET[card.position],
        cardClassName
      )}
    >
      <div
        className={cn(
          "flex items-center justify-start w-8 h-8",
          iconWrapperClassName
        )}
        style={{ color: activeColor }}
      >
        {card.icon}
      </div>
      <div className={cn("flex flex-col items-start gap-[12px]", textWrapperClassName)}>
        <h3 className={cn("typo-h2 text-[#191C1E]", featureTitleClassName)}>{card.title}</h3>
        <p className={cn("typo-body1 text-[#464554]", descriptionClassName)}>{card.description}</p>
      </div>
    </motion.div>
  )
}

function MobileFeatureItem({
  icon,
  title,
  description,
  activeColor,
  featureTitleClassName,
  descriptionClassName,
  iconWrapperClassName,
}: {
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  activeColor: string
  inactiveColor?: string
  featureTitleClassName?: string
  descriptionClassName?: string
  iconWrapperClassName?: string
}) {
  return (
    <div className="flex flex-col items-start gap-[8px]">
      <div
        className={cn("flex items-center justify-start [&>svg]:w-6 [&>svg]:h-6", iconWrapperClassName)}
        style={{ color: activeColor }}
      >
        {icon}
      </div>
      <h3 className={cn("typo-h2 text-[#191C1E]", featureTitleClassName)}>
        {title}
      </h3>
      <p className={cn("font-source-sans-400 text-[14px] leading-[22.4px] text-[#464554]", descriptionClassName)}>{description}</p>
    </div>
  )
}