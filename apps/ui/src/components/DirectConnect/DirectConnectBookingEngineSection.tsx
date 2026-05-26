"use client"

import type * as React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"

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
        <FeatureShowcase
          header={{
            eyebrow: "OPTIMIZED FOR CONVERSIONS",
            title: (
              <>
                Next-
                <SectionHeader.Highlight>
                  Gen Booking Engine
                </SectionHeader.Highlight>
              </>
            ),
            description: "A high-conversion, mobile-optimized engine delivering a seamless booking journey from discovery to payment.",
          }}
          imageSlot={
            <>
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
            </>
          }
        >
          {features.map((feature) => (
            <FeatureShowcase.Card
              key={feature.id}
              icon={<feature.Icon />}
              title={feature.title}
              subtitle={feature.subtitle}
              variant="default"
            />
          ))}
        </FeatureShowcase>
      </div>
    </section>
  )
}
