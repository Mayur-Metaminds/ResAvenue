"use client"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { CountUp } from "@/components/common/CountUp"
import { cn } from "@/lib/styles"
import dynamic from "next/dynamic"
import type * as React from "react"
import channelConnectAnimation from "../../../public/assets/landing/channel-connect.json"
import directConnectAnimation from "../../../public/assets/landing/direct-connect.json"
import globeAnimation from "../../../public/assets/landing/distribution-network.json"
import graphAnimation from "../../../public/assets/landing/graph.json"
import roomReservationAnimation from "../../../public/assets/landing/property-management.json"
import hotelWebsiteAnimation from "../../../public/assets/landing/hotel-website-builder.json"
import propertyManagementModalAnimation from "../../../public/assets/landing/system-management.json"
import distributionNetworkModal from "../../../public/assets/landing/distribution-network_modal.json"

import { SectionHeader } from "./SectionHeader"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type Product = BentoItem & {
  eyebrow: string
  subtitle: string
  imagePlaceholder?: string
  lottieAnimation?: any
  lottieOverlay?: React.ReactNode
  renderBottom?: () => React.ReactNode
}

const products: Product[] = [
  {
    id: "direct-connect",
    eyebrow: "BOOKING ENGINE AND CRS",
    title: "Direct Connect",
    subtitle: "Own Your Guests. Own Your Revenue. \nTurn Every Visitor Into a Direct Booking",
    gridSpan: "col-span-1 md:col-span-7 lg:col-span-7",
    anchor: "top-left",
    modalSubtitle: "Own Your Guests. Own Your Revenue. Turn Every Visitor Into a Direct Booking ResAvenue Direct Connect helps hospitality businesses convert website traffic into commission-free bookings through a seamless, mobile-first booking experience. Designed to reduce booking friction and increase conversions, it empowers properties to drive more revenue from their own website while delivering a superior guest experience.",
    modalFeatures: [
      "Turn Every Click into a Direct Booking.",
      "Maximise Revenue with Smarter Rates and Offers.",
      "Member Loyalty with Exclusive Offers and Rewards.",
      "Secure Payments. Seamless Guest Experiences.",
      "One Dashboard. Every Inquiry. Every Booking.",
    ],
    imagePlaceholder: "/images/placeholder-direct-connect.png",
    lottieAnimation: directConnectAnimation,
    // Direct Connect's Lottie is 1.66:1 but the slot is 2.76:1. Override
    // the default fallback so the animation scales to fill width via
    // `slice` (crops top + bottom of the source equally). Keep this until
    // the animator delivers a 2.75:1 re-export, then this override can go.
    renderBottom: () => (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-8 flex h-[200px] items-end justify-center transition-transform duration-500 group-hover:scale-105 lg:h-[240px]">
        <Lottie
          animationData={directConnectAnimation}
          loop
          className="h-full w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        />
      </div>
    ),
  },
  {
    id: "channel-connect",
    eyebrow: "CHANNEL MANAGER",
    title: "Channel Connect",
    subtitle: "Manage Every Channel From One Place",
    modalSubtitle: "Keep rates, inventory, and availability perfectly synchronized across OTAs and distribution channels with ResAvenue Channel Connect. Automate updates in real time, eliminate manual effort, and maximize your online visibility while maintaining complete control over your distribution strategy.",
    isDark: true,
    gridSpan: "col-span-1 md:col-span-5 lg:col-span-5",
    anchor: "top-right",
    modalFeatures: [
      "Master inventory sharing",
      "Real-time updates",
      "Connect to 100+ OTAs",
      "Avoid double bookings",
    ],
    imagePlaceholder: "/images/placeholder-channel-connect.png",
    lottieAnimation: channelConnectAnimation,
    // Match Direct Connect's gutters (mx-8) instead of falling through to the
    // default renderCard fallback, which uses `md:mx-0` (edge-to-edge at md+).
    renderBottom: () => (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-8 flex h-[200px] items-end justify-center transition-transform duration-500 group-hover:scale-105 lg:h-[240px]">
        <Lottie
          animationData={channelConnectAnimation}
          loop
          className="h-full w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }}
        />
      </div>
    ),
  },
  {
    id: "property-management",
    eyebrow: "OPERATIONS",
    title: "Property Management",
    subtitle:
      "Run Your Hotel Operations Seamlessly. Everything your front desk and operations team need — in one system/Simplify Operations. Elevate Guest Experiences.",
    modalSubtitle: "ResAvenue PMS brings reservations, front desk operations, housekeeping, guest management, and billing into one centralized platform. Streamline daily operations, improve team productivity, and deliver exceptional guest experiences through a system built specifically for modern hospitality businesses.",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-4",
    anchor: "top-left",
    modalFeatures: [
      "Front desk dashboard",
      "Housekeeping management",
      "Guest profiles",
      "Invoicing & billing",
    ],
    imagePlaceholder: "/images/placeholder-pms.png",
    lottieAnimation: roomReservationAnimation,
    modalLottieAnimation: propertyManagementModalAnimation,
    renderBottom: () => (
      <div className="pointer-events-none absolute inset-x-0 bottom-6 top-[120px] z-0 mx-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 md:mx-8 md:bottom-8 lg:top-[190px]">
        <div className="flex h-[198px] w-full items-center justify-center rounded-[20px]  bg-[linear-gradient(78deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0)_100%)]">
          <Lottie
            animationData={roomReservationAnimation}
            loop
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </div>
      </div>
    ),
  },
  {
    id: "revenue-management",
    eyebrow: "INTELLIGENCE",
    title: "Revenue Management",
    subtitle:
      "Maximize Revenue with Intelligent Pricing Let data and AI drive smarter pricing decisions.",
    modalSubtitle: "Make data-driven pricing decisions with powerful revenue management tools designed to maximize occupancy and revenue. Analyze demand patterns, monitor performance, and optimize rates dynamically to stay competitive and capture every revenue opportunity.",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-4",
    anchor: "top-left",
    modalFeatures: [
      "Automated rate updates",
      "Competitor analysis",
      "Demand forecasting",
      "Custom pricing rules",
    ],
    imagePlaceholder: "/images/placeholder-revenue.png",
    lottieAnimation: graphAnimation,
    renderBottom: () => (
      <div className="pointer-events-none absolute inset-x-0 bottom-6 top-[120px] z-0 mx-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 md:mx-8 md:bottom-8 lg:top-[190px]">
        <div className="flex h-[198px] w-full items-center justify-center rounded-[20px] bg-[linear-gradient(78deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0)_100%)]">
          <Lottie
            animationData={graphAnimation}
            loop
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </div>
      </div>
    ),
  },
  {
    id: "distribution-network",
    eyebrow: "DISTRIBUTION",
    title: "Distribution Network",
    subtitle:
      "Be Everywhere Your Guests Are Searching. Expand Your Reach Across the Global Travel Ecosystem",
    modalSubtitle: "Connect your property to leading GDS, IDS, OTA, and metasearch platforms through ResAvenue's powerful distribution network. Increase visibility, access corporate travel demand, and ensure your inventory is available wherever travelers search and book.",
    gridSpan: "col-span-1 md:col-span-12 lg:col-span-4",
    anchor: "top-right",
    modalFeatures: [
      "Global reach",
      "Niche channel access",
      "GDS connectivity",
      "Automated mapping",
    ],
    imagePlaceholder: "/images/placeholder-distribution.png",
    lottieAnimation: globeAnimation,
    modalLottieAnimation: distributionNetworkModal,

    renderBottom: () => (
      <div className="pointer-events-none absolute inset-x-0 bottom-6 top-[120px] z-0 mx-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 md:mx-8 md:bottom-8 lg:top-[190px]">
        <div className="relative flex h-[198px] w-full items-center justify-center rounded-[20px] bg-[linear-gradient(78deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0)_100%)]">
          <Lottie
            animationData={globeAnimation}
            loop
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
          {/* Absolutely-centered count-up overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-plus-jakarta-700 leading-none tracking-tight text-[#0F172A] text-[28px] md:text-[40px]">
              <CountUp target={120} suffix="+" loop />
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "event-management",
    eyebrow: "EVENTS",
    title: "Event Management & Ticketing",
    subtitle:
      "A complete solution for events, conferences, and experiences. Create/Manage & Monetize Every Event.",
    modalSubtitle: "ResAvenue Event Management & Ticketing helps venues and hospitality businesses seamlessly create, market, sell, and manage events of any scale. From online registrations and ticket sales to attendee check-ins and event analytics, everything is managed through one powerful platform designed to maximize attendance and revenue.",
    isDark: true,
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-5",
    anchor: "bottom-left",
    href: "/event-booking",
    modalFeatures: [
      "Ticket sales",
      "Attendee management",
      "Capacity limits",
      "Event reporting",
    ],
    imagePlaceholder: "/images/placeholder-events.png",
  },
  {
    id: "hotel-website",
    eyebrow: "BRAND WEBSITE",
    title: "Hotel Website Builder",
    subtitle:
      "Transform Your Website into Your Best Booking Agent.",
    modalSubtitle: "Create beautiful, high-performing websites that showcase your property and drive direct bookings. With responsive templates, intuitive content management, SEO tools, and seamless booking engine integration, ResAvenue Website Builder helps transform your website into a powerful revenue-generating channel.",
    gridSpan: "col-span-1 md:col-span-6 lg:col-span-7",
    anchor: "bottom-right",
    modalFeatures: [
      "SEO optimized",
      "Mobile responsive",
      "Integrated booking engine",
      "Custom templates",
    ],
    imagePlaceholder: "/images/placeholder-website.png",
    lottieAnimation: hotelWebsiteAnimation,
  },
]

export function BentoProductsSection() {
  return (
    <BentoGrid
      items={products}
      sectionClassName="w-full py-[34px] lg:py-[61px] px-4 md:px-8 rounded-t-[40px]"
      sectionStyle={{
        background:
          "linear-gradient(225deg, rgba(240, 242, 253, 0.33) 0%, rgba(61, 98, 129, 0.00) 100%)",
      }}
      cardClassName="p-6 md:p-8 justify-between h-[460px] md:h-[400px]"
      header={
        <SectionHeader
          className="mb-5 lg:mb-17"
          eyebrow="PRODUCTS"
          title={
            <>
              Everything Your Hotel Needs.
              <br />
              <SectionHeader.Highlight>
                Nothing It Doesn&apos;t.
              </SectionHeader.Highlight>
            </>
          }
          titleClassName="!lg:mb-[24px]"
          description="Seven powerful modules designed to work together as one intelligent system."
        />
      }
      renderCard={(product) => (
        <>
          <div className="relative z-10 mb-6 lg:pr-12">
            <p
              className={cn(
                "font-plus-jakarta-700 mb-[6px] text-[12px] leading-[17.6px] tracking-[1.5px] uppercase",
                product.isDark ? "text-[#FDBA74]" : "text-[#ED862E]"
              )}
            >
              {product.eyebrow}
            </p>
            <h3
              className={cn(
                "font-plus-jakarta-700 mb-[2px] text-[20px] leading-8",
                product.isDark ? "text-white" : "text-[#0F172A]"
              )}
            >
              {product.title}
            </h3>
            <p
              className={cn(
                "font-source-sans-400 max-w-[90%] text-[14px] leading-[23.1px]",
                product.isDark ? "text-gray-300" : "text-[#64748B]"
              )}
            >
              {product.subtitle}
            </p>
          </div>

          {product.renderBottom ? (
            product.renderBottom()
          ) : product.lottieAnimation ? (
            <div className="absolute inset-x-0 bottom-0 z-0 mx-6 flex h-[200px] items-end justify-center transition-transform duration-500 group-hover:scale-105 pointer-events-none md:mx-0 lg:h-[240px]">
              <Lottie
                animationData={product.lottieAnimation}
                loop={true}
                className="h-full w-full"
                rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }}
              />
            </div>
          ) : (
            <div
              className={cn(
                "absolute right-0 bottom-0 left-0 z-0 mx-6 h-[180px] rounded-t-[40px] transition-transform duration-500 group-hover:scale-105 md:mx-8 lg:h-[220px]",
                product.isDark ? "opacity-90" : "opacity-100"
              )}
              style={{
                background: `linear-gradient(225deg, rgba(240, 242, 253, 0.33) 0%, rgba(61, 98, 129, 0.00) 100%), url(${product.imagePlaceholder}) lightgray 0px -5.426px / 100% 119.816% no-repeat`,
              }}
            />
          )}
        </>
      )}
    />
  )
}
