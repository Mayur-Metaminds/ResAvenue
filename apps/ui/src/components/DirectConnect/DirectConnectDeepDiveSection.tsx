"use client"

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  AnimatePresence,
  motion,
} from "framer-motion"
import { useRef, useState, useEffect } from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { ScrollAccordionSection } from "@/components/common/ScrollAccordionSection"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

import {
  NumberIcon1,
  NumberIcon2,
  NumberIcon3,
  NumberIcon4,
} from "../../../public/svg/Direct-Connect"

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
    // image: "/images/Direct-Connect/easyMobileBookings.avif",
    image: "/images/Direct-Connect/easyMobileBookings-new.png",
  },
  {
    id: "item-2",
    title: "Real-time Sync",
    description:
      "Instantly updates the rates and inventory across multiple hotels in just few clicks.",
    // image: "/images/Direct-Connect/realTimeSync.avif"
    image: "/images/Direct-Connect/realTimeSync-new.avif",
  },
  {
    id: "item-3",
    title: "Hotel Price Widget",
    description:
      "Compare real-time OTA rates with your hotel's official website rate in one view. Showcase the lowest available rate, and drive direct bookings with transparent pricing.",
    // image: "/images/Direct-Connect/hotelPriceWidget.avif",
    image: "/images/Direct-Connect/hotelPriceWidget-new.webp",
  },
  {
    id: "item-4",
    title: "Simple payment processing",
    description:
      "Streamline your payment process with a seamless and secure PCI compliant payment gateway.",
    // image: "/images/Direct-Connect/simplePaymentProcessing.avif",
    image: "/images/Direct-Connect/simplePaymentProcessing-new.webp",
  },
]

const MD_MIN = 768

