"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { BuiltToRankIcon1, BuiltToRankIcon2, BuiltToRankIcon3 } from "../../../public/svg/Hotel-Website-Builder"

const PERFORMANCE_FEATURES = [
  {
    title: "Enterprise Grade",
    description: "99.99% uptime SLA with SOC2 Type II compliance baked in.",
    icon: <BuiltToRankIcon1/>,
  },
  {
    title: "Rapid Deployment",
    description: "Go from zero to integrated in less than 48 hours.",
    icon: <BuiltToRankIcon2/>,
  },
  {
    title: "Always Evolving",
    description: "Weekly feature drops pushed automatically to your workspace.",
    icon: <BuiltToRankIcon3/>,
  },
]

export function HotelWebsiteBuilderPerformanceSection() {
  return (
    <section className="relative w-full bg-white pb-[80px]">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        
        {/* Header Content (Static as requested, or subtle fade) */}
        <div className="mx-auto mb-[25px] w-full max-w-4xl text-center">
          <SectionHeader
            eyebrow="Optimized for conversions"
            eyebrowClassName="mb-[32px]"
            title="Built to Rank. Built to Perform."
            titleClassName="mb-[12px]"
            titleHighlight="to Perform."
            description="Improve visibility on search engines while delivering fast-loading, high-performance experiences."
          />
        </div>

        {/* Large Dashboard Image */}
        <div className="relative mx-auto mb-[40px] aspect-[16/9] w-full max-w-2xl overflow-hidden ">
          <Image
            src="/images/Hotel-Website-Builder/Hotel-Website-Builder7.png" // Placeholder
            alt="SEO and Performance Dashboard"
            fill
            className="object-cover"
          />
        </div>

        {/* 3-Column Features - Animated from bottom to top */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 md:gap-0 px-4 md:px-8">
          {PERFORMANCE_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className={`flex-1 ${
                i !== PERFORMANCE_FEATURES.length - 1 ? "md:border-r md:border-[rgba(237,134,46,0.50)]" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
                className="flex h-full flex-col items-center text-center px-4 md:px-8"
              >
                {/* Icon Container */}
                <div className="mb-[12px] ">
                  {feature.icon}
                </div>
  
                {/* Text */}
                <h3 className="mb-[12px] font-plus-jakarta-700 text-[18px] leading-[28px] text-center text-[#191C1E]">
                  {feature.title}
                </h3>
                <p className="font-source-sans-400 text-sm text-center text-[#464554]">
                  {feature.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
