"use client"

import type * as React from "react"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { LazyLottie } from "@/components/common/LazyLottie"
import { SectionHeader } from "@/components/landing/SectionHeader"
import {
  AGENT,
  CONVERSION_FIRST_INNER,
  CONVERSION_FIRST_OUTER,
  DISCOUNT_INNER,
  DISCOUNT_OUTER,
  GOOGLE_HOTEL_ADS_INNER,
  GOOGLE_HOTEL_ADS_OUTER,
  INTELLIGENT_ANALYTICS_INNER,
  INTELLIGENT_ANALYTICS_OUTER,
  PAYMENT_INNER,
  PAYMENT_OUTER,
  UNLOCK_REVENUE_INNER,
  UNLOCK_REVENUE_OUTER,
} from "@/lib/lottie-urls"
import { cn } from "@/lib/styles"

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
  icon: React.ReactNode
  animationContainerClassName?: string
  textContainerClassName?: string
  lottieClassName?: string
  lottieRendererSettings?: any
  modalAnimationWrapperClassName?: string
}

const solutions: SolutionCard[] = [
  {
    id: "conversion-booking",
    title: "Conversion-First Booking Engine",
    subtitle:
      "Designed for speed and luxury. Increase direct bookings by up to 20% with our frictionless check-out experience.",
    modalSubtitle:
      "Designed for speed and luxury. Increase direct bookings by up to 20% with our frictionless check-out experience.\n\nEnable guests to book faster with an intuitive, conversion-focused interface that reduces friction and improves completion rates. Offer personalized booking journeys, real-time availability, and responsive experiences that work seamlessly across desktop, tablet, and mobile devices.",
    gridSpan: "col-span-1 lg:col-span-7 h-[432px]",
    anchor: "top-left",
    modalFeatures: [
      "Mobile-friendly booking engine",
      "Upsell & Add-on Optimization",
      "Integrated Payment Gateway",
      "Multi-currency & Multi-lingual",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon1 className="text-[#ED862E]" />,
    modalWidth: "w-[950px]",
    expandToId: "google-hotel-ads",
    showLearnMore: false,
    modalLayout: "side-by-side",
    modalAnimationClassName: "h-[80%] w-[80%]",
    lottieUrl: CONVERSION_FIRST_OUTER,
    modalLottieUrl: CONVERSION_FIRST_INNER,
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[240px] lg:pb-0 lg:max-w-[50%]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[240px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:bottom-0 lg:right-0 lg:mx-0 lg:h-[380px] lg:w-[45%] lg:items-end lg:justify-center lg:pr-6",
    lottieClassName:
      "translate-y-8 lg:translate-y-[15%] scale-110 lg:scale-[1.15] origin-bottom",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "discounts-promotion",
    title: "Discounts & Promotions",
    subtitle:
      "Create smart hotel promotions, seasonal discounts, last-minute deals, and exclusive guest offers. Easily manage special rates, and promo codes to attract more guests and increase revenue.",
    modalSubtitle:
      "Create smart hotel promotions, seasonal discounts, last-minute deals, and exclusive guest offers. Easily manage special rates, and promo codes to attract more guests and increase revenue. \n\n Drive urgency and increase bookings with limited-time offers, bundled packages, and personalized promotions tailored to different guest segments. Easily manage campaigns that help improve occupancy and maximize revenue opportunities.",
    isDark: true,
    icon: <UnifiedPlatformIcon2 className="text-[#ED862E]" />,
    showLearnMore: false,
    modalAnimationClassName: "lg:scale-90 xl:-mt-8",
    modalLayout: "stacked-vertical",
    gridSpan: "col-span-1 lg:col-span-5 h-[432px]",
    anchor: "top-right",
    modalFeatures: [
      "Dynamic Promotions & Packages",
      "Coupon & Discount Management",
      "Seasonal & Event-Based Pricing",
      "Revenue-Driven Offer Strategies",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    modalWidth: "w-[950px]",
    expandToId: "intelligent-analytics",
    lottieUrl: DISCOUNT_OUTER,
    modalLottieUrl: DISCOUNT_INNER,
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[200px] lg:pb-[260px]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-10 lg:bottom-0 lg:mx-0 lg:h-[280px] lg:w-auto lg:items-end lg:justify-center",
    lottieClassName: "scale-100 origin-bottom translate-y-4 lg:translate-y-2",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "google-hotel-ads",
    modalLayout: "side-by-side",
    title: "Google Hotel Ads",
    subtitle:
      "Display your rates directly and maximize direct bookings through Google Search and Google Maps.",
    modalSubtitle:
      "Increase visibility where travellers search most by displaying your direct website rates on Google Search and Google Maps. Capture high-intent travellers and encourage guests to book directly through your official website. Reduce dependency on OTAs while increasing direct revenue opportunities through metasearch visibility.  \n\n Display your official website pricing alongside OTA listings and attract guests looking for the best direct booking experience. Improve click-through rates and drive commission-free bookings directly from Google’s travel ecosystem.",
    isDark: true,
    gridSpan: "col-span-1 lg:col-span-6 min-h-[250px]",
    anchor: "top-left",
    modalAnimationClassName: "h-full w-full z-10 xl:-mt-10 xl:-ml-3",
    modalFeatures: [
      "Display Direct Website Rates",
      "Compete with OTAs on Google",
      "Increase Direct Booking Visibility",
      "Drive High-Intent Traffic",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon3 />,
    modalWidth: "w-[950px]",
    expandToId: "unlock-revenue",
    showLearnMore: false,
    lottieUrl: GOOGLE_HOTEL_ADS_OUTER,
    modalLottieUrl: GOOGLE_HOTEL_ADS_INNER,
    modalAnimationWrapperClassName: "",
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[160px] lg:pb-0 lg:max-w-[60%] xl:max-w-[45%]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[150px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:-bottom-10 xl:-bottom-14 lg:right-10 lg:mx-0 lg:h-[300px] lg:w-[40%] xl:w-[50%] lg:items-end lg:justify-end",
    lottieClassName:
      "scale-110 lg:scale-100 origin-bottom lg:origin-bottom-right",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "intelligent-analytics",
    modalLayout: "stacked-vertical",
    title: "Intelligent Analytics",
    subtitle:
      "Keep track of your online bookings with advanced reports, statistics, and advanced tracking via one built-in dashboard.",
    modalSubtitle:
      "Gain complete visibility into bookings, revenue, guest behaviour, and operational performance through one intelligent analytics dashboard today. \nMake smarter business decisions with real-time reports and actionable data that help optimize revenue and improve overall performance. \n\n Monitor booking sources, conversion trends, promotional performance, and operational KPIs through visually rich reports and analytics tools. Turn data into actionable insights that help improve pricing strategies and business growth.",
    gridSpan: "col-span-1 lg:col-span-6 min-h-[250px]",
    anchor: "top-right",
    bulletWrapperClassName: "relative z-10 mb-[-20px] md:mb-[-32px]",
    modalFeatures: [
      "Real-Time Booking Insights",
      "Revenue & Occupancy Reports",
      "Traffic Report",
      "Performance Tracking Dashboard",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon4 />,
    modalWidth: "w-[950px]",
    expandToId: "payments-security",
    showLearnMore: false,
    lottieUrl: INTELLIGENT_ANALYTICS_OUTER,
    modalLottieUrl: INTELLIGENT_ANALYTICS_INNER,
    modalAnimationWrapperClassName:
      "max-sm:mt-5 lg:scale-[1] md:-mt-20 lg:-mt-35 xl:-mt-45 ",
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[160px] lg:pb-0 lg:max-w-[55%]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[150px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:inset-y-0 lg:right-10 lg:mx-0 lg:h-auto lg:w-[40%] lg:items-center lg:justify-end lg:pr-8",
  },
  {
    id: "unlock-revenue",
    modalLayout: "stacked-vertical",
    title: "Unlock New Revenue Streams",
    subtitle:
      "Designed to drive incremental revenue, it enables guests to book services as standalone offerings or alongside their stay directly through your website - enhancing both profitability and guest experience.",
    modalSubtitle:
      "Go beyond room bookings by turning every guest interaction into an additional revenue opportunity. ResAvenue enables properties to sell experiences, activities, and value-added services directly through their website — bundled either with stays or as standalone offerings.Enhance guest satisfaction while increasing ancillary revenue through curated experiences and personalized upsells. \n\nPromote spa sessions, airport transfers, dining experiences, day packages, activities, wellness services, and more directly within the booking flow. Create dynamic combinations that encourage guests to spend more before arrival while simplifying service discovery and bookings.",
    gridSpan: "col-span-1 lg:col-span-5 min-h-[432px]",
    anchor: "bottom-left",
    modalFeatures: [
      "Offer Add-ons with Room Stays",
      "Curated Guest Experiences",
      "Sell Standalone Services Directly",
      "Flexible Packages & Bundles",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    modalAnimationClassName: "h-full w-full xl:-mt-17 xl:-ml-1 scale-[0.9]",
    icon: <UnifiedPlatformIcon5 />,
    modalWidth: "w-[950px]",
    expandToId: "google-hotel-ads",
    showLearnMore: false,
    lottieUrl: UNLOCK_REVENUE_OUTER,
    modalLottieUrl: UNLOCK_REVENUE_INNER,
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[200px] lg:pb-[210px]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-10 lg:-bottom-6 lg:mx-0 lg:h-[280px]",
    lottieClassName: "origin-bottom lg:scale-[1.08]",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
  {
    id: "payments-security",
    title: "Payments & Security",
    subtitle:
      "Process every payment with total peace of mind, knowing our rock-solid security protects your guests, your reputation, and your revenue. \n\n Drive urgency and increase bookings with limited-time offers, bundled packages, and personalized promotions tailored to different guest segments. Easily manage campaigns that help improve occupancy and maximize revenue opportunities.",
    isDark: true,
    gridSpan: "col-span-1 lg:col-span-7 min-h-[432px]",
    anchor: "bottom-right",
    modalFeatures: [
      "Secure, PCI-compliant payment processing",
      "Fully mobile-optimized payments",
      "Multiple Payment Modes",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon6 />,
    modalWidth: "w-[950px]",
    expandToId: "intelligent-analytics",
    showLearnMore: false,
    modalLayout: "side-by-side",
    lottieUrl: PAYMENT_OUTER,
    modalLottieUrl: PAYMENT_INNER,
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[200px] lg:pb-0 lg:max-w-[50%]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:inset-y-0 lg:right-8 lg:mx-0 lg:h-full lg:w-[40%] lg:items-center lg:justify-end",
    lottieClassName: "scale-100 origin-center",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMid meet" },
  },
  {
    id: "agents-member",
    modalLayout: "side-by-side",
    title: "Agents / Member Management",
    subtitle:
      "Reward your direct bookers with exclusive member-only rates designed to drive loyalty and repeat stays. \n\n Keep guests engaged with personalized offers, promotions, and updates while optimizing your pricing strategy to increase direct bookings and long-term customer value. Keep guests engaged with tailored offers, promotional campaigns, and loyalty-driven incentives that strengthen brand affinity. Manage agent, corporate, and member pricing seamlessly while encouraging guests to book directly through your website.",
    modalSubtitle:
      "Build stronger guest relationships and drive repeat business with exclusive member programs and agent-focused pricing strategies. Reward loyalty with personalized offers, member-only rates, and targeted promotions that encourage direct bookings over third-party channels.Create a more personalized guest journey while maximizing long-term customer value. \n\n Keep guests engaged with tailored offers, promotional campaigns, and loyalty-driven incentives that strengthen brand affinity. Manage agent, corporate, and member pricing seamlessly while encouraging guests to book directly through your website.",
    gridSpan: "col-span-1 lg:col-span-12 min-h-[350px]",
    anchor: "bottom-left",
    bulletListClassName: "lg:grid grid-cols-2 gap-x-[18px] gap-y-[2px]",
    modalFeatures: [
      "Exclusive Member Rates",
      "Loyalty & Repeat Guest Benefits",
      "Personalized Promotions & Discounts",
      "Agent & Corporate Pricing Controls",
    ],
    imagePlaceholder: "/images/Mock-Image.png",
    icon: <UnifiedPlatformIcon7 />,
    modalWidth:
      "w-full shadow-[0_-24px_60px_-16px_rgba(1,14,56,0.22),0_-8px_24px_-8px_rgba(1,14,56,0.16)]",
    modalHeight: " lg:h-[590px] xl:h-[440px] 2xl:h-[430px]",
    // mobileModalHeight: "h-[100vh] top-[4vh] mb-40",
    showLearnMore: false,
    lottieUrl: AGENT,
    modalAnimationClassName: "h-full w-full scale-90 origin-top lg:-mb-[60px]",
    textContainerClassName:
      "relative z-10 flex grow flex-col pb-[200px] lg:pb-0 lg:max-w-[45%] xl:max-w-[40%]",
    animationContainerClassName:
      "absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center pointer-events-none transition-transform duration-500 group-hover:scale-105 lg:inset-x-auto lg:-bottom-6 lg:right-12 lg:mx-0 lg:h-[300px] lg:w-[50%] xl:w-[55%] lg:items-end lg:justify-end lg:pr-8",
    lottieClassName: "scale-100 origin-bottom lg:origin-bottom-right",
    lottieRendererSettings: { preserveAspectRatio: "xMidYMax meet" },
  },
]

export function DirectConnectSolutionSection() {
  return (
    <div data-nav-theme="light">
      <BentoGrid
        items={solutions}
        sectionClassName="relative w-full pt-[50px] pb-[120px] lg:pt-[80px] lg:pb-[150px] px-4 md:px-8 bg-white"
        containerClassName="mx-auto w-full max-w-[1440px] lg:px-[80px]"
        gridClassName="relative grid grid-cols-1 gap-6 lg:grid-cols-12"
        cardClassName="px-6 py-8 md:px-6 md:py-6 lg:p-[30px] rounded-[20px] shadow-[0_20px_50px_-12px_rgba(1,14,56,0.15)]"
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
            <div
              className={cn(
                "relative z-10 flex grow flex-col",
                item.textContainerClassName
              )}
            >
              <div className="mb-4 origin-top-left scale-[0.8] lg:mb-6 lg:scale-100">
                {item.icon}
              </div>

              <h3
                className={cn(
                  "font-plus-jakarta-700 mb-2 pr-4 text-[20px] leading-[1.2] lg:mb-[12px] lg:pr-10 lg:text-[24px]",
                  item.isDark ? "text-white" : "text-[#0F172A]"
                )}
              >
                {item.title}
              </h3>

              <p
                className={cn(
                  "font-source-sans-400 pr-2 text-[14px] leading-[1.6] whitespace-pre-line lg:pr-4 lg:leading-[20px]",
                  item.isDark ? "text-white/80" : "text-[#64748B]"
                )}
              >
                {item.subtitle}
              </p>
            </div>

            {item.lottieUrl && (
              <div
                className={
                  item.animationContainerClassName ||
                  "pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center transition-transform duration-500 group-hover:scale-105 md:mx-0 lg:h-[240px]"
                }
              >
                <LazyLottie
                  src={item.lottieUrl}
                  priority="lazy"
                  loop
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
