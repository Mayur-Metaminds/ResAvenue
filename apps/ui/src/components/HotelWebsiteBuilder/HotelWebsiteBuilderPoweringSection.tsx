"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"
import { PoweringSectionIcon1, PoweringSectionIcon2, PoweringSectionIcon3 } from "../../../public/svg/Hotel-Website-Builder"

const POWERING_TABS = [
  {
    id: "operations",
    eyebrow: "Operations",
    icon: <PoweringSectionIcon1 />,
    title: "Simplify Hotel Operations",
    description:
      "Manage reservations, guest journeys, and front desk workflows from a single unified platform.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png", // Use a placeholder or actual image if available
  },
  {
    id: "intelligence",
    eyebrow: "Intelligence",
    icon: <PoweringSectionIcon2 />,
    title: "Smarter Revenue Decisions",
    description:
      "Leverage data-driven insights, dynamic pricing, and demand forecasting to maximize revenue.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png",
  },
  {
    id: "reach",
    eyebrow: "Reach",
    icon: <PoweringSectionIcon3 />,
    title: "Expand Your Distribution",
    description:
      "Connect to global channels including GDS, Google Hotels, and metasearch platforms to increase visibility.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder-PoweringBusiness.png",
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
    <section className="relative w-full bg-white py-16 md:py-[80px]">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">

        {/* Header Content */}
        <div className="mx-auto mb-[28px] md:mb-[34px] w-full max-w-3xl">
          <SectionHeader
            eyebrow="Optimized for conversions"
            eyebrowClassName="mb-[32px]"
            title={(
              <>
                <SectionHeader.Highlight>Powering Every Part</SectionHeader.Highlight>
                <br />
                of <SectionHeader.Highlight>Your Business</SectionHeader.Highlight>
              </>
            )}
            titleClassName="mb-[12px]"
            highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 57.71%, #ED862E 68.44%)"
            description="Streamline operations, unlock insights, and reach more guests with a fully integrated ecosystem."
            descriptionClassName="text-[#464554]"
          />
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center md:gap-[60px]">

          {/* Left: Image Showcase */}
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[3/3] w-full overflow-hidden ">
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
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Right: Interactive Pointers / Tabs */}
          <div className="flex w-full flex-col gap-[22px] lg:w-1/2">
            {POWERING_TABS.map((tab, index) => {
              const isActive = index === activeIndex

              return (
                <motion.div
                  key={tab.id}
                  onClick={() => handleTabClick(index)}
                  className="group relative cursor-pointer"
                  // Animate the entire block (border + content) to the right if active
                  initial={false}
                  animate={{ x: isActive ? 21.98 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Vertical active indicator line */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 h-full transition-colors duration-300",
                      isActive ? "bg-[#ED862E]" : "bg-[rgba(75,65,225,0.20)]"
                    )}
                    style={{ width: "1.629px" }}
                  />

                  {/* Content Wrapper */}
                  <div className="flex flex-col items-start gap-[8px] p-[14.07px]">
                    {/* Eyebrow / Icon */}
                    <div
                      className={cn(
                        "flex items-center gap-[6px] text-sm font-semibold",
                        isActive ? "text-[#ED862E]" : "text-gray-400 group-hover:text-gray-500"
                      )}
                    >
                      {tab.icon}
                      <span className="typo-body2 text-[#ED862E] text-[12px]">{tab.eyebrow}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className={cn(
                        "font-plus-jakarta text-[#191C1E] transition-colors duration-300",
                        isActive ? "text-[17.5px] leading-[24px] font-[800]" : "text-[16px] leading-[22px] font-[700]"
                      )}
                    >
                      {tab.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={cn(
                        "font-source-sans-400 text-[#464554]",
                        isActive
                          ? "text-[14.066px] leading-[22px] font-[500]"
                          : "text-[13px] leading-[21px] font-[400]"
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
