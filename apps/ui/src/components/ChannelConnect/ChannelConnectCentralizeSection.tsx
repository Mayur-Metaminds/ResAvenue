"use client"

import Image from "next/image"
import { useState } from "react"
import { CalendarRange, ClipboardCheck, BedDouble, FileText } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { cn } from "@/lib/styles"

const features = [
  {
    id: "live-dashboard",
    title: "Live Reservation Dashboard",
    description: "Manage all bookings in one unified calendar with smart filtering.",
    icon: CalendarRange,
  },
  {
    id: "checkin-checkout",
    title: "Check-in & Check-out Management",
    description: "Streamline guest check-in/out with complete booking and payment details.",
    icon: ClipboardCheck,
  },
  {
    id: "room-status",
    title: "Room Status & Availability",
    description: "Track room availability and status in real-time.",
    icon: BedDouble,
  },
  {
    id: "inquiry-quote",
    title: "Inquiry & Quote Management",
    description: "Handle group inquiries and generate quick, professional quotes with ease.",
    icon: FileText,
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
        <FeatureShowcase
          header={{
            className: "mb-6 lg:mb-10",
            eyebrow: "CENTRAL RESERVATION SYSTEM",
            title: (
              <>
                Centralize Control Across <br className="hidden md:block" />
                Your Entire Portfolio
              </>
            ),
          }}
          imageSlot={
            <div className="relative w-full rounded-2xl bg-white p-2 shadow-2xl">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-slate-100">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 font-plus-jakarta-500 text-sm text-slate-400">
                  <CalendarRange className="h-10 w-10 opacity-50" />
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
