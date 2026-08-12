"use client"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { CountUp } from "@/components/common/CountUp"
import { LazyLottie } from "@/components/common/LazyLottie"
import { cn } from "@/lib/styles"
import {
  CHANNEL_CONNECT_INNER_URL,
  CHANNEL_CONNECT_OUTER_URL,
  DIRECT_CONNECT_INNER_URL,
  DIRECT_CONNECT_OUTER_URL,
  DISTRIBUTION_NETWORK_INNER_URL,
  DISTRIBUTION_NETWORK_URL,
  EVENT_INNER_URL,
  EVENT_OUTER_URL,
  GRAPH_URL,
  HOTEL_WEBSITE_INNER_URL,
  HOTEL_WEBSITE_OUTER_URL,
  PROPERTY_MANAGEMENT_INNER_URL,
  PROPERTY_MANAGEMENT_OUTER_URL,
  REVENUE_MANAGEMENT_INNER,
} from "@/lib/lottie-urls"
import type * as React from "react"

import { SectionHeader } from "./SectionHeader"

type Product = BentoItem & {
  eyebrow: string
  subtitle: string
  imagePlaceholder?: string
  /** Public URL of the card's below-the-fold (lazy) animation. */
  lottieUrl?: string
  lottieOverlay?: React.ReactNode
  renderBottom?: () => React.ReactNode
}

// We removed the fixed MODAL_HEIGHT constraint so the modals can stretch dynamically
// across rows based on their `expandToId` property.

