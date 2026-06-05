"use client"

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  AnimatePresence,
  motion
} from "framer-motion"
import { useRef, useState } from "react"

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

  // One viewport of page scroll per accordion step — the sticky inner stays
  // pinned for the full outer-section height, so the user "stays in" the
  // section until they've scrolled through every step, then the next section
  // naturally comes into view.
  const stepsPerSection = Math.max(1, accordionData.length)
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
    [0, accordionData.length - 1]
  )
  useMotionValueEvent(indexMotion, "change", (latest) => {
    const next = Math.max(
      0,
      Math.min(accordionData.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative w-full"
      style={{ height: sectionHeight }}
    >
      {/* Sticky inner — pins below the fixed navbar for the full outer-section
          height. The rounded "card" styling lives here so it stays visible the
          whole time the user is scrolling through the accordion steps. */}
      <div className="sticky top-24 lg:top-20 flex h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-5rem)] w-full items-center">
        <div className="w-full rounded-[45px] bg-[#010C28] px-4 py-[21px] lg:py-[60px] lg:pr-[80px] lg:pl-[65px] transition-all duration-500 ease-in-out">
      <div className="grid grid-cols-1 items-center gap-[56px] lg:grid-cols-2 lg:items-center lg:gap-[80px]">
        {/* Left Column: Image Graphic */}
        <div className="relative order-2 flex w-full aspect-square md:aspect-video lg:aspect-square items-center justify-center rounded-[24px] lg:order-1">
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

        {/* Right Column: Content & Accordion */}
        <div className="order-1 flex w-full flex-col lg:order-2">
          {/* Header */}
          <SectionHeader
            className="mb-[38px] items-start text-left"
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
                  onClick={() => setActiveIndex(index)}
                  style={{ cursor: 'pointer' }}
                >
                 <div className={cn(
                   "flex gap-[14px] py-[16px] pr-[7px] pl-[16px] select-none lg:pr-[31px] transition-all duration-300",
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
                          isOpen ? "text-white mb-[10px]" : "text-[#94A3B8] mb-0"
                        )}
                      >
                        {item.title}
                      </h4>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          isOpen
                            ? "max-h-[200px] pb-5 opacity-100"
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
    </section>
  )
}
