"use client"

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
    icon: <EnterpriseGradeCapabilitiesIcon1 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic Pricing",
    description:
      "Automatically adjust rates based on demand, seasonality, and competitor analysis.",
    icon: <EnterpriseGradeCapabilitiesIcon2 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "multi-property",
    title: "Multi-Property Management",
    description:
      "Centralized control for multiple locations from a single dashboard.",
    icon: <EnterpriseGradeCapabilitiesIcon3 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "parity-monitor",
    title: "Parity Monitor",
    description:
      "Track & maintain rate parity across all your distribution channels automatically.",
    icon: <EnterpriseGradeCapabilitiesIcon4 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "unified-reports",
    title: "Unified Reports",
    description:
      "Consolidated performance metrics from all connected channels in one comprehensive dashboard.",
    icon: <EnterpriseGradeCapabilitiesIcon5 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "tailored-rate",
    title: "Tailored Rate Management",
    description:
      "Set specific pricing rules, margins, and currency adjustments per channel.",
    icon: <EnterpriseGradeCapabilitiesIcon6 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "self-ota",
    title: "Self-OTA Mapping",
    description:
      "Easily map rooms and rate plans with a self-service tool giving you complete control over your distribution.",
    icon: <EnterpriseGradeCapabilitiesIcon7 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "pooled-inventory",
    title: "Pooled Inventory",
    description:
      "Maximize occupancy with a single pool of inventory distributed across all connected channels.",
    icon: <EnterpriseGradeCapabilitiesIcon8 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "drip-feed-inventory",
    title: "Drip Feed Inventory",
    description:
      "Release inventory gradually to optimize revenue and maintain better control over distribution.",
    icon: <EnterpriseGradeCapabilitiesIcon9 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "seasonal-rates",
    title: "Seasonal Rates",
    description:
      "Set and manage special pricing rules for peak seasons, holidays, and events.",
    icon: <EnterpriseGradeCapabilitiesIcon10 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description:
      "Manage your property on the go with our comprehensive mobile application.",
    icon: <EnterpriseGradeCapabilitiesIcon11 className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "advanced-security",
    title: "Advanced Security",
    description:
      "Enterprise-grade security and permissions to keep your data and operations safe.",
    icon: <EnterpriseGradeCapabilitiesIcon12 className="h-8 w-8 text-[#ED862E]" />,
  },
]

export function ChannelConnectEngineeredSection() {
  return (
    <section className="w-full bg-white pb-[90px]">
      <div className="lg:mx-[80px] mx-[20px]">
        {/* Header */}
        <SectionHeader
          className="mx-auto mb-[45px] max-w-3xl text-center lg:mb-[80px]"
          eyebrow="Enterprise-grade capabilities"
          eyebrowClassName="mb-[12px]"
          title={
            <>
              Engineered for{" "}
              <SectionHeader.Highlight>Complexity</SectionHeader.Highlight>
            </>
          }
          titleClassName="mb-[24px]"
          description="Scalable solutions for multi-property operations and revenue optimization teams."
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engineeredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex h-full min-h-[204px] flex-col items-start gap-[19px] rounded-[16px] border border-black/5 bg-white p-[20px] text-left"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ED862E]/10">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-plus-jakarta-700 text-[18px] leading-[1.2] text-[#010C28] lg:text-[20px]">
                  {feature.title}
                </h3>
                <p className="font-source-sans-400 text-[15px] leading-[1.6] text-[#64748B] lg:text-[16px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
