"use client"

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import type * as React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

export type ScrollAccordionItem = {
  id: string
  title: string
  description?: string
  image: string
  /** Optional per-item icon. Prefer `renderIcon` when icons are shared/index-based. */
  icon?: React.ReactNode
}

export type ScrollAccordionStickyOffsets = {
  /** < md */
  mobile?: number
  /** md – lg */
  md?: number
  /** ≥ lg */
  lg?: number
}

export type ScrollAccordionSectionProps = {
  items: ScrollAccordionItem[]
  title: React.ReactNode
  eyebrow?: React.ReactNode
  /** Raw eyebrow text — wrapped in default Eyebrow when `eyebrow` is omitted. */
  eyebrowText?: string
  className?: string
  containerClassName?: string
  stickyClassName?: string
  gridClassName?: string
  headerClassName?: string
  accordionClassName?: string
  accordionItemClassName?: string
  imageWrapperClassName?: string
  imageClassName?: string
  titleClassName?: string
  itemTitleClassName?: string
  itemDescriptionClassName?: string
  navTheme?: "dark" | "light"
  backgroundColor?: string
  titleColor?: string
  highlightGradient?: string
  /** Viewport-heights per accordion step (default 0.5). */
  stepViewportRatio?: number
  /** Extra viewport buffer after the last step (default 0.5). */
  endBufferRatio?: number
  stickyOffsets?: ScrollAccordionStickyOffsets
  /** Show the absolute nav-theme trigger at the section bottom (md+). */
  showNavThemeTrigger?: boolean
  initialIndex?: number
  renderIcon?: (index: number, isOpen: boolean) => React.ReactNode
  /** Optional header slot override (replaces default SectionHeader). */
  header?: React.ReactNode
}

const DEFAULT_OFFSETS: Required<ScrollAccordionStickyOffsets> = {
  mobile: 56,
  md: 56,
  lg: 80,
}

const MD_MIN = 768
const LG_MIN = 1024

function getStickyOffset(
  width: number,
  offsets: Required<ScrollAccordionStickyOffsets>
) {
  if (width >= LG_MIN) return offsets.lg
  if (width >= MD_MIN) return offsets.md
  return offsets.mobile
}

/**
 * Sticky scroll-scrubbed accordion + image showcase.
 * Mobile: header scrolls away first, then a pinned panel scrubs items/images
 * without nested scrollbars. Image fills remaining space with object-contain.
 * md+: same two-column sticky scrub as the original Deep Dive.
 */
