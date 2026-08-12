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
      "Reduce dependency on high-commission OTAs and increase your bottom line with a high-converting direct booking site.",
    icon: <OurSolutionsIcon1 />,
  },
  {
    id: "multi-property",
    title: "Multi-Property Support",
    description:
      "Manage thousands of rooms across different brands and regions from a single dashboard with enterprise security.",
    icon: <OurSolutionsIcon2 />,
  },
  {
    id: "guest-experience",
    title: "Enhance Guest Experience",
    description:
      "Provide a seamless, personalized journey from the first click to check-out and beyond with automated engagement.",
    icon: <OurSolutionsIcon3 />,
  },
]

export function DirectConnectOperationsSection() {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#F8FAFC] py-[34px] lg:py-[50px]"
    >
      {/* Single horizontal padding layer — previous lg:px-[80px] on BOTH
          section and container left only ~640px for 3 cards at 1024px. */}
      <div className="container mx-auto max-w-[1440px] px-[16px] md:px-8 lg:px-[48px] xl:px-[80px]">
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

        {/* Grid — md is 2 cols, so the 3rd card uses col-span + justify-self
            to sit centered on the second row. lg+ restores normal 3-col flow. */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-3 md:gap-5 lg:gap-6 xl:gap-8">
          {operationsData.map((op) => (
            <div
              key={op.id}
              className="cursor-pointer group relative flex flex-col items-start overflow-hidden rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_4px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl lg:p-6 xl:p-10 md:last:col-span-2 md:last:w-[calc((100%-1.25rem)/2)] md:last:justify-self-center lg:last:col-span-1 lg:last:w-auto lg:last:justify-self-auto"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#ED862E] to-[#F5A962] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl  transition-colors duration-300 ">
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
