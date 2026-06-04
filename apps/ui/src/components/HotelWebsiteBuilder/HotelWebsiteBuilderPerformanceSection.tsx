"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Building2, LineChart, RefreshCcw } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"

const PERFORMANCE_FEATURES = [
  {
    title: "Enterprise Grade",
    description: "99.99% uptime SLA with SOC2 Type II compliance baked in.",
    icon: <Building2 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    title: "Rapid Deployment",
    description: "Go from zero to integrated in less than 48 hours.",
    icon: <LineChart className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    title: "Always Evolving",
    description: "Weekly feature drops pushed automatically to your workspace.",
    icon: <RefreshCcw className="h-6 w-6 text-[#ED862E]" />,
  },
]

export function HotelWebsiteBuilderPerformanceSection() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        
        {/* Header Content (Static as requested, or subtle fade) */}
        <div className="mx-auto mb-12 w-full max-w-4xl text-center">
          <SectionHeader
            eyebrow="Optimized for conversions"
            title="Built to Rank. Built to Perform."
            titleHighlight="to Perform."
            description="Improve visibility on search engines while delivering fast-loading, high-performance experiences."
          />
        </div>

        {/* Large Dashboard Image */}
        <div className="relative mx-auto mb-16 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100 shadow-xl">
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
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.15 }}
              className={`flex flex-col items-center text-center flex-1 px-4 md:px-8 ${
                i !== PERFORMANCE_FEATURES.length - 1 ? "md:border-r md:border-gray-200" : ""
              }`}
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50/50 text-[#ED862E]">
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="mb-3 text-xl font-bold text-[#1E293B]">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-[#64748B] max-w-[280px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
