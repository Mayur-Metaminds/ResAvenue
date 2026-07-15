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
      "Make it simple for guests no matter where they are with a seamless 3-step mobile booking experience.",
    image: "/images/Direct-Connect/easyMobileBookings.avif"
  },
  {
    id: "item-2",
    title: "Real-time Sync",
    description:
      "Instantly updates the rates and inventory across multiple hotels in just few clicks.",
    image: "/images/Direct-Connect/realTimeSync.avif"
  },
  {
    id: "item-3",
    title: "Hotel Price Widget",
    description:
      "Compare real-time OTA rates with your hotel's official website rate in one view. Showcase the lowest available rate, and drive direct bookings with transparent pricing.",
    image: "/images/Direct-Connect/hotelPriceWidget.avif"
  },
  {
    id: "item-4",
    title: "Simple payment processing",
    description:
      "Streamline your payment process with a seamless and secure PCI compliant payment gateway.",
    image: "/images/Direct-Connect/simplePaymentProcessing.avif"
  },
]

export function DirectConnectDeepDiveSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Half a viewport of page scroll per accordion step + 0.5 buffer step at the end.
  // This reduces the total height significantly so the user doesn't have to scroll forever.
  const stepsPerSection = Math.max(1, accordionData.length) * 0.5 + 0.5

  // Scroll progress 0→1 across the section: 0 when the section top hits the
  // viewport top (sticky pinning starts), 1 when the section bottom hits the
  // viewport bottom (sticky pinning ends).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 56px", "end end"],
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

  const scrollToFeature = (index: number, behavior: ScrollBehavior = "smooth") => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const stickyOffset = window.innerWidth >= 1024 ? 80 : 56
    const pinStart = sectionTop - stickyOffset
    const scrollableDistance = el.offsetHeight - (window.innerHeight - stickyOffset)
    const progress = index / accordionData.length

    window.scrollTo({
      top: pinStart + scrollableDistance * progress,
      behavior
    })
  }

  const wheelCooldownRef = useRef(0)
  const exitLockoutRef = useRef(0)


  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const COOLDOWN_MS = 800
    const EXIT_LOCKOUT_MS = 1000

    const isPinned = () => {
      const rect = el.getBoundingClientRect()
      const stickyOffset = window.innerWidth >= 1024 ? 80 : 56
      // Allow 1px tolerance for browser subpixel layout rounding
      return rect.top <= stickyOffset + 1 && rect.bottom >= window.innerHeight - 1
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
      data-nav-theme="dark"
      className="relative w-full bg-[#010C28]"
      style={{ height: `calc(100vh * ${stepsPerSection})` }}
    >
      {/* Sticky inner — pins below the fixed navbar for the full outer-section
          height. We use items-start on mobile so the top is never cut off,
          and highly compact spacing to ensure the image at the bottom fits. */}
      <div className="sticky top-[56px] lg:top-20 flex w-full h-[calc(100vh-56px)] lg:h-[calc(100vh-80px)] flex-col items-center justify-start lg:justify-center">
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-start lg:justify-center px-4 py-4 transition-all duration-500 ease-in-out lg:px-[65px] lg:py-[60px] lg:pr-[80px]">
          <div className="flex min-h-0 flex-1 flex-col gap-[12px] lg:grid lg:grid-cols-2 lg:flex-none lg:content-center lg:items-center lg:gap-x-[80px]">
            {/* Header */}
            <div className="order-1 lg:col-start-2 lg:row-start-1 lg:self-start">
              <SectionHeader
                className="mb-[12px] items-start text-left"
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
                titleClassName="mb-0 text-[26px] md:text-[32px] leading-[1.1] tracking-tight lg:text-[inherit] lg:leading-[inherit] lg:tracking-normal"
              />
            </div>

            {/* Accordion */}
            <div className="order-2 lg:col-start-2 lg:row-start-2 lg:self-start">
              <div className="flex flex-col gap-2 lg:gap-3">
                {accordionData.map((item, index) => {
                  const isOpen = activeIndex === index

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "relative flex flex-col overflow-hidden rounded-[8px] transition-all duration-300",
                        !isOpen && "border border-white/5 bg-transparent"
                      )}
                      onClick={() => scrollToFeature(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Active State Background & Border Layer */}
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
                            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                          }}
                        />
                      </div>

                      <div className={cn(
                        "relative z-10 flex gap-[12px] py-[8px] pl-[12px] pr-[7px] select-none transition-all duration-300 lg:gap-[14px] lg:py-[16px] lg:pl-[16px] lg:pr-[31px]",
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

            {/* Left Column: Image Graphic */}
            <div className="relative order-3 flex flex-1 min-h-0 w-full items-center justify-center rounded-[24px] lg:order-none lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:aspect-square lg:flex-none lg:self-center">
              <AnimatePresence mode="wait">
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
