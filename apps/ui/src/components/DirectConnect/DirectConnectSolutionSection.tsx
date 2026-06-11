"use client"

import type * as React from "react"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"
import dynamic from "next/dynamic"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

import cottageVillaAnimation from "../../../public/assets/cattage_villa.json"
import enrichmentAnimation from "../../../public/assets/enrichment.json"
import finalMobileScreenAnimation from "../../../public/assets/final_mobile_screen.json"
import ghaReferenceAnimation from "../../../public/assets/GHA refrence pic 1.json"
import intelligentAnalyticsAnimation from "../../../public/assets/intelligent_analytice.json"
import memberDiscountAnimation from "../../../public/assets/member_discount.json"
import paymentCardAnimation from "../../../public/assets/payment_card.json"
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
  /** Optional Lottie JSON shown in the card's popup modal (replaces the
      bottom screenshot when present). */
  lottieAnimation?: unknown
  animationContainerClassName?: string
  textContainerClassName?: string
  lottieClassName?: string
  lottieRendererSettings?: any
}

const solutions: SolutionCard[] = [
  {
    id: "conversion-booking",
    title: "Conversion-First Booking Engine",
    subtitle:
      "Designed for speed and luxury. Increase direct bookings by up to 20% with our frictionless check-out experience. Enable guests to book faster with an intuitive, conversion-focused interface that reduces friction and improves completion rates. Offer personalized booking journeys, real-time availability, and responsive experiences that work seamlessly across desktop, tablet, and mobile devices.",
    gridSpan: "col-span-1 lg:col-span-7 min-h-[432px]",
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
    icon: <UnifiedPlatformIcon1 className="text-[#ED862E]" />,
    modalWidth: "w-[950px]",
    showLearnMore: false,
    modalLayout: "side-by-side",
    lottieAnimation: finalMobileScreenAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[240px] lg:pb-0 lg:max-w-[50%]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[240px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:bottom-0 lg:right-0 lg:mx-0 lg:h-[380px] lg:w-[45%] lg:items-end lg:justify-center lg:pr-6",
    lottieClassName: "translate-y-8 lg:translate-y-[15%] scale-110 lg:scale-[1.15] origin-bottom",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "discounts-promotion",
    title: "Discounts & Promotions",
    subtitle:
      "Create smart hotel promotions, seasonal discounts, last-minute deals, and exclusive guest offers. Easily manage special rates, and promo codes to attract more guests and maximize revenue.",
    isDark: true,
    icon: <UnifiedPlatformIcon2 />,
    showLearnMore: false,
    modalLayout: "stacked",
    gridSpan: "col-span-1 lg:col-span-5 min-h-[432px]",
    anchor: "top-right",
    modalFeatures: [
      "Smart promotions",
      "Seasonal discounts",
      "Last-minute deals",
      "Promo codes",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    modalWidth: "w-[950px]",
    lottieAnimation: cottageVillaAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[200px] lg:pb-[260px]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:-bottom-6 lg:right-0 lg:mx-0 lg:h-[280px] lg:w-full lg:items-end lg:justify-center",
    lottieClassName: "scale-100 origin-bottom",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "google-hotel-ads",
    title: "Google Hotel Ads",
    subtitle:
      "Display your rates directly and maximize direct bookings through Google Search and Google Maps.",
    isDark: true,
    gridSpan: "col-span-1 lg:col-span-6 min-h-[250px]",
    anchor: "top-left",
    modalFeatures: [
      "Direct Google integration",
      "Maximize direct bookings",
      "Increased visibility",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon3 />,
    modalWidth: "w-[950px]",
    showLearnMore: false,
    lottieAnimation: ghaReferenceAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[160px] lg:pb-0 lg:max-w-[60%] xl:max-w-[45%]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[150px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:-bottom-14 lg:-right-2 lg:mx-0 lg:h-[270px] lg:w-[40%] xl:w-[50%] lg:items-end lg:justify-end",
    lottieClassName: "scale-110 lg:scale-100 origin-bottom-right",
    lottieRendererSettings: { preserveAspectRatio: "xMaxYMax meet" },
  },
  {
    id: "intelligent-analytics",
    title: "Intelligent Analytics",
    subtitle:
      "Keep track of your online bookings with advanced reports, statistics, and advanced tracking via one built-in dashboard.",
    gridSpan: "col-span-1 lg:col-span-6 min-h-[250px]",
    anchor: "top-right",
    modalFeatures: [
      "Advanced reports",
      "Real-time statistics",
      "Built-in dashboard",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon4 />,
    modalWidth: "w-[950px]",
    showLearnMore: false,
    lottieAnimation: intelligentAnalyticsAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[160px] lg:pb-0 lg:max-w-[55%]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[150px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:mx-0 lg:h-auto lg:w-[40%] lg:items-center lg:justify-end lg:pr-8",
  },
  {
    id: "unlock-revenue",
    title: "Unlock New Revenue Streams",
    subtitle:
      "Designed to drive incremental revenue, it enables guests to book services as standalone offerings or alongside their stay directly through your website - enhancing both profitability and guest experience.",
    gridSpan: "col-span-1 lg:col-span-5 min-h-[432px]",
    anchor: "bottom-left",
    modalFeatures: [
      "Offer Add-ons before stay",
      "Sell Extras on checkout page",
    ],
    bullets: ["Offer Add-ons before stay", "Sell Extras on checkout page"],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon5 />,
    modalWidth: "w-[950px]",
    showLearnMore: false,
    lottieAnimation: enrichmentAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[200px] lg:pb-[280px]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-10 lg:-bottom-6 lg:mx-0 lg:h-[280px]",
    lottieClassName: "origin-bottom lg:scale-[1.05]",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "payments-security",
    title: "Payments & Security",
    subtitle:
      "Process every payment with total peace of mind, knowing our rock-solid security protects your guests, your reputation, and your revenue.",
    isDark: true,
    gridSpan: "col-span-1 lg:col-span-7 min-h-[432px]",
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
    showLearnMore: false,
    modalLayout:"side-by-side",
    lottieAnimation: paymentCardAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[200px] lg:pb-0 lg:max-w-[50%]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:inset-y-0 lg:right-8 lg:mx-0 lg:h-full lg:w-[40%] lg:items-center lg:justify-end",
    lottieClassName: "scale-100 origin-center",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMid meet" },
  },
  {
    id: "agents-member",
    title: "Agents / Member Management",
    subtitle:
      "Reward your direct bookers with exclusive member-only rates designed to drive loyalty and repeat stays. Keep guests engaged with personalized offers, promotions, and updates while optimizing your pricing strategy to increase direct bookings and long-term customer value.",
    gridSpan: "col-span-1 lg:col-span-12 min-h-[350px]",
    anchor: "bottom-left",
    modalFeatures: [
      "Offer exclusive rates",
      "Offer exclusive member discounts",
    ],
    bullets: ["Offer exclusive rates", "Offer exclusive member discounts"],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon7 />,
    modalWidth: "w-full",
    showLearnMore: false,
    lottieAnimation: memberDiscountAnimation,
    textContainerClassName: "relative z-10 flex grow flex-col pb-[200px] lg:pb-0 lg:max-w-[45%] xl:max-w-[40%]",
    animationContainerClassName: "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:-bottom-6 lg:right-0 lg:mx-0 lg:h-[300px] lg:w-[50%] xl:w-[55%] lg:items-end lg:justify-end lg:pr-8",
    lottieClassName: "scale-100 origin-bottom-right",
    lottieRendererSettings: { preserveAspectRatio: "xMaxYMax meet" },
  },
]

export function DirectConnectSolutionSection() {
  return (
    <div data-nav-theme="light">
      <BentoGrid
        items={solutions}
        sectionClassName="relative w-full pt-[50px] pb-[120px] lg:pt-[80px] lg:pb-[150px] px-4 md:px-8 bg-white isolate"
        containerClassName="container mx-auto max-w-[1300px]"
        gridClassName="relative grid grid-cols-1 gap-6 lg:grid-cols-12"
        cardClassName="px-6 py-8 md:px-6 md:py-6 lg:px-10 lg:py-[30px] rounded-[32px] shadow-[0_20px_50px_-12px_rgba(1,14,56,0.15)]"
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
          <>
            <div className={cn("relative z-10 flex grow flex-col", item.textContainerClassName)}>
              <div className="mb-4 lg:mb-6 origin-top-left scale-[0.8] lg:scale-100">{item.icon}</div>

              <h3
                className={cn(
                  "font-plus-jakarta-700 mb-2 lg:mb-[12px] pr-4 lg:pr-10 text-[20px] lg:text-[24px] leading-[1.2]",
                  item.isDark ? "text-white" : "text-[#0F172A]"
                )}
              >
                {item.title}
              </h3>

              <p
                className={cn(
                  "font-source-sans-400 mb-4 lg:mb-8 pr-2 lg:pr-4 text-[14px] lg:text-[16px] leading-[1.6] lg:leading-[24px]",
                  item.isDark ? "text-white/80" : "text-[#64748B]"
                )}
              >
                {item.subtitle}
              </p>
            </div>

            {item.lottieAnimation && (
              <div className={item.animationContainerClassName || "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center transition-transform duration-500 group-hover:scale-105 pointer-events-none md:mx-0 lg:h-[240px]"}>
                <Lottie
                  animationData={item.lottieAnimation}
                  loop={true}
                  className={cn("h-full w-full", item.lottieClassName)}
                  rendererSettings={item.lottieRendererSettings}
                />
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}