export function ScrollAccordionSection({
  items,
  title,
  eyebrow,
  eyebrowText,
  className,
  containerClassName,
  stickyClassName,
  gridClassName,
  headerClassName,
  accordionClassName,
  accordionItemClassName,
  imageWrapperClassName,
  imageClassName,
  titleClassName,
  itemTitleClassName,
  itemDescriptionClassName,
  navTheme = "dark",
  backgroundColor = "#010C28",
  titleColor = "#FFFFFF",
  highlightGradient = "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
  stepViewportRatio = 0.5,
  endBufferRatio = 0.5,
  stickyOffsets: stickyOffsetsProp,
  showNavThemeTrigger = true,
  initialIndex = 0,
  renderIcon,
  header,
}: ScrollAccordionSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, Math.min(items.length - 1, initialIndex))
  )

  const offsets: Required<ScrollAccordionStickyOffsets> = {
    ...DEFAULT_OFFSETS,
    ...stickyOffsetsProp,
  }

  const itemCount = Math.max(1, items.length)
  const stepsPerSection = itemCount * stepViewportRatio + endBufferRatio

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${offsets.mobile}px`, "end end"],
  })

  const indexMotion = useTransform(scrollYProgress, [0, 1], [0, itemCount])

  useMotionValueEvent(indexMotion, "change", (latest) => {
    const next = Math.max(0, Math.min(itemCount - 1, Math.round(latest)))
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const scrollToFeature = useCallback((
    index: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const el = sectionRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const stickyOffset = getStickyOffset(window.innerWidth, offsets)
    const pinStart = sectionTop - stickyOffset
    const scrollableDistance =
      el.offsetHeight - (window.innerHeight - stickyOffset)
    const progress = index / itemCount

    window.scrollTo({
      top: pinStart + scrollableDistance * progress,
      behavior,
    })
  }, [itemCount, offsets])

  const wheelCooldownRef = useRef(0)
  const exitLockoutRef = useRef(0)

  // Discrete wheel stepping — md+ only. Mobile/touch uses native scroll scrub.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const COOLDOWN_MS = 800
    const EXIT_LOCKOUT_MS = 1000

    const isPinned = () => {
      if (window.innerWidth < MD_MIN) return false

      const rect = el.getBoundingClientRect()
      const stickyOffset = getStickyOffset(window.innerWidth, offsets)

      return (
        rect.top <= stickyOffset + 1 && rect.bottom >= window.innerHeight - 1
      )
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isPinned()) return

      const now = performance.now()
      if (now < exitLockoutRef.current) return

      const direction = Math.sign(e.deltaY)
      if (direction === 0) return

      const target = activeIndex + direction
      if (target < 0 || target >= itemCount) {
        exitLockoutRef.current = now + EXIT_LOCKOUT_MS
        return
      }

      if (now < wheelCooldownRef.current) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      wheelCooldownRef.current = now + COOLDOWN_MS
      // scrollToFeature(target, "instant")
      scrollToFeature(target, "smooth")
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeIndex, itemCount, offsets.lg, offsets.md, offsets.mobile])

  const resolvedEyebrow = useMemo(() =>
    eyebrow ??
    (eyebrowText ? (
      <Eyebrow
        className="mb-0 pt-0"
        showDot
        style={
          {
            "--eyebrow-color": "#ED862E",
            "--eyebrow-dot-color": "#ED862E",
          } as React.CSSProperties
        }
      >
        {eyebrowText}
      </Eyebrow>
    ) : undefined), [eyebrow, eyebrowText])

  const headerNode = useMemo(() =>
    header ??
    (title ? (
      <SectionHeader
        className={cn(
          "mb-0 items-start text-left md:mb-[12px] lg:mb-2 xl:mb-[12px]",
          headerClassName
        )}
        titleColor={titleColor}
        highlightGradient={highlightGradient}
        eyebrow={resolvedEyebrow}
        title={title}
        titleClassName={cn(
          "mb-0 text-[22px] leading-[1.15] tracking-tight md:text-[28px] lg:text-[28px] xl:text-[inherit] xl:leading-[inherit] xl:tracking-normal",
          titleClassName
        )}
      />
    ) : null), [header, title, headerClassName, titleColor, highlightGradient, resolvedEyebrow, titleClassName])

  const activeItem = items[activeIndex] ?? items[0]

  const renderAccordion = useCallback(() => (
    <div
      className={cn(
        "flex flex-col gap-1.5 md:gap-2 lg:gap-1.5 xl:gap-3",
        accordionClassName
      )}
    >
      {items.map((item, index) => {
        const isOpen = activeIndex === index
        const icon =
          item.icon ?? renderIcon?.(index, isOpen) ?? (
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded border text-sm font-semibold",
                isOpen
                  ? "border-[#ED862E] text-[#ED862E]"
                  : "border-white/20 text-[#94A3B8]"
              )}
            >
              {index + 1}
            </span>
          )

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={item.id}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            className={cn(
              "relative flex shrink-0 flex-col rounded-[8px] transition-all duration-300",
              !isOpen && "border border-white/5 bg-transparent",
              accordionItemClassName
            )}
            onClick={() => scrollToFeature(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                scrollToFeature(index)
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-0 z-0 rounded-[8px] transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="absolute inset-0 rounded-[8px] bg-gradient-to-r from-[rgba(237,134,46,0.08)] to-transparent" />
              <div
                className="absolute inset-0 rounded-[8px] bg-gradient-to-r from-[#ED862E] to-transparent p-[1px]"
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
            </div>

            <div
              className={cn(
                "relative z-10 flex gap-[10px] py-[8px] pr-3 pl-[10px] transition-all duration-300 select-none md:gap-[12px] md:py-[10px] md:pr-4 md:pl-[12px] lg:gap-[12px] lg:py-2 lg:pr-5 lg:pl-[14px] xl:gap-[14px] xl:py-[14px] xl:pr-[31px] xl:pl-[16px]",
                isOpen ? "items-start" : "items-center"
              )}
            >
              <div
                className={cn(
                  "shrink-0 scale-[0.92] transition-all duration-300 md:scale-100",
                  isOpen ? "opacity-100" : "opacity-50 grayscale"
                )}
              >
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className={cn(
                    "typo-body5 break-words transition-colors duration-300",
                    isOpen
                      ? "mb-1 font-bold text-white md:mb-1.5 xl:mb-[10px]"
                      : "mb-0 text-[#94A3B8]",
                    itemTitleClassName
                  )}
                >
                  {item.title}
                </h3>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p
                      className={cn(
                        "typo-body3 text-sm md:text-[16px] pb-1 break-words text-white/60",
                        itemDescriptionClassName
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  ), [items, activeIndex, accordionClassName, accordionItemClassName, itemTitleClassName, itemDescriptionClassName, renderIcon, scrollToFeature])

  const renderImage = useCallback((mobile: boolean) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        mobile
          ? // Mobile: claim leftover sticky space but cap at 40vh to avoid oversized images on tall phones
            "relative min-h-0 w-full flex-1 max-h-[40vh] overflow-hidden rounded-[16px]"
          : // md+: fill left grid column
            "relative hidden h-full min-h-0 w-full self-center overflow-hidden rounded-[24px] md:block",
        imageWrapperClassName
      )}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index
        const yOffset = index < activeIndex ? -16 : 16

        return (
          <motion.img
            key={`${mobile ? "m" : "d"}-${item.id}`}
            src={item.image}
            alt={item.title}
            initial={false}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              y: isActive ? 0 : yOffset,
              zIndex: isActive ? 10 : 0
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "absolute inset-0 h-full w-full object-contain object-center",
              imageClassName
            )}
            style={{ pointerEvents: isActive ? "auto" : "none" }}
          />
        )
      })}
    </motion.div>
  ), [items, activeIndex, imageWrapperClassName, imageClassName])

  return (
    <section
      ref={sectionRef}
      data-nav-theme={navTheme}
      className={cn(
        "relative w-full",
        // Extra track on mobile so the intro header can scroll away before pin
        "max-md:[height:calc(100dvh*var(--sa-steps)+22vh)] md:[height:calc(100dvh*var(--sa-steps))]",
        className
      )}
      style={
        {
          backgroundColor,
          "--sa-steps": stepsPerSection,
        } as React.CSSProperties
      }
    >
      {/* Mobile intro header — normal flow, scrolls out before the panel pins */}
      <div className="px-4 py-6 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          {headerNode}
        </motion.div>
      </div>

      <div
        className={cn(
          "sticky top-[56px] flex h-[calc(100dvh-56px)] w-full flex-col overflow-hidden lg:top-20 lg:h-[calc(100dvh-80px)]",
          stickyClassName
        )}
      >
        {/* ── Mobile sticky panel: accordion (natural) + image (flex fill) ── */}
        <div className="mx-auto flex h-full min-h-0 w-full max-w-[1440px] flex-col justify-center gap-3 px-4 py-3 pb-5 md:hidden">
          <div className="shrink-0">{renderAccordion()}</div>
          {renderImage(true)}
        </div>

        {/* ── md+ sticky panel: original 2-column layout ── */}
        <div
          className={cn(
            "mx-auto hidden h-full min-h-0 w-full max-w-[1440px] flex-col justify-center px-4 py-8 transition-all duration-500 ease-in-out md:flex lg:px-[65px] lg:py-10 lg:pr-[80px] xl:py-12",
            containerClassName
          )}
        >
          <div
            className={cn(
              "grid h-full min-h-0 flex-1 grid-cols-2 content-center items-center gap-x-10 lg:gap-x-12 xl:gap-x-[80px]",
              gridClassName
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={cn(
                "col-start-2 row-start-1 self-start",
                headerClassName
              )}
            >
              {headerNode}
            </motion.div>

            <div className="col-start-2 row-start-2 self-start">
              {renderAccordion()}
            </div>

            <div className="col-start-1 row-span-2 row-start-1 h-full min-h-0 self-center">
              {renderImage(false)}
            </div>
          </div>
        </div>
      </div>

      {showNavThemeTrigger ? (
        <div
          data-nav-theme={navTheme}
          className="pointer-events-none absolute bottom-0 left-0 hidden w-full md:block"
          style={{ height: `calc(100dvh - ${offsets.lg}px)` }}
        />
      ) : null}
    </section>
  )
}