const products: Product[] = [
  {
    id: "direct-connect",
    eyebrow: "BOOKING ENGINE AND CRS",
    title: "Direct Connect",
    subtitle: "Own Your Guests. Own Your Revenue. \nTurn Every Visitor Into a Direct Booking",
    gridSpan: "col-span-1 md:col-span-7 lg:col-span-7",
    modalAnimationClassName: "scale-[1.2] rounded-[1px]",
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
    lottieUrl: DIRECT_CONNECT_OUTER_URL,
    modalLottieUrl: DIRECT_CONNECT_INNER_URL,
    expandToId: "property-management",
    renderBottom: () => (
      <div className="pointer-events-none relative mt-4 z-0 w-full aspect-[796/284] overflow-hidden transition-transform duration-500 group-hover:scale-105">
        <LazyLottie
          src={DIRECT_CONNECT_OUTER_URL}
          priority="lazy"
          loop
          className="h-full w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
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
      "Master Your Distribution. Multiply Your Reach.",
      "One View.Total Control",
      "Smarter Inventory.Higher Revenue.",
      "Sync instantly Across Every Channel. Eliminate Errors.",
      "Seamless OTA and PMS Connects for Smarter Operations",
      "More visibility. Zero manual work."

    ],
    imagePlaceholder: "/images/placeholder-channel-connect.png",
    lottieUrl: CHANNEL_CONNECT_OUTER_URL,
    modalLottieUrl: CHANNEL_CONNECT_INNER_URL,
    modalAnimationClassName: "h-full w-full lg:-mt-9",
    expandToId: "distribution-network",
    renderBottom: () => (
      <div className="pointer-events-none relative mt-4 z-0 mx-8 flex h-[160px] md:h-[200px] lg:h-[300px] items-end justify-center transition-transform duration-500 group-hover:scale-105">
        <LazyLottie
          src={CHANNEL_CONNECT_OUTER_URL}
          priority="lazy"
          loop
          className="h-full w-full scale-110"
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
      "Streamline Every Guest Touchpoint",
      "Manage Every Booking, Automate Payments, Effortlessly",
      "Contactless Convenience for faster Check ins",
      "Smarter Operations. Better Performance",
      "Automate communications for Stronger Guest Relationships",
    ],
    imagePlaceholder: "/images/placeholder-pms.png",
    lottieUrl: PROPERTY_MANAGEMENT_OUTER_URL,
    modalLottieUrl: PROPERTY_MANAGEMENT_INNER_URL,
    expandToId: "event-management",
    renderBottom: () => (
      <div className="pointer-events-none relative z-0  flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <div className="flex h-[198px] w-full items-center justify-center rounded-[20px]  bg-[linear-gradient(78deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0)_100%)]">
          <LazyLottie
            src={PROPERTY_MANAGEMENT_OUTER_URL}
            priority="lazy"
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
      "Track Market Insights Before You Act",
      "AI-Driven Rates That Adjust to Demand",
      "Manage Revenue, Occupancy, and Trends",
      "Project Revenue Potential With Confidence",
      "AI-Powered Dynamic Discounts to Boost Booking",
      "Price smarter. Earn more."
    ],
    imagePlaceholder: "/images/placeholder-revenue.png",
    lottieUrl: GRAPH_URL,
    modalLottieUrl: REVENUE_MANAGEMENT_INNER,
    expandToId: "event-management",
    renderBottom: () => (
      <div className="pointer-events-none relative mt-4 w-full z-0 flex items-start justify-start transition-transform duration-500 px-4 group-hover:scale-105">
        <div className="flex h-[200px] lg:h-[240px] w-full items-start justify-start rounded-[20px] bg-[linear-gradient(78deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0)_100%)]">
          <LazyLottie
            src={GRAPH_URL}
            priority="lazy"
            loop
            className="h-full w-full md:scale-125"
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
      "Stop Missing Guests. Start Showing Up Everywhere.",
      "Own Every Search. Win Every Booking.",
      "Don’t Just List. Dominate Distribution.",
      "Turn Visibility into Revenue.",
      "Be Seen First. Booked First.",
      "More reach. More bookings.",
    ],
    imagePlaceholder: "/images/placeholder-distribution.png",
    lottieUrl: DISTRIBUTION_NETWORK_URL,
    modalLottieUrl: DISTRIBUTION_NETWORK_INNER_URL,
    modalAnimationClassName: "h-full w-full lg:scale-110",
    expandToId: "hotel-website",

    renderBottom: () => (
      <div className="pointer-events-none relative z-0  flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ">
        <div className="relative flex h-[198px] w-full items-center justify-center rounded-[20px] bg-[linear-gradient(78deg,rgba(255,255,255,0.40)_0%,rgba(255,255,255,0)_100%)]">
          <LazyLottie
            src={DISTRIBUTION_NETWORK_URL}
            priority="lazy"
            loop
            className="h-full w-full scale-105"
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
    lottieUrl: EVENT_OUTER_URL,
    modalLottieUrl: EVENT_INNER_URL,
    expandToId: "property-management",
    modalFeatures: [
      "Stop Managing Events. Start Monetizing Them.",
      "Sell faster with Instant form generation",
      "QR Code-Based Digital Ticketing & Contactless Check-In",
      "From Tickets to Insights — Everything in One Place.",
      "Run Events That Actually Pay Off.",
      "Configure ticket sales in multiple ways - time slots, category, option selections",
    ],
    imagePlaceholder: "/images/placeholder-events.png",
    // The event animation is very wide (1238×224, ~5.5:1), so in the bottom
    // slot it shrinks to a short strip and hugs the bottom (xMidYMax) with a
    // big gap above. Center it vertically so it sits higher in the card.
    renderBottom: () => (
      <div className="pointer-events-none relative mt-4 z-0 mx-6 flex h-[200px] items-center justify-center transition-transform duration-500 group-hover:scale-105 md:mx-8 lg:mx-10 lg:h-[240px]">
        <LazyLottie
          src={EVENT_OUTER_URL}
          priority="lazy"
          loop
          className="h-full w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        />
      </div>
    ),
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
      "High-conversion, mobile-first brand websites ",
      "Easy-to-use CMS to update content and images",
      "Engineered for Speed, SEO, and Revenue Growth",
      "Designed to Convert. Built to Book.",
      "Choose from customisable template or opt for full custom design.",
    ],
    imagePlaceholder: "/images/placeholder-website.png",
    lottieUrl: HOTEL_WEBSITE_OUTER_URL,
    modalLottieUrl: HOTEL_WEBSITE_INNER_URL,
    expandToId: "distribution-network",
    renderBottom: () => (
      <>
        {/* Mobile + md: full content width, no extra inset/scale — the shared
            default fallback used px-4 + scale-125 which clipped this animation
            inside the card's overflow-hidden shell on narrow viewports. */}
        <div className="pointer-events-none relative z-0 mt-4 flex h-[220px] w-full items-center justify-center md:h-[240px] lg:hidden">
          <LazyLottie
            src={HOTEL_WEBSITE_OUTER_URL}
            priority="lazy"
            loop
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </div>
        {/* lg+: preserve the original default fallback styling exactly. */}
        <div className="relative mt-8 hidden h-[200px] items-center justify-center px-4 z-0 pointer-events-none lg:flex">
          <LazyLottie
            src={HOTEL_WEBSITE_OUTER_URL}
            priority="lazy"
            loop
            className="h-full w-full scale-125"
            rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }}
          />
        </div>
      </>
    ),
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
      cardClassName="pt-6 md:pt-5 xl:pt-8 px-6 md:px-5 xl:px-8"
      gridClassName="relative grid grid-cols-1 gap-6 md:grid-cols-12"
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
          <div className="relative z-10">
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
                "font-plus-jakarta-700 mb-[2px] max-sm:pr-12 text-[20px] leading-8 lg:pr-15",
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
          ) : product.lottieUrl ? (
            <div className="relative mt-8 px-4 z-0 flex h-[200px] items-center justify-center pointer-events-none">
              <LazyLottie
                src={product.lottieUrl}
                priority="lazy"
                loop
                className="h-full w-full scale-125"
                rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }}
              />
            </div>
          ) : (
            <div
              className={cn(
                "relative mt-auto z-0 mx-6 h-[180px] rounded-t-[40px] transition-transform duration-500 group-hover:scale-105 md:mx-8 lg:h-[220px]",
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
