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

// ─── Static data ──────────────────────────────────────────────────────────────
const OPPORTUNITY_TABS = [
  {
    id: "responsive",
    title: "Fully Responsive Design",
    description: "Deliver seamless, lightning-fast booking experiences across mobile, tablet, and desktop.",
    icon: <MonitorSmartphone className="h-5 w-5" />
  },
  {
    id: "mobile-first",
    title: "Mobile-First Booking Experience",
    description: "Optimized layouts, faster load times, and simplified flows designed specifically for mobile users who book on the go.",
    icon: <Zap className="h-5 w-5" />
  },
  {
    id: "conversion",
    title: "Conversion-Optimized UI",
    description: "Increase your direct bookings with a streamlined interface designed to convert visitors into guests.",
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: "sync",
    title: "Real-Time Sync Across Devices",
    description: "Ensure rates, availability, and content are instantly updated and consistent across all platforms.",
    icon: <RefreshCw className="h-5 w-5" />
  }
]

const SCREEN_IMGS = [
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness1.png", // Fallback images for now
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness2.png",
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness3.png",
  "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness2.png",
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
    <section ref={containerRef} className="relative w-full bg-[#FAFAFA]" style={{ height: "500vh" }}>
      <div className="sticky top-0 left-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden py-16 md:py-24">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="container mx-auto max-w-[1200px] px-4 md:px-8 h-full flex flex-col justify-center"
        >
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 w-full">
            
            {/* ════════════════════ LEFT COLUMN: IMAGE ════════════════════ */}
            <motion.div variants={itemYVariants} className="relative w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-[24px] bg-white shadow-xl border border-gray-100">
                {SCREEN_IMGS.map((src, i) => {
                  // Crossfade images based on scroll progress
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const opacity = useTransform(
                    progress,
                    [i - 0.5, i, i + 1, i + 1.5],
                    [0, 1, 1, 0]
                  )

                  return (
                    <motion.div
                      key={i}
                      style={{ opacity }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={src}
                        alt={`Screen view ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* ════════════════════ RIGHT COLUMN: TEXT & ACCORDION ════════════════════ */}
            <div className="flex w-full flex-col lg:w-1/2">
              
              {/* Header */}
              <motion.div variants={itemYVariants} className="mb-8 w-full">
                <SectionHeader
                  eyebrow="Portfolio control, simplified"
                  title="Designed for Every Screen. Built to Convert."
                  titleHighlight="Built to Convert."
                  description="Deliver seamless, lightning-fast booking experiences across mobile, tablet, and desktop — optimized to maximize direct conversions at every touchpoint."
                  className="text-left items-start [&_div]:text-left [&_p]:text-left"
                  titleClassName="text-[28px] md:text-[40px] lg:text-[48px] leading-[1.1] text-left"
                  descriptionClassName="text-sm md:text-base text-[#4E4E4E] max-w-[500px] text-left mx-0"
                />
              </motion.div>

              {/* Accordion Feature List */}
              <div className="flex flex-col gap-4 w-full">
                {OPPORTUNITY_TABS.map((tab, i) => {
                  const isActive = i === activeIndex

                  return (
                    <motion.div key={tab.id} variants={itemXVariants}>
                      <motion.div
                        className={cn(
                          "flex flex-col overflow-hidden rounded-[12px] border bg-white px-5 py-4 transition-colors duration-300",
                          isActive ? "border-[#ED862E] shadow-sm" : "border-gray-200"
                        )}
                        layout
                      >
                        {/* Accordion Header (Always visible) */}
                        <div className="flex items-center gap-4">
                          <div 
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
                              isActive ? "bg-orange-50 text-[#ED862E]" : "bg-gray-50 text-gray-400"
                            )}
                          >
                            {tab.icon}
                          </div>
                          <h3 
                            className={cn(
                              "text-[16px] font-bold transition-colors duration-300",
                              isActive ? "text-[#1E293B]" : "text-gray-500"
                            )}
                          >
                            {tab.title}
                          </h3>
                        </div>

                        {/* Accordion Body (Expands when active) */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <p className="mt-3 pl-12 text-[14px] leading-relaxed text-[#64748B]">
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
    </section>
  )
}
