"use client"

import Image from "next/image"
import { useState } from "react"
import { CalendarRange, ClipboardCheck, BedDouble, FileText } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"
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
    <section className="w-full bg-[#F8FAFC] px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="container mx-auto max-w-[1200px]">
        <SectionHeader
          theme="light"
          className="mb-10 lg:mb-16"
          eyebrow="CENTRAL RESERVATION SYSTEM"
          title={
            <>
              Centralize Control Across <br className="hidden md:block" />
              Your Entire Portfolio
            </>
          }
        />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Features List */}
          <div className="flex flex-col gap-4">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id
              const Icon = feature.icon

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-2xl border p-6 text-left transition-all duration-300",
                    isActive
                      ? "border-transparent bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                      : "border-[#E2E8F0] bg-transparent hover:border-[#ED862E]/30 hover:bg-white/50"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive ? "bg-[#ED862E]/10 text-[#ED862E]" : "bg-white text-[#94A3B8]"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col gap-1 pt-1">
                    <h3
                      className={cn(
                        "font-plus-jakarta-700 text-[18px]",
                        isActive ? "text-[#010C28]" : "text-[#64748B]"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        "font-source-sans-400 text-[15px] leading-[24px]",
                        isActive ? "text-[#475569]" : "text-[#94A3B8]"
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Image/Dashboard Dummy */}
          <div className="relative w-full rounded-2xl bg-white p-2 shadow-2xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E2E8F0] bg-slate-100 flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-plus-jakarta-500 text-sm gap-2">
                <CalendarRange className="h-10 w-10 opacity-50" />
                <span>PMS Dashboard Dummy</span>
              </div>
              {/* Fallback image */}
              {/* <Image src="/images/Channel-Connect/DummyPMS.png" alt="PMS Dashboard" fill className="object-cover" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
