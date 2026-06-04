"use client"

import { motion } from "framer-motion"
import { BarChart3, Globe, Settings } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

const POWERING_TABS = [
  {
    id: "operations",
    eyebrow: "Operations",
    icon: <Settings className="h-4 w-4" />,
    title: "Simplify Hotel Operations",
    description:
      "Manage reservations, guest journeys, and front desk workflows from a single unified platform.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness1.png", // Use a placeholder or actual image if available
  },
  {
    id: "intelligence",
    eyebrow: "Intelligence",
    icon: <BarChart3 className="h-4 w-4" />,
    title: "Smarter Revenue Decisions",
    description:
      "Leverage data-driven insights, dynamic pricing, and demand forecasting to maximize revenue.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness2.png",
  },
  {
    id: "reach",
    eyebrow: "Reach",
    icon: <Globe className="h-4 w-4" />,
    title: "Expand Your Distribution",
    description:
      "Connect to global channels including GDS, Google Hotels, and metasearch platforms to increase visibility.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness3.png",
  },
]

const AUTOPLAY_DELAY = 5000 // 5 seconds

export function HotelWebsiteBuilderPoweringSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % POWERING_TABS.length)
    }, AUTOPLAY_DELAY)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleTabClick = (index: number) => {
    setActiveIndex(index)
    startTimer() // Reset timer on manual click
  }

  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        
        {/* Header Content */}
        <div className="mx-auto mb-12 md:mb-16 w-full max-w-3xl">
          <SectionHeader
            eyebrow="Optimized for conversions"
            title={"Powering Every Part of\nYour Business"}
            titleHighlight="Your Business"
            description="Streamline operations, unlock insights, and reach more guests with a fully integrated ecosystem."
          />
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          
          {/* Left: Image Showcase */}
          <div className="relative w-full lg:w-3/5">
            <div className="relative aspect-[4/3] w-full overflow-hidden ">
              <motion.div
                key={activeIndex} // Triggers animation on index change
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={POWERING_TABS[activeIndex]!.image}
                  alt={POWERING_TABS[activeIndex]!.title}
                  fill
                  className="object-contain p-4 md:p-8"
                />
              </motion.div>
            </div>
          </div>

          {/* Right: Interactive Pointers / Tabs */}
          <div className="flex w-full flex-col gap-6 lg:w-2/5">
            {POWERING_TABS.map((tab, index) => {
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className="group relative cursor-pointer"
                  // Animate the entire block slightly to the right if active
                  animate={{ x: isActive ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Optional: A vertical active indicator line */}
                  <div
                    className={cn(
                      "absolute -left-4 top-0 h-full w-[2px] rounded-full transition-colors duration-300",
                      isActive ? "bg-[#ED862E]" : "bg-transparent"
                    )}
                  />

                  <div className="flex flex-col items-start gap-2">
                    {/* Eyebrow / Icon */}
                    <div
                      className={cn(
                        "flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-colors duration-300",
                        isActive ? "text-[#ED862E]" : "text-gray-400 group-hover:text-gray-500"
                      )}
                    >
                      {tab.icon}
                      <span>{tab.eyebrow}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "text-xl font-bold transition-colors duration-300 md:text-2xl",
                        isActive ? "text-[#1E293B]" : "text-gray-400 group-hover:text-gray-600"
                      )}
                    >
                      {tab.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "text-sm leading-relaxed transition-all duration-300 md:text-base",
                        isActive
                          ? "text-[#64748B] opacity-100"
                          : "text-[#94A3B8] opacity-50"
                      )}
                    >
                      {tab.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