function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < MD_MIN
}

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
    // Mobile: click-only. md+: scroll scrub unchanged.
    if (isMobileViewport()) return

    const next = Math.max(
      0,
      Math.min(accordionData.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const scrollToFeature = (
    index: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    // Mobile: swap image/accordion via click only (no sticky scroll track).
    if (isMobileViewport()) {
      setActiveIndex(index)

      return
    }

    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const stickyOffset = window.innerWidth >= 1024 ? 80 : 56
    const pinStart = sectionTop - stickyOffset
    const scrollableDistance =
      el.offsetHeight - (window.innerHeight - stickyOffset)
    const progress = index / accordionData.length

    window.scrollTo({
      top: pinStart + scrollableDistance * progress,
      behavior,
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
      if (isMobileViewport()) return false
      const rect = el.getBoundingClientRect()
      const stickyOffset = window.innerWidth >= 1024 ? 80 : 56

      // Allow 1px tolerance for browser subpixel layout rounding
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
    <>
      <ScrollAccordionSection
        className="md:hidden"
        items={accordionData}
        eyebrowText="DEEP DIVE"
        title={
          <>
            The Fastest Booking <br />
            <SectionHeader.Highlight>
              Experience on the Market.
            </SectionHeader.Highlight>
          </>
        }
        titleColor="#FFFFFF"
        highlightGradient="linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)"
        backgroundColor="#010C28"
        navTheme="dark"
        renderIcon={(index) => {
          if (index === 0) return <NumberIcon1 />
          if (index === 1) return <NumberIcon2 />
          if (index === 2) return <NumberIcon3 />
          if (index === 3) return <NumberIcon4 />
          return null
        }}
      />
      <section
        ref={sectionRef}
        data-nav-theme="dark"
        className="relative w-full bg-[#010C28] max-md:hidden"
        style={{ height: `calc(100vh * ${stepsPerSection})` }}
      >
      {/* Mobile: natural height + click. md+: sticky scroll scrub (unchanged). */}
      <div className="relative flex w-full flex-col items-center justify-start max-md:overflow-visible md:sticky md:top-[56px] md:h-[calc(100vh-56px)] md:overflow-hidden lg:top-20 lg:h-[calc(100vh-80px)]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-start px-4 py-8 transition-all duration-500 ease-in-out md:h-full md:min-h-0 md:py-8 lg:px-[65px] lg:py-5 lg:pr-[80px] xl:py-10">
          <div className="flex flex-col gap-5 md:grid md:h-full md:min-h-0 md:flex-1 md:grid-cols-2 md:content-center md:items-center md:gap-x-10 lg:gap-x-12 xl:gap-x-[80px]">
            {/* Header */}
            <div className="order-1 shrink-0 md:col-start-2 md:row-start-1 md:self-start">
              <SectionHeader
                className="mb-2 items-start text-left md:mb-[12px] lg:mb-2 xl:mb-[12px]"
                titleColor="#FFFFFF"
                highlightGradient="linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)"
                eyebrow={
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
                titleClassName="mb-0 text-[24px] md:text-[28px] lg:text-[28px] xl:text-[inherit] leading-[1.1] tracking-tight xl:leading-[inherit] xl:tracking-normal"
              />
            </div>

            {/* Accordion */}
            <div className="order-2 shrink-0 md:col-start-2 md:row-start-2 md:self-start">
              <div className="flex flex-col gap-1.5 md:gap-2 lg:gap-1.5 xl:gap-3">
                {accordionData.map((item, index) => {
                  const isOpen = activeIndex === index

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        "relative flex shrink-0 flex-col rounded-[8px] transition-all duration-300",
                        !isOpen && "border border-white/5 bg-transparent"
                      )}
                      onClick={() => scrollToFeature(index)}
                      style={{ cursor: "pointer" }}
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
                            WebkitMask:
                              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                            WebkitMaskComposite: "xor",
                            maskComposite: "exclude",
                          }}
                        />
                      </div>

                      <div
                        className={cn(
                          "relative z-10 flex gap-[12px] py-[8px] pr-4 pl-[12px] transition-all duration-300 select-none lg:gap-[12px] lg:py-2 lg:pr-5 lg:pl-[14px] xl:gap-[14px] xl:py-[14px] xl:pr-[31px] xl:pl-[16px]",
                          isOpen ? "items-start" : "items-center"
                        )}
                      >
                        <div
                          className={cn(
                            "shrink-0 transition-all duration-300",
                            isOpen ? "opacity-100" : "opacity-50 grayscale"
                          )}
                        >
                          {index === 0 && <NumberIcon1 />}
                          {index === 1 && <NumberIcon2 />}
                          {index === 2 && <NumberIcon3 />}
                          {index === 3 && <NumberIcon4 />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={cn(
                              "typo-body5 break-words transition-colors duration-300",
                              isOpen
                                ? "mb-1.5 font-bold text-white xl:mb-[10px]"
                                : "mb-0 text-[#94A3B8]"
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
                              <p className="typo-body3 pb-0.5 break-words text-white/60">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Image — mobile: natural full-width size; md+: sticky column fill */}
            <div className="relative order-3 w-full md:order-none md:col-start-1 md:row-span-2 md:row-start-1 md:h-full md:max-h-full md:min-h-0 md:self-center md:overflow-hidden md:rounded-[24px]">
              {accordionData.map((item, index) => {
                const isActive = activeIndex === index
                const yOffset = index < activeIndex ? -20 : 20

                return (
                  <motion.img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    initial={false}
                    animate={{ 
                      opacity: isActive ? 1 : 0, 
                      y: isActive ? 0 : yOffset,
                      zIndex: isActive ? 10 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={cn(
                      "w-full object-contain object-center md:absolute md:inset-0 md:h-full md:w-full",
                      index === 0 ? "relative h-auto" : "absolute top-0 left-0 h-full"
                    )}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  />
                )
              })}
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
        className="pointer-events-none absolute bottom-0 left-0 hidden w-full md:block"
        style={{ height: "calc(100vh - 80px)" }}
      />
      </section>
    </>
  )
}
