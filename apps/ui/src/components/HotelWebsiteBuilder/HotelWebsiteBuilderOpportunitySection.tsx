"use client"

import {
  AnimatePresence,
  motion,
  type Variants,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useRef, useState } from "react"
import { MonitorSmartphone, Zap, TrendingUp, RefreshCw } from "lucide-react"
import Image from "next/image"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"
import { BuilderOpportunityIcon1, BuilderOpportunityIcon2, BuilderOpportunityIcon3, BuilderOpportunityIcon4 } from "../../../public/svg/Hotel-Website-Builder"

// ─── Static data ──────────────────────────────────────────────────────────────
const OPPORTUNITY_TABS = [
  {
    id: "responsive",
    title: "Fully Responsive Design",
    description: "Deliver seamless, lightning-fast booking experiences across mobile, tablet, and desktop.",
    icon: <BuilderOpportunityIcon1 />
  },
  {
    id: "mobile-first",
    title: "Mobile-First Booking Experience",
    description: "Optimized layouts, faster load times, and simplified flows designed specifically for mobile users who book on the go.",
    icon: <BuilderOpportunityIcon2 />
  },
  {
    id: "conversion",
    title: "Conversion-Optimized UI",
    description: "Increase your direct bookings with a streamlined interface designed to convert visitors into guests.",
    icon: <BuilderOpportunityIcon3 />
  },
  {
    id: "sync",
    title: "Real-Time Sync Across Devices",
    description: "Ensure rates, availability, and content are instantly updated and consistent across all platforms.",
    icon: <BuilderOpportunityIcon4 />
  }
]

const SCREEN_IMGS = [
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png",
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png",
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png",
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png",
]

// ─── Animations ───────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
}

const itemYVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" } }
}

const itemXVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
}

export function HotelWebsiteBuilderOpportunitySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // 1. Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth scroll
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Map progress from 0 to 4 to cover our 4 items
  const progress = useTransform(smoothScroll, [0, 1], [-0.5, 4.5])

  // Update active index based on scroll progress for the accordion
  useMotionValueEvent(progress, "change", (latest) => {
    const index = Math.max(0, Math.min(OPPORTUNITY_TABS.length - 1, Math.floor(latest)))
    if (index !== activeIndex) {
      setActiveIndex(index)
    }
  })

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAFA]">

      {/* ══════════ MOBILE LAYOUT ══════════ */}
      <div className="block lg:hidden" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-[100dvh] overflow-hidden py-10 px-4 flex flex-col">

          {/* Header */}
          <SectionHeader
            eyebrow="Portfolio control, simplified"
            eyebrowClassName="mb-[12px]"
            title={
              <>
                <SectionHeader.Highlight>Designed for Every</SectionHeader.Highlight>{" "}<br />
                Screen. <SectionHeader.Highlight>Built to Convert.</SectionHeader.Highlight>
              </>
            }
            highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%)"
            description="Deliver seamless, lightning-fast booking experiences across mobile, tablet, and desktop — optimized to maximize direct conversions at every touchpoint."
            className="text-left items-start [&_div]:text-left [&_p]:text-left mb-4"
            titleClassName="mb-[10px] tracking-[-1.5px]!"
            descriptionClassName="typo-body1 text-[#010E38] hidden"
          />

          {/* Crossfading image — driven by activeIndex */}
          <div className="relative mb-4 w-full h-[180px] shrink-0 overflow-hidden rounded-[20px] bg-white shadow-lg border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={SCREEN_IMGS[activeIndex]! || SCREEN_IMGS[0]!}
                  alt="Opportunity preview"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Accordion Feature List */}
          <div className="flex flex-col gap-[10px] w-full flex-1 min-h-0 overflow-hidden">
            {OPPORTUNITY_TABS.map((tab, i) => {
              const isActive = i === activeIndex
              return (
                <div
                  key={tab.id}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-[10px] border bg-white p-[12.62px] transition-colors duration-300",
                    isActive ? "border-[#ED862E] shadow-sm" : "border-[rgba(237,134,46,0.25)]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                        isActive ? "bg-orange-50 text-[#ED862E]" : "bg-gray-50 text-gray-400"
                      )}
                    >
                      {tab.icon}
                    </div>
                    <h3 className="typo-body1 text-[12px] font-[700] leading-[20px] text-[#010E38]">
                      {tab.title}
                    </h3>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="pl-[48px] font-source-sans-400 text-[12px] leading-[17px] text-[#010E38] mt-1">
                          {tab.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* ══════════ DESKTOP LAYOUT (sticky scroll-jack) ══════════ */}
      <div className="hidden lg:block" style={{ height: "500vh" }}>
        <div className="sticky top-0 left-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="container mx-auto max-w-[1200px] px-8 h-full flex flex-col justify-center"
          >
            <div className="flex flex-row items-center gap-16 w-full">

              {/* LEFT COLUMN: crossfading image */}
              <motion.div variants={itemYVariants} className="relative flex h-full w-1/2 items-center justify-center">
                <div className="relative aspect-[3/3] w-full max-w-[600px] overflow-hidden rounded-[24px] bg-white shadow-xl border border-gray-100">
                  {SCREEN_IMGS.map((src, i) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(
                      progress,
                      [i - 0.5, i, i + 1, i + 1.5],
                      [0, 1, 1, 0]
                    )
                    return (
                      <motion.div key={i} style={{ opacity }} className="absolute inset-0">
                        <Image src={src} alt={`Screen view ${i + 1}`} fill className="object-cover" />
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* RIGHT COLUMN: header + accordion */}
              <div className="flex w-1/2 flex-col">
                <motion.div variants={itemYVariants} className="mb-[32px] w-full">
                  <SectionHeader
                    eyebrow="Portfolio control, simplified"
                    eyebrowClassName="mb-[16px]"
                    title={
                      <>
                        <SectionHeader.Highlight>Designed for Every</SectionHeader.Highlight> <br />
                        Screen. {" "}
                        <SectionHeader.Highlight>Built to Convert.</SectionHeader.Highlight>
                      </>
                    }
                    highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%)"
                    description="Deliver seamless, lightning-fast booking experiences across mobile, tablet, and desktop — optimized to maximize direct conversions at every touchpoint."
                    className="text-left items-start [&_div]:text-left [&_p]:text-left"
                    titleClassName="mb-[24px] tracking-[-1.5px]!"
                    descriptionClassName="typo-body1 text-[#010E38]"
                  />
                </motion.div>

                <div className="flex flex-col gap-[13.46px] w-full">
                  {OPPORTUNITY_TABS.map((tab, i) => {
                    const isActive = i === activeIndex
                    return (
                      <motion.div key={tab.id} variants={itemXVariants}>
                        <motion.div
                          className={cn(
                            "flex flex-col overflow-hidden rounded-[10px] border bg-white p-[12.62px] transition-colors duration-300",
                            isActive ? "border-[#ED862E] shadow-sm" : "border-[rgba(237,134,46,0.25)]"
                          )}
                          layout
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                                isActive ? "bg-orange-50 text-[#ED862E]" : "bg-gray-50 text-gray-400"
                              )}
                            >
                              {tab.icon}
                            </div>
                            <h3 className="typo-body1 text-[12px] font-[700] leading-[20px] text-[#010E38]">
                              {tab.title}
                            </h3>
                          </div>
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <p className="pl-[48px] font-source-sans-400 text-[12px] leading-[17px] text-[#010E38]">
                                  {tab.description}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
