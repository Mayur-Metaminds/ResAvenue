"use client"

import Image from "next/image"
import type * as React from "react"
import { useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { LazyLottie } from "@/components/common/LazyLottie"

import {
  BookingEngineIcon1,
  BookingEngineIcon2,
  BookingEngineIcon3,
  BookingEngineIcon4,
  BookingEngineIcon5,
  BookingEngineIcon6,
  BookingEngineIcon7,
} from "../../../public/svg/Direct-Connect"

type FeatureItem = {
  id: string
  title: string
  subtitle: string
  Icon: React.ComponentType
  /** Mockup shown in the image slot when this feature is active. */
  image: string
  /**
   * Intrinsic pixel dimensions of `image` (skipped for the Lottie/.json
   * entry). Required by next/image in non-`fill` mode — the responsive
   * `w-full h-auto` / `lg:h-full lg:w-auto` classes on the image slot rely on
   * the browser knowing each mockup's real aspect ratio to avoid distortion
   * or layout shift when switching between features.
   */
  width?: number
  height?: number
}

// TODO: Replace these placeholder images per-feature once the design assets
// are ready. For now they all point at the same booking-engine mockup so the
// active-card switching is functional end-to-end.
const FALLBACK_IMAGE = "/images/Direct-Connect/Booking-Engine.avif"
const FALLBACK_WIDTH = 676
const FALLBACK_HEIGHT = 556

const features: FeatureItem[] = [
  {
    id: "live-availability",
    title: "Live Inventory & Smart Pricing",
    subtitle: "Real-time room availability and dynamic pricing",
    Icon: BookingEngineIcon1,
    image: "/images/direct-connect/liveInventory.avif",
    width: 2992,
    height: 1732,
  },
  {
    id: "promotions",
    title: "Promotions & Flash Sales Engine",
    subtitle: "Advanced promo codes and flash sale features",
    Icon: BookingEngineIcon2,
    image: "/images/Direct-Connect/promotionsAndFlash.json",
  },
  {
    id: "upsell",
    title: "Upsell & Add-on Optimization",
    subtitle: "Industry upsell features for room upgrades & add-ons",
    Icon: BookingEngineIcon3,
    image: "/images/direct-connect/upsells.avif",
    width: 2992,
    height: 2220,
  },
  {
    id: "global-support",
    title: "Global Accessibility Support",
    subtitle: "Multi-language and multi-currency support",
    Icon: BookingEngineIcon4,
    image: "/images/direct-connect/globalAccessibility.avif",
    width: 2992,
    height: 2053,
  },
  {
    id: "automated-engagement",
    title: "Automated Guest Engagement",
    subtitle: "Automated guest communication flow",
    Icon: BookingEngineIcon5,
    image: "/images/direct-connect/automatedGuest.avif",
    width: 2598,
    height: 1732,
  },
  {
    id: "invoicing-payment-collect",
    title: "Invoicing / Payment Collect",
    subtitle: "Collect secure online payments instantly through a simple payment link",
    Icon: BookingEngineIcon6,
    image: "/images/direct-connect/collections.avif",
    width: 2598,
    height: 2375,
  },
  {
    id: "retargeting-abandoned-bookings",
    title: "Retargeting - Abandoned Bookings",
    subtitle: "Convert abandoned bookings into confirmed reservations with real-time guest retargeting ",
    Icon: BookingEngineIcon7,
    image: "/images/direct-connect/retargetting.avif",
    width: 2598,
    height: 1848,
  },
]

export function DirectConnectBookingEngineSection() {
  const [activeId, setActiveId] = useState(features[0]?.id)
  const activeFeature =
    features.find((f) => f.id === activeId) ?? features[0]

  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-[32px] md:px-8 lg:py-[80px] lg:py-[120px] overflow-hidden"
    >
      <div className="container mx-auto max-w-[1440px] px-4 md:px-8 xl:px-[80px]">
        <FeatureShowcase
          fullWidthHeader={true}
          className="lg:-ml-1 2xl:-ml-4 4xl:-ml-1 lg:items-stretch xl:grid-cols-[420px_1fr]"
          imageMobilePosition="top"
          imageClassName="h-full flex items-center justify-center lg:justify-end"
          header={{
            className: "mb-[36px]",
            eyebrow: "OPTIMIZED FOR CONVERSIONS",
            eyebrowClassName: "mb-0 ",
            titleClassName: "mb-0",
            title: (
              <>
                Next-
                <SectionHeader.Highlight>
                  Gen Booking Engine
                </SectionHeader.Highlight>
              </>
            ),
            description: "A high-conversion, mobile-optimized engine delivering a seamless booking journey from discovery to payment.",
            descriptionClassName: "leading-[28px]"
          }}
          imageSlot={
            <>
              {/* Glow effect behind the image */}
              <div className="absolute top-1/2 left-1/2 z-0 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/15 blur-[100px]" />

              {/* Mockup Image — keyed on activeFeature.id so React remounts the
                  <img> when the user clicks a different card, giving a fresh
                  load + native crossfade as the src changes. */}
              <div className="relative z-10 flex h-full w-full items-center justify-start lg:justify-center">
                {activeFeature?.image.endsWith(".json") ? (
                  <LazyLottie
                    key={activeFeature.id}
                    src={activeFeature.image}
                    priority="lazy"
                    className="h-auto w-full origin-center drop-shadow-2xl transition-[opacity,transform] duration-300 min-[425px]:max-lg:scale-[0.85] lg:h-full lg:max-h-[500px] lg:w-auto lg:max-w-none lg:translate-x-8 lg:object-left lg:scale-[0.6] lg:-ml-11 xl:translate-x-12 xl:scale-100"
                  />
                ) : (
                  <Image
                    key={activeFeature?.id}
                    src={activeFeature?.image ?? FALLBACK_IMAGE}
                    alt={activeFeature?.title ?? "Booking Engine Mockup"}
                    width={activeFeature?.width ?? FALLBACK_WIDTH}
                    height={activeFeature?.height ?? FALLBACK_HEIGHT}
                    className="h-auto w-full origin-center object-contain drop-shadow-2xl transition-[opacity,transform] duration-300 min-[425px]:max-lg:scale-[0.85] lg:h-full lg:max-h-[450px] lg:w-auto lg:max-w-none lg:translate-x-8 lg:object-left lg:scale-[0.6] lg:-ml-11 xl:translate-x-12 xl:scale-100"
                  />
                )}
              </div>
            </>
          }
        >
          {features.map((feature) => {
            const isActive = activeFeature?.id === feature.id
            return (
              <FeatureShowcase.Card
                key={feature.id}
                as="button"
                variant="interactive"
                isActive={isActive}
                onClick={() => setActiveId(feature.id)}
                icon={<feature.Icon />}
                title={feature.title}
                subtitle={feature.subtitle}
              />
            )
          })}
        </FeatureShowcase>
      </div>
    </section>
  )
}
