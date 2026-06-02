"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { CentralizeControlAccessIcon1, CentralizeControlAccessIcon2, CentralizeControlAccessIcon3, CentralizeControlAccessIcon4 } from "../../../public/svg/Channel-Connect"


const features = [
  {
    id: "live-dashboard",
    title: "Live Reservation Dashboard",
    description: "Manage all bookings in one unified calendar with smart filtering.",
    icon: CentralizeControlAccessIcon1,
  },
  {
    id: "checkin-checkout",
    title: "Check-in & Check-out Management",
    description: "Streamline guest check-in/out with complete booking and payment details.",
    icon: CentralizeControlAccessIcon2,
  },
  {
    id: "room-status",
    title: "Room Status & Availability",
    description: "Track room availability and status in real-time.",
    icon: CentralizeControlAccessIcon3,
  },
  {
    id: "inquiry-quote",
    title: "Inquiry & Quote Management",
    description: "Handle group inquiries and generate quick, professional quotes with ease.",
    icon: CentralizeControlAccessIcon4,
  },
]

export function ChannelConnectCentralizeSection() {
  const [activeFeature, setActiveFeature] = useState(features[0]?.id)

  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#F8FAFC] px-4 py-[60px] md:px-8 lg:py-[100px]"
    >
      <div className="container mx-auto max-w-[1200px]">
        <SectionHeader
          className="gap-[24px] lg:gap-[36px] items-start text-left mb-[24px] lg:mb-[36px]"
          eyebrow="CENTRAL RESERVATION SYSTEM"
          eyebrowClassName="mb-0"
          title={
            <SectionHeader.Highlight>
              Centralize Control Across Your Entire Portfolio
            </SectionHeader.Highlight>
          }
          highlightGradient="linear-gradient(91deg, #010E38 9.57%, #1A2F6D 37.74%, #ED862E 82.58%)"
        />
        <FeatureShowcase
          imageSlot={
            <div className="relative w-full rounded-2xl bg-white p-2 shadow-2xl">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-slate-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-plus-jakarta-500 text-sm text-slate-400">
                  <span>PMS Dashboard Dummy</span>
                </div>
              </div>
            </div>
          }
        >
          {features.map((feature) => {
            const isActive = activeFeature === feature.id
            const Icon = feature.icon

            return (
              <FeatureShowcase.Card
                key={feature.id}
                as="button"
                variant="interactive"
                isActive={isActive}
                onClick={() => setActiveFeature(feature.id)}
                icon={<Icon className="h-6 w-6" />}
                title={feature.title}
                subtitle={feature.description}
              />
            )
          })}
        </FeatureShowcase>
      </div>
    </section>
  )
}
