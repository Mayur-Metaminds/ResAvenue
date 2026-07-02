"use client"

import { useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  EnterpriseGradeCapabilitiesIcon1,
  EnterpriseGradeCapabilitiesIcon2,
  EnterpriseGradeCapabilitiesIcon3,
  EnterpriseGradeCapabilitiesIcon4,
  EnterpriseGradeCapabilitiesIcon5,
  EnterpriseGradeCapabilitiesIcon6,
  EnterpriseGradeCapabilitiesIcon7,
  EnterpriseGradeCapabilitiesIcon8,
  EnterpriseGradeCapabilitiesIcon9,
  EnterpriseGradeCapabilitiesIcon10,
  EnterpriseGradeCapabilitiesIcon11,
  EnterpriseGradeCapabilitiesIcon12,
} from "../../../public/svg/Channel-Connect"

type EngineeredFeature = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

const engineeredFeatures: EngineeredFeature[] = [
  {
    id: "real-time-sync",
    title: "Real-time Sync",
    description:
      "Instant updates across all platforms, preventing double bookings and ensuring accurate availability.",
    icon: <EnterpriseGradeCapabilitiesIcon1 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic Pricing",
    description:
      "Automatically adjust rates based on demand, seasonality, and competitor analysis.",
    icon: <EnterpriseGradeCapabilitiesIcon2 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "multi-property",
    title: "Multi-Property Management",
    description:
      "Centralized control for multiple locations from a single dashboard.",
    icon: <EnterpriseGradeCapabilitiesIcon3 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "parity-monitor",
    title: "Parity Monitor",
    description:
      "Track & maintain rate parity across all your distribution channels automatically.",
    icon: <EnterpriseGradeCapabilitiesIcon4 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "unified-reports",
    title: "Unified Reports",
    description:
      "Consolidated performance metrics from all connected channels in one comprehensive dashboard.",
    icon: <EnterpriseGradeCapabilitiesIcon5 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "tailored-rate",
    title: "Tailored Rate Management",
    description:
      "Set specific pricing rules, margins, and currency adjustments per channel.",
    icon: <EnterpriseGradeCapabilitiesIcon6 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "self-ota",
    title: "Self-OTA Mapping",
    description:
      "Easily map rooms and rate plans with a self-service tool giving you complete control over your distribution.",
    icon: <EnterpriseGradeCapabilitiesIcon7 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "pooled-inventory",
    title: "Pooled Inventory",
    description:
      "Maximize occupancy with a single pool of inventory distributed across all connected channels.",
    icon: <EnterpriseGradeCapabilitiesIcon8 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "drip-feed-inventory",
    title: "Drip Feed Inventory",
    description:
      "Release inventory gradually to optimize revenue and maintain better control over distribution.",
    icon: <EnterpriseGradeCapabilitiesIcon9 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "seasonal-rates",
    title: "Seasonal Rates",
    description:
      "Set and manage special pricing rules for peak seasons, holidays, and events.",
    icon: <EnterpriseGradeCapabilitiesIcon10 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description:
      "Manage your property on the go with our comprehensive mobile application.",
    icon: <EnterpriseGradeCapabilitiesIcon11 className="h-6 w-6 text-[#ED862E]" />,
  },
  {
    id: "advanced-security",
    title: "Advanced Security",
    description:
      "Enterprise-grade security and permissions to keep your data and operations safe.",
    icon: <EnterpriseGradeCapabilitiesIcon12 className="h-6 w-6 text-[#ED862E]" />,
  },
]

const MOBILE_VISIBLE_COUNT = 4

export function ChannelConnectEngineeredSection() {
  const [showAll, setShowAll] = useState(false)

  return (
    <section data-nav-theme="light" className="w-full bg-white pt-5 pb-[60px] lg:pt-0">
      <div className="mx-auto w-full max-w-[1440px] px-[20px] lg:px-[80px]">
        {/* Header */}
        <SectionHeader
          className="mx-auto mb-[45px] max-w-3xl text-center lg:mb-[50px]"
          eyebrow="Enterprise-grade capabilities"
          eyebrowClassName="mb-[15px] lg:mb-[12px]"
          title={
            <>
              <SectionHeader.Highlight>Engineered for Complexity</SectionHeader.Highlight>
            </>
          }
          titleClassName="lg:mb-[24px] mb-[16px]"
          highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 36.88%, #ED862E 65.29%)"
          description="Scalable solutions for multi-property operations and revenue optimization teams."
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-[20px] md:gap-[10px] sm:grid-cols-2 lg:grid-cols-4">
          {engineeredFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`group flex h-full cursor-pointer  flex-col items-start gap-[19px] rounded-[16px] border border-black/5 bg-white p-[20px] text-left transition-all duration-300 hover:border-[#ED862E] max-sm:drop-shadow-sm hover:[background:linear-gradient(0deg,rgba(237,134,46,0.03)_0%,rgba(237,134,46,0.03)_100%),#FFF] ${!showAll && index >= MOBILE_VISIBLE_COUNT ? "max-sm:hidden" : ""
                }`}
            >

              <div className="flex w-[48px] h-[48px]">{feature.icon}</div>

              <div className="flex flex-col gap-1">
                <h3 className="font-plus-jakarta-700 text-[18px] leading-[1.2] text-[#010C28] transition-colors duration-300 group-hover:text-[#ED862E]">
                  {feature.title}
                </h3>
                <p className="font-source-sans-400 text-[15px] leading-[1.6] text-[#64748B] lg:text-[16px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only "View More" toggle */}
        {!showAll && engineeredFeatures.length > MOBILE_VISIBLE_COUNT && (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mx-auto mt-[45px] flex items-center justify-center gap-[6px] font-plus-jakarta-600 text-[14px] leading-none text-[#ED862E] sm:hidden"
          >
            View More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  )
}
