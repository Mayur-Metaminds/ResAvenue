"use client"

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  AnimatePresence,
  motion
} from "framer-motion"
import { useRef, useState, useEffect } from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"
import { NumberIcon1, NumberIcon2, NumberIcon3, NumberIcon4 } from "../../../public/svg/Direct-Connect"

type AccordionItemData = {
  id: string
  title: string
  description?: string
  image: string
}

const accordionData: AccordionItemData[] = [
  {
    id: "item-1",
    title: "Easy Mobile Bookings",
    description:
      "Make it simple for guests no matter where they are with a seamless 2-step mobile booking experience.",
    image: "/images/DeepDiveSectionImg.png"
  },
  {
    id: "item-2",
    title: "Real-time Sync",
    description:
      "Ensure your inventory is perfectly synced across all channels, avoiding double bookings and maintaining accurate availability.",
    image: "/images/Direct-Connect/Booking-Engine.png"
  },
  {
    id: "item-3",
    title: "Dynamic Pricing Logic",
    description:
      "Automatically adjust your rates based on demand, seasonality, and competitor analysis to maximize your RevPAR.",
    image: "/images/Direct-Connect/Unified-Intelligence-Dashboard.png"
  },
  {
    id: "item-4",
    title: "Simple payment processing",
    description:
      "Offer multiple payment gateways and currencies to provide a frictionless checkout experience for your global guests.",
    image: "/images/DeepDiveSectionImg.png"
  },
]

export function DirectConnectDeepDiveSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // One viewport of page scroll per accordion step + 1 buffer step at the end.
  // The buffer ensures the last item doesn't instantly unpin upon reaching it.
  const stepsPerSection = Math.max(1, accordionData.length) + 1
  const sectionHeight = `${stepsPerSection * 100}vh`

  // Scroll progress 0→1 across the section: 0 when the section top hits the
  // viewport top (sticky pinning starts), 1 when the section bottom hits the
  // viewport bottom (sticky pinning ends).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  
  const indexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, accordionData.length]
  )
  
  useMotionValueEvent(indexMotion, "change", (latest) => {
    const next = Math.max(
      0,
      Math.min(accordionData.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  // Smooth scroll to the exact viewport position for a given accordion item
  const scrollToFeature = (index: number, behavior: ScrollBehavior = "smooth") => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const scrollableDistance = el.offsetHeight - window.innerHeight
    const progress = index / accordionData.length
    
    window.scrollTo({ 
      top: sectionTop + scrollableDistance * progress, 
      behavior 
    })
  }

  const wheelCooldownRef = useRef(0)
  const exitLockoutRef = useRef(0)

  // Wheel/trackpad hijacking — while the section is pinned, swallow wheel
  // events and snap exactly one step at a time to prevent flickering and
  // ensure smooth transitions between accordion items.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const COOLDOWN_MS = 800
    const EXIT_LOCKOUT_MS = 1000

    const isPinned = () => {
      const rect = el.getBoundingClientRect()
      // Allow 1px tolerance for browser subpixel layout rounding
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isPinned()) return

      const now = performance.now()

      if (now < exitLockoutRef.current) return

      const direction = Math.sign(e.deltaY)
      if (direction === 0) return

      const target = activeIndex + direction
      // Boundaries: let the user scroll out of the section naturally
      if (target < 0 || target >= accordionData.length) {
        exitLockoutRef.current = now + EXIT_LOCKOUT_MS
        return
      }

      if (now < wheelCooldownRef.current) {
        e.preventDefault()
        return
      }

      e.preventDefault()
      wheelCooldownRef.current = now + COOLDOWN_MS
      scrollToFeature(target, "instant")
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="relative w-full"
      style={{ height: sectionHeight }}
    >
      {/* Sticky inner — pins below the fixed navbar for the full outer-section
          height. We use items-start on mobile so the top is never cut off,
          and highly compact spacing to ensure the image at the bottom fits. */}
      <div className="sticky top-24 lg:top-20 flex h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-5rem)] w-full flex-col items-center justify-start lg:justify-center">
        <div className="w-full rounded-[32px] bg-[#010C28] px-4 py-[16px] transition-all duration-500 ease-in-out lg:rounded-[45px] lg:px-[65px] lg:py-[60px] lg:pr-[80px]">
          <div className="grid grid-cols-1 items-center gap-[16px] lg:grid-cols-2 lg:gap-[80px]">
            {/* Left Column: Image Graphic */}
            <div className="relative order-2 flex aspect-video lg:aspect-square w-full items-center justify-center rounded-[24px] lg:order-1">
              <AnimatePresence>
                {(() => {
                  // activeIndex is clamped to [0, accordionData.length - 1] in
                  // useMotionValueEvent so it's always a valid index — but TS
                  // doesn't know that under noUncheckedIndexedAccess. Fall back
                  // to the first item just in case.
                  const item = accordionData[activeIndex] ?? accordionData[0]
                  if (!item) return null
                  return (
                    <motion.img
                      key={activeIndex}
                      src={item.image}
                      alt={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  )
                })()}
              </AnimatePresence>
            </div>

            {/* Right Column: Content & Accordion */}
            <div className="order-1 flex w-full flex-col lg:order-2">
              {/* Header */}
              <SectionHeader
                className="mb-[12px] lg:mb-[38px] items-start text-left"
                titleColor="#FFFFFF"
                highlightGradient="linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)"
                eyebrow={
                  <Eyebrow
                    className="mb-0"
                    showDot
                    style={
                      {
                        "--eyebrow-color": "#ED862E",
                        "--eyebrow-dot-color": "#ED862E",
                      } as React.CSSProperties
                    }
                  >
                    DEEP DIVE
                  </Eyebrow>
                }
                title={
                  <>
                    The Fastest Booking <br />
                    <SectionHeader.Highlight>
                      Experience on the Market.
                    </SectionHeader.Highlight>
                  </>
                }
                titleClassName="mb-0"
              />

              {/* Accordion */}
              <div className="flex flex-col gap-3">
                {accordionData.map((item, index) => {
                  const isOpen = activeIndex === index

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "flex flex-col overflow-hidden rounded-[16px] border transition-all duration-300",
                        isOpen
                          ? "border-white/10 bg-[#061435]"
                          : "border-white/5 bg-transparent"
                      )}
                      onClick={() => scrollToFeature(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={cn(
                        "flex gap-[12px] py-[10px] pl-[12px] pr-[7px] select-none transition-all duration-300 lg:gap-[14px] lg:py-[16px] lg:pl-[16px] lg:pr-[31px]",
                        isOpen ? "items-start" : "items-center"
                      )}>
                        <div
                          className={cn(
                            "shrink-0 transition-all duration-300",
                            isOpen
                              ? "opacity-100"
                              : "opacity-50 grayscale"
                          )}
                        >
                          {index === 0 && <NumberIcon1 />}
                          {index === 1 && <NumberIcon2 />}
                          {index === 2 && <NumberIcon3 />}
                          {index === 3 && <NumberIcon4 />}
                        </div>
                        <div>
                          <h4
                            className={cn(
                              "transition-colors duration-300 typo-body5",
                              isOpen ? "text-white mb-[10px] font-bold" : "text-[#94A3B8] mb-0"
                            )}
                          >
                            {item.title}
                          </h4>
                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-300 ease-in-out",
                              isOpen
                                ? "max-h-[200px] opacity-100"
                                : "max-h-0 pb-0 opacity-0"
                            )}
                          >
                            <p className="typo-body3 text-white/60">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        This dummy div acts as a theme-trigger for the navbar. 
        While the section is pinned, the navbar floats over the white page background above the dark card, so it uses the "light" theme (black text). 
        When the section finishes and unpins, the dark card scrolls UP and passes under the navbar. 
        This absolute div sits at the exact bottom of the scroll track and is exactly the height of the sticky inner (100vh - 80px). 
        So its top reaches the 80px navbar threshold EXACTLY at the moment the dark card starts sliding under the navbar! 
      */}
      <div
        data-nav-theme="dark"
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: "calc(100vh - 80px)" }}
      />
    </section>
  )
}
