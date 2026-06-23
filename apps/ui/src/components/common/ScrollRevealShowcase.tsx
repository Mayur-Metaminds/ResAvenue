"use client"

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
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
}

// Reveal order follows reading-flow. Each position maps to a logical scroll
// "step": card N fades + slides up over the first 80% of step N.
const REVEAL_STEP: Record<CardPosition, number> = {
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

export function ScrollRevealShowcase({
  header,
  cards,
  image,
  bgClassName = "bg-[#FAFAFA]",
  imageClassName,
}: ScrollRevealShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Map the sticky scroll range to one logical step per card. Each card reveals
  // from the START of its step (so the first scroll tick after the section
  // sticks immediately starts revealing the first card).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, cards.length])

  const cardAt = (position: CardPosition) => cards.find((c) => c.position === position)
  const leftCards = ["top-left", "bottom-left"].map((p) => cardAt(p as CardPosition))
  const rightCards = ["top-right", "bottom-right"].map((p) => cardAt(p as CardPosition))

  // Mobile list follows the same reveal order as desktop.
  const mobileCards = [...cards].sort(
    (a, b) => REVEAL_STEP[a.position] - REVEAL_STEP[b.position]
  )

  return (
    <section
      className={cn("relative w-full", bgClassName)}
      ref={containerRef}
      style={{ height: `${cards.length * 100}vh` }}
    >
      {/* Sticky pinned frame at every size. On phones the image is hidden (below)
          so the header + all 4 points fit on one screen and the scroll-driven
          focus can move through them while pinned. */}
      <div className="sticky top-0 left-0 flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-10 md:px-8 md:py-0">
        <div className="container mx-auto max-w-[1200px]">
          {header && (
            <div className="mx-auto mb-2 md:mb-16 w-full max-w-3xl">
              <SectionHeader {...header} />
            </div>
          )}

          {/* Grid Layout (Desktop Sticky, Mobile Stacked via Tailwind) */}
          <div className="relative flex flex-col items-center justify-between gap-3 md:gap-8 lg:flex-row lg:items-center lg:gap-12.5">
            {/* Left Features */}
            <div className="hidden w-full flex-col gap-16 lg:flex lg:w-1/4">
              {leftCards.map(
                (card) =>
                  card && <RevealCard key={card.position} progress={progress} card={card} />
              )}
            </div>

            {/* Center Image — only shown at lg, where the side-card grid layout
                is active. Below lg the stacked list is the layout, so the image
                is hidden to keep all 4 points within the pinned screen (it was
                clipping them at the md/tablet breakpoint). */}
            <div className="relative z-10 hidden w-full lg:block lg:w-2/4">
              <div
                className={cn(
                  "relative mx-auto aspect-[16/9] md:aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl",
                  imageClassName
                )}
              >
                {/* Fallback gradient before the image loads */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
            </div>

            {/* Right Features */}
            <div className="hidden w-full flex-col gap-16 lg:flex lg:w-1/4">
              {rightCards.map(
                (card) =>
                  card && <RevealCard key={card.position} progress={progress} card={card} />
              )}
            </div>

            {/* Mobile/Tablet Layout (Scroll Highlighted List) */}
            <div className="flex w-full flex-col gap-2 md:gap-6 lg:hidden mt-0 md:mt-4">
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
                  progress={progress}
                  activeRange={[i, i + 1]}
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
}: {
  progress: MotionValue<number>
  card: ScrollRevealCard
}) {
  const step = REVEAL_STEP[card.position]
  // Fade + slide up over the first 80% of the card's step, leaving a brief
  // "settle" tail before the next card starts.
  const opacity = useTransform(progress, [step, step + 0.8], [0, 1])
  const y = useTransform(progress, [step, step + 0.8], [40, 0])

  return (
    <motion.div
      style={{ opacity, y }}
      className={cn(
        "flex flex-col items-start gap-4",
        card.offsetClassName ?? DEFAULT_OFFSET[card.position]
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#ED862E] shadow-sm">
        {card.icon}
      </div>
      <h3 className="text-xl font-bold text-[#1E293B]">{card.title}</h3>
      <p className="text-sm text-[#64748B]">{card.description}</p>
    </motion.div>
  )
}

function MobileFeatureItem({
  icon,
  title,
  description,
  progress,
  activeRange,
}: {
  icon: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  progress: MotionValue<number>
  activeRange: [number, number]
}) {
  // Opacity peaks when progress is within the activeRange.
  const opacity = useTransform(
    progress,
    [activeRange[0] - 0.5, activeRange[0], activeRange[1], activeRange[1] + 0.5],
    [0.4, 1, 1, 0.4]
  )

  // Title color transitions to brand orange when active.
  const color = useTransform(
    progress,
    [activeRange[0] - 0.5, activeRange[0], activeRange[1], activeRange[1] + 0.5],
    ["#94A3B8", "#ED862E", "#ED862E", "#94A3B8"]
  )

  return (
    <motion.div style={{ opacity }} className="flex flex-col items-start gap-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#ED862E] shadow-sm mb-1 border border-gray-100">
        {icon}
      </div>
      <motion.h3 style={{ color }} className="text-base font-bold leading-tight">
        {title}
      </motion.h3>
      <p className="text-xs leading-snug text-[#64748B]">{description}</p>
    </motion.div>
  )
}
