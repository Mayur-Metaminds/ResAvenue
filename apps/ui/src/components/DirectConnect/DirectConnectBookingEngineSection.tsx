"use client"

import type * as React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  BookingEngineIcon1,
  BookingEngineIcon2,
  BookingEngineIcon3,
  BookingEngineIcon4,
  BookingEngineIcon5,
} from "../../../public/svg/Direct-Connect"

type FeatureItem = {
  id: string
  title: string
  subtitle: string
  Icon: React.ComponentType
}

const features: FeatureItem[] = [
  {
    id: "live-availability",
    title: "Live Availability & Smart Pricing",
    subtitle: "Real-time room availability and dynamic pricing",
    Icon: BookingEngineIcon1,
  },
  {
    id: "promotions",
    title: "Promotions & Flash Sales Engine",
    subtitle: "Advanced promo codes and flash sale features",
    Icon: BookingEngineIcon2,
  },
  {
    id: "upsell",
    title: "Upsell & Add-on Optimization",
    subtitle: "Industry upsell features for room upgrades & add-ons",
    Icon: BookingEngineIcon3,
  },
  {
    id: "global-support",
    title: "Global Accessibility Support",
    subtitle: "Multi-language and multi-currency support",
    Icon: BookingEngineIcon4,
  },
  {
    id: "automated-engagement",
    title: "Automated Guest Engagement",
    subtitle: "Automated guest communication flow",
    Icon: BookingEngineIcon5,
  },
]

export function DirectConnectBookingEngineSection() {
  return (
    <section className="w-full bg-white px-4 py-[32px] md:px-8 lg:py-[80px] lg:py-[120px]">
      <div className="container mx-auto max-w-[1300px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-24">
          {/* Left Column: Content */}
          <div className="flex flex-col">
            <SectionHeader
              theme="light"
              className="mb-10 items-start text-left"
              eyebrow="OPTIMIZED FOR CONVERSIONS"
              title={
                <>
                  Next-
                  <SectionHeader.Highlight>
                    Gen Booking Engine
                  </SectionHeader.Highlight>
                </>
              }
              description="A high-conversion, mobile-optimized engine delivering a seamless booking journey from discovery to payment."
            />

            <div className="mt-8 flex w-full max-w-xl flex-col gap-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] md:p-6"
                >
                  <div className="mb-1.5 flex items-center gap-3">
                    <div className="flex shrink-0 items-center justify-center">
                      <feature.Icon />
                    </div>
                    <h4 className="font-plus-jakarta-700 text-[16px] text-[#0F172A] md:text-[17px]">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="font-source-sans-400 pl-8 text-[14px] leading-relaxed text-[#64748B] md:text-[15px]">
                    {feature.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mockup */}
          <div className="relative flex aspect-[4/3] w-full items-center justify-center lg:aspect-square xl:aspect-[4/3]">
            {/* Glow effect behind the image */}
            <div className="absolute top-1/2 left-1/2 z-0 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/15 blur-[100px]" />

            {/* Mockup Image */}
            <div className="relative z-10 flex h-full max-h-[600px] w-full items-center justify-center">
              <img
                src="/images/Direct-Connect/Booking-Engine.png"
                alt="Booking Engine Mockup"
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
