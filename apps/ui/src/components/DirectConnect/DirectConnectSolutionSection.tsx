"use client"

import type * as React from "react"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

import { CheckedIcon } from "../../../public/svg/commonSvg"
import {
  UnifiedPlatformIcon1,
  UnifiedPlatformIcon2,
  UnifiedPlatformIcon3,
  UnifiedPlatformIcon4,
  UnifiedPlatformIcon5,
  UnifiedPlatformIcon6,
  UnifiedPlatformIcon7,
} from "../../../public/svg/Direct-Connect"

type SolutionCard = BentoItem & {
  subtitle: string
  bullets?: string[]
  icon: React.ReactNode
}

const solutions: SolutionCard[] = [
  {
    id: "conversion-booking",
    title: "Conversion-First Booking Engine",
    subtitle:
      "Designed for speed and luxury. Increase direct bookings by up to 20% with our frictionless checkout experience.",
    gridSpan: "col-span-1 md:col-span-7 min-h-[432px] md:h-[432px]",
    anchor: "top-left",
    modalFeatures: [
      "Mobile-friendly booking engine",
      "Upsell & Add-on Optimization",
      "Integrated Payment Gateway",
      "Multi-currency & Multi-lingual",
    ],
    bullets: [
      "Mobile-friendly booking engine",
      "Upsell & Add-on Optimization",
      "Integrated Payment Gateway",
      "Multi-currency & Multi-lingual",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon1 />,
    modalWidth: "w-[950px]",
  },
  {
    id: "discounts-promotion",
    title: "Discounts & Promotion",
    subtitle:
      "Create smart hotel promotions, seasonal discounts, last-minute deals, and exclusive guest offers. Easily manage special rates, and promo codes to attract more guests and maximize revenue.",
    isDark: true,
    gridSpan: "col-span-1 md:col-span-5 min-h-[432px] md:h-[432px]",
    anchor: "top-right",
    modalFeatures: [
      "Smart promotions",
      "Seasonal discounts",
      "Last-minute deals",
      "Promo codes",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon2 />,
    modalWidth: "w-[950px]",
  },
  {
    id: "google-hotel-ads",
    title: "Google Hotel Ads",
    subtitle:
      "Display your rates directly and maximize direct bookings through Google Search and Google Maps.",
    isDark: true,
    gridSpan: "col-span-1 md:col-span-6 min-h-[250px] md:h-[250px]",
    anchor: "top-left",
    modalFeatures: [
      "Direct Google integration",
      "Maximize direct bookings",
      "Increased visibility",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon3 />,
    modalWidth: "w-[950px]",
  },
  {
    id: "intelligent-analytics",
    title: "Intelligent Analytics",
    subtitle:
      "Keep track of your online bookings with advanced reports, statistics, and advanced tracking via one built-in dashboard.",
    gridSpan: "col-span-1 md:col-span-6 min-h-[250px] md:h-[250px]",
    anchor: "top-right",
    modalFeatures: [
      "Advanced reports",
      "Real-time statistics",
      "Built-in dashboard",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon4 />,
    modalWidth: "w-[950px]",
  },
  {
    id: "unlock-revenue",
    title: "Unlock New Revenue Streams",
    subtitle:
      "Designed to drive incremental revenue, it enables guests to book services as standalone offerings or alongside their stay directly through your website - enhancing both profitability and guest experience.",
    gridSpan: "col-span-1 md:col-span-5 min-h-[432px] md:h-[432px]",
    anchor: "bottom-left",
    modalFeatures: [
      "Offer Add-ons before stay",
      "Sell Extras on checkout page",
    ],
    bullets: ["Offer Add-ons before stay", "Sell Extras on checkout page"],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon5 />,
    modalWidth: "w-[950px]",
  },
  {
    id: "payments-security",
    title: "Payments & Security",
    subtitle:
      "Process every payment with total peace of mind, knowing our rock-solid security protects your guests, your reputation, and your revenue.",
    isDark: true,
    gridSpan: "col-span-1 md:col-span-7 min-h-[432px] md:h-[432px]",
    anchor: "bottom-right",
    modalFeatures: [
      "Secure PCI compliant payment processing",
      "Fully mobile optimized payments",
      "Multiple payment flows",
    ],
    bullets: [
      "Secure PCI compliant payment processing",
      "Fully mobile optimized payments",
      "Multiple payment flows",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon6 />,
    modalWidth: "w-[950px]",
  },
  {
    id: "agents-member",
    title: "Agents / Member Management",
    subtitle:
      "Reward your direct bookers with exclusive member-only rates designed to drive loyalty and repeat stays. Keep guests engaged with personalized offers, promotions, and updates while optimizing your pricing strategy to increase direct bookings and long-term customer value.",
    gridSpan: "col-span-1 md:col-span-12 min-h-[432px] md:h-[432px]",
    anchor: "bottom-left",
    modalFeatures: [
      "Offer exclusive rates",
      "Offer exclusive member discounts",
    ],
    bullets: ["Offer exclusive rates", "Offer exclusive member discounts"],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon7 />,
    modalWidth: "w-full",
  },
]

export function DirectConnectSolutionSection() {
  return (
    <div data-nav-theme="light">
    <BentoGrid
      items={solutions}
      sectionClassName="w-full py-[50px] lg:py-[80px] px-4 md:px-8 bg-white"
      containerClassName="container mx-auto max-w-[1300px]"
      gridClassName="relative grid grid-cols-1 gap-6 md:grid-cols-12"
      cardClassName="px-6 py-8 md:px-10 md:py-[30px] rounded-[32px] shadow-[0_20px_50px_-12px_rgba(1,14,56,0.15)]"
      header={
        <SectionHeader
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-[40px]"
          eyebrow="OUR SOLUTION"
          title={
            <>
              A Unified{" "}
              <SectionHeader.Highlight>
                Platform for Success
              </SectionHeader.Highlight>
            </>
          }
          description="Eliminate fragmented systems. Direct Connect brings your entire distribution and guest journey into one highly-responsive ecosystem."
        />
      }
      renderCard={(item) => (
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6">{item.icon}</div>

          <h3
            className={cn(
              "font-plus-jakarta-700 mb-4 pr-10 text-[24px] leading-[1.2] lg:text-[30px]",
              item.isDark ? "text-white" : "text-[#0F172A]"
            )}
          >
            {item.title}
          </h3>

          <p
            className={cn(
              "font-source-sans-400 mb-8 pr-4 text-[15px] leading-[1.75] lg:text-[18px]",
              item.isDark ? "text-white/80" : "text-[#64748B]"
            )}
          >
            {item.subtitle}
          </p>

          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-auto space-y-4">
              {item.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-[2px] shrink-0">
                    <CheckedIcon color="#22C55E" />
                  </div>
                  <span
                    className={cn(
                      "text-[15px] leading-relaxed font-medium",
                      item.isDark ? "text-white" : "text-[#010C28]"
                    )}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    />
    </div>
  )
}
