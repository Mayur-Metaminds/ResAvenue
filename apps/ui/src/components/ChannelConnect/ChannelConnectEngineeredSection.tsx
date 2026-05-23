"use client"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  RealTimeSyncIcon,
  DynamicPricingIcon,
  MultiPropertyManagementIcon,
  ParityMonitorIcon,
  UnifiedReportsIcon,
  TailoredRateManagementIcon,
  SelfOTAMappingIcon,
  PooledInventoryIcon,
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
    icon: <RealTimeSyncIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic Pricing",
    description:
      "Automatically adjust rates based on demand, seasonality, and competitor analysis.",
    icon: <DynamicPricingIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "multi-property",
    title: "Multi-Property Management",
    description:
      "Centralized control for multiple locations from a single dashboard.",
    icon: <MultiPropertyManagementIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "parity-monitor",
    title: "Parity Monitor",
    description:
      "Track & maintain rate parity across all your distribution channels automatically.",
    icon: <ParityMonitorIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "unified-reports",
    title: "Unified Reports",
    description:
      "Consolidated performance metrics from all connected channels in one comprehensive dashboard.",
    icon: <UnifiedReportsIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "tailored-rate",
    title: "Tailored Rate Management",
    description:
      "Set specific pricing rules, margins, and currency adjustments per channel.",
    icon: <TailoredRateManagementIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "self-ota",
    title: "Self-OTA Mapping",
    description:
      "Easily map rooms and rate plans with a self-service tool giving you complete control over your distribution.",
    icon: <SelfOTAMappingIcon className="h-8 w-8 text-[#ED862E]" />,
  },
  {
    id: "pooled-inventory",
    title: "Pooled Inventory",
    description:
      "Maximize occupancy with a single pool of inventory distributed across all connected channels.",
    icon: <PooledInventoryIcon className="h-8 w-8 text-[#ED862E]" />,
  },
]

export function ChannelConnectEngineeredSection() {
  return (
    <section className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="container mx-auto max-w-[1200px]">
        {/* Header */}
        <SectionHeader
          theme="light"
          className="mx-auto mb-[50px] max-w-3xl text-center lg:mb-[80px]"
          eyebrow="ENGINEERED FOR COMPLEXITY"
          title={
            <>
              Engineered for{" "}
              <SectionHeader.Highlight>Complexity</SectionHeader.Highlight>
            </>
          }
          description="Scalable solutions for multi-property operations and revenue optimization teams."
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {engineeredFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-start text-left"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ED862E]/10">
                {feature.icon}
              </div>
              <h3 className="font-plus-jakarta-700 mb-3 text-[18px] text-[#010C28] lg:text-[20px]">
                {feature.title}
              </h3>
              <p className="font-source-sans-400 text-[15px] leading-[1.6] text-[#64748B] lg:text-[16px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
