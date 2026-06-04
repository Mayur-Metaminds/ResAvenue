"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Blocks, Database, Lock, Zap } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

export function HotelWebsiteBuilderFeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // We map the full scroll of the container to 5 logical steps
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Apply useSpring for butter-smooth interpolation
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // We'll map smoothScroll [0, 1] to steps [0, 5]
  const progress = useTransform(smoothScroll, [0, 1], [0, 5])

  // Step 2: Bottom-Right Card (1 to 2)
  const rbOpacity = useTransform(progress, [1, 1.5, 2], [0, 0, 1])
  const rbY = useTransform(progress, [1, 1.5, 2], [40, 40, 0])

  // Step 3: Top-Right Card (2 to 3)
  const rtOpacity = useTransform(progress, [2, 2.5, 3], [0, 0, 1])
  const rtY = useTransform(progress, [2, 2.5, 3], [40, 40, 0])

  // Step 4: Bottom-Left Card (3 to 4)
  const lbOpacity = useTransform(progress, [3, 3.5, 4], [0, 0, 1])
  const lbY = useTransform(progress, [3, 3.5, 4], [40, 40, 0])

  // Step 5: Top-Left Card (4 to 5)
  const ltOpacity = useTransform(progress, [4, 4.5, 5], [0, 0, 1])
  const ltY = useTransform(progress, [4, 4.5, 5], [40, 40, 0])

  return (
    <section className="relative w-full bg-[#FAFAFA]" ref={containerRef} style={{ height: "400vh" }}>
      {/* Sticky Container */}
      <div className="sticky top-0 left-0 flex h-[100dvh] w-full flex-col items-center justify-start pt-20 md:pt-0 md:justify-center overflow-hidden px-4 md:px-8">
        <div className="container mx-auto max-w-[1200px]">
          
          {/* Header Content */}
          <div className="mx-auto mb-2 md:mb-16 w-full max-w-3xl">
            <SectionHeader
              eyebrow="Optimized for conversions"
              title={"Everything You Need to Build,\nManage, and Convert"}
              titleHighlight="Build,\nManage, and Convert"
              description="From website creation to direct bookings, manage your entire digital experience on one powerful platform."
              titleClassName="!mb-2 md:!mb-6 text-[28px] md:text-[40px] lg:text-[48px] leading-tight"
              descriptionClassName="text-sm md:text-lg"
            />
          </div>

          {/* Grid Layout (Desktop Sticky, Mobile Stacked via Tailwind) */}
          <div className="relative flex flex-col items-center justify-between gap-3 md:gap-8 lg:flex-row lg:items-center lg:gap-12">
            
            {/* Left Features */}
            <div className="hidden w-full flex-col gap-16 lg:flex lg:w-1/4">
              {/* Top-Left Card */}
              <motion.div style={{ opacity: ltOpacity, y: ltY }} className="flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#ED862E] shadow-sm">
                  <Blocks className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B]">User-Friendly, No-Code Interface</h3>
                <p className="text-sm text-[#64748B]">
                  Create and manage your website effortlessly with an intuitive, no-code builder — no technical expertise required.
                </p>
              </motion.div>

              {/* Bottom-Left Card */}
              <motion.div style={{ opacity: lbOpacity, y: lbY }} className="flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#ED862E] shadow-sm">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B]">Integrated Booking Engine</h3>
                <p className="text-sm text-[#64748B]">
                  Enable instant, commission-free bookings directly from your website with a seamless, embedded booking experience.
                </p>
              </motion.div>
            </div>

            {/* Center Image */}
            <div className="relative z-10 w-full max-w-[280px] md:max-w-none lg:w-2/4">
              <div className="relative mx-auto aspect-[16/9] md:aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
                {/* Fallback color/gradient if image fails or before load */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
                {/* Center placeholder or actual image */}
                <Image
                  src="/images/Hotel-Website-Builder/Hotel-Website-Builder2.png" // Placeholder, adjust if needed
                  alt="Hotel Website Builder Platform"
                  fill
                  className="object-cover md:object-cover"
                />
              </div>
            </div>

            {/* Right Features */}
            <div className="hidden w-full flex-col gap-16 lg:flex lg:w-1/4">
              {/* Top-Right Card */}
              <motion.div style={{ opacity: rtOpacity, y: rtY }} className="flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#ED862E] shadow-sm">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B]">Content Management System (CMS)</h3>
                <p className="text-sm text-[#64748B]">
                  Easily update rooms, offers, images, and pages in real-time with a flexible and powerful CMS.
                </p>
              </motion.div>

              {/* Bottom-Right Card */}
              <motion.div style={{ opacity: rbOpacity, y: rbY }} className="flex flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#ED862E] shadow-sm">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B]">Fast & Secure Hosting</h3>
                <p className="text-sm text-[#64748B]">
                  Enjoy lightning fast performance, high uptime, and enterprise grade security for a smooth guest experience.
                </p>
              </motion.div>
            </div>

            {/* Mobile/Tablet Layout (Scroll Highlighted List) */}
            <div className="flex w-full flex-col gap-2 md:gap-6 lg:hidden mt-0 md:mt-4">
              <MobileFeatureItem
                icon={<Blocks className="h-4 w-4" />}
                title="User-Friendly, No-Code Interface"
                description="Create and manage your website effortlessly with an intuitive, no-code builder."
                progress={progress}
                activeRange={[1, 2]}
              />
              <MobileFeatureItem
                icon={<Zap className="h-4 w-4" />}
                title="Integrated Booking Engine"
                description="Enable instant, commission-free bookings directly from your website."
                progress={progress}
                activeRange={[2, 3]}
              />
              <MobileFeatureItem
                icon={<Database className="h-4 w-4" />}
                title="Content Management System (CMS)"
                description="Easily update rooms, offers, images, and pages in real-time."
                progress={progress}
                activeRange={[3, 4]}
              />
              <MobileFeatureItem
                icon={<Lock className="h-4 w-4" />}
                title="Fast & Secure Hosting"
                description="Enjoy lightning fast performance, high uptime, and enterprise grade security."
                progress={progress}
                activeRange={[4, 5]}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

function MobileFeatureItem({
  icon,
  title,
  description,
  progress,
  activeRange,
}: {
  icon: React.ReactNode
  title: string
  description: string
  progress: import("framer-motion").MotionValue<number>
  activeRange: [number, number]
}) {
  // Opacity peaks when progress is within the activeRange
  const opacity = useTransform(
    progress,
    [activeRange[0] - 0.5, activeRange[0], activeRange[1], activeRange[1] + 0.5],
    [0.4, 1, 1, 0.4]
  )

  // Title color transitions to brand orange when active
  const color = useTransform(
    progress,
    [activeRange[0] - 0.5, activeRange[0], activeRange[1], activeRange[1] + 0.5],
    ["#94A3B8", "#ED862E", "#ED862E", "#94A3B8"]
  )

  return (
    <motion.div style={{ opacity }} className="flex flex-col items-start gap-1">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#ED862E] shadow-sm mb-1 border border-gray-100">
        {icon}
      </div>
      <motion.h3 style={{ color }} className="text-base font-bold leading-tight">
        {title}
      </motion.h3>
      <p className="text-xs leading-snug text-[#64748B]">{description}</p>
    </motion.div>
  )
}
