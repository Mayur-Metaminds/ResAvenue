"use client"

import type * as React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  OurSolutionsIcon1,
  OurSolutionsIcon2,
  OurSolutionsIcon3,
} from "../../../public/svg/Direct-Connect"

type OperationCard = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const operationsData: OperationCard[] = [
  {
    id: "direct-sales",
    title: "Drive Direct Sales",
    description:
      "Convert more lookers into bookers with a fast, intuitive, and mobile-optimized booking engine that reduces OTA reliance.",
    icon: <OurSolutionsIcon1 />,
  },
  {
    id: "multi-property",
    title: "Multi-Property Management",
    description:
      "Manage inventory, rates, and promotions across multiple properties from a single, centralized dashboard with ease.",
    icon: <OurSolutionsIcon2 />,
  },
  {
    id: "guest-experience",
    title: "Enhance Guest Experience",
    description:
      "Provide a seamless digital journey from booking to checkout with personalized offers and self-service capabilities.",
    icon: <OurSolutionsIcon3 />,
  },
]

export function DirectConnectOperationsSection() {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#F8FAFC] px-[16px] py-[34px] md:px-[80px] lg:py-[50px]"
    >
      <div className="container mx-auto max-w-[1200px]">
        {/* Header */}
        <SectionHeader
          className="mb-[24px] text-center lg:mb-[50px]"
          eyebrow="OUR SOLUTION"
          title={
            <>
              Smarter Operations. Better
              <br className="hidden md:block" />
              <SectionHeader.Highlight>
                Revenue. Happier Guests.
              </SectionHeader.Highlight>
            </>
          }
        />

        {/* Grid */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 lg:gap-8">
          {operationsData.map((op) => (
            <div
              key={op.id}
              className="group relative flex flex-col items-start overflow-hidden rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_4px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl lg:p-10"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ED862E] to-[#F5A962] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ED862E]/10 transition-colors duration-300 group-hover:bg-white/20">
                <div className="text-[#ED862E] transition-colors duration-300 group-hover:text-white">
                  {op.icon}
                </div>
              </div>
              <h3 className="font-plus-jakarta-700 relative z-10 mb-4 text-[20px] leading-[1.3] text-[#0F172A] transition-colors duration-300 group-hover:text-white lg:text-[22px]">
                {op.title}
              </h3>
              <p className="font-source-sans-400 relative z-10 text-[15px] leading-[1.7] text-[#64748B] transition-colors duration-300 group-hover:text-white/90 lg:text-[16px]">
                {op.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
