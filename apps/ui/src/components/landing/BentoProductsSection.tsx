"use client"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { cn } from "@/lib/styles"

import { SectionHeader } from "./SectionHeader"

type Product = BentoItem & {
  eyebrow: string
  subtitle: string
}

const products: Product[] = [
  {
    id: "direct-connect",
    eyebrow: "BOOKING ENGINE AND CRS",
    title: "Direct Connect",
    subtitle: "Own Your Guests, Own Your Revenue.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-7 lg:col-span-7",
    anchor: "top-left",
    modalFeatures: [
      "Turn Every Click into a Direct Booking.",
      "Maximise Revenue with Smarter Rates and Offers.",
      "Member Loyalty with Exclusive Offers and Rewards.",
      "Secure Payments. Seamless Guest Experiences.",
      "One Dashboard. Every Inquiry. Every Booking.",
    ],
    imagePlaceholder: "/images/placeholder-direct-connect.png",
  },
  {
    id: "channel-connect",
    eyebrow: "CHANNEL MANAGER",
    title: "Channel Connect",
    subtitle: "Manage all your distribution channels from one place.",
    theme: "dark",
    gridSpan: "col-span-1 md:col-span-5 lg:col-span-5",
    anchor: "top-right",
    modalFeatures: [
      "Master inventory sharing",
      "Real-time updates",
      "Connect to 100+ OTAs",
      "Avoid double bookings",
    ],
    imagePlaceholder: "/images/placeholder-channel-connect.png",
  },
  {
    id: "property-management",
    eyebrow: "OPERATIONS",
    title: "Property Management",
    subtitle:
      "Your hotel's central nervous system. Everything your front desk and operations team needs.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-4 lg:col-span-4",
    anchor: "top-left",
    modalFeatures: [
      "Front desk dashboard",
      "Housekeeping management",
      "Guest profiles",
      "Invoicing & billing",
    ],
    imagePlaceholder: "/images/placeholder-pms.png",
  },
  {
    id: "revenue-management",
    eyebrow: "INTELLIGENCE",
    title: "Revenue Management",
    subtitle:
      "Maximize revenue with intelligent pricing. Let data and AI drive smarter pricing decisions.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-4 lg:col-span-4",
    anchor: "top-left",
    modalFeatures: [
      "Automated rate updates",
      "Competitor analysis",
      "Demand forecasting",
      "Custom pricing rules",
    ],
    imagePlaceholder: "/images/placeholder-revenue.png",
  },
  {
    id: "distribution-network",
    eyebrow: "DISTRIBUTION",
    title: "Distribution Network",
    subtitle:
      "Be everywhere your guests are searching. Expand your reach across global booking platforms.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-4 lg:col-span-4",
    anchor: "top-right",
    modalFeatures: [
      "Global reach",
      "Niche channel access",
      "GDS connectivity",
      "Automated mapping",
    ],
    imagePlaceholder: "/images/placeholder-distribution.png",
  },
  {
    id: "event-management",
    eyebrow: "EVENTS",
    title: "Event Management & Ticketing",
    subtitle:
      "Sell, manage, and track events effortlessly. A complete solution for events and conferences.",
    theme: "dark",
    gridSpan: "col-span-1 md:col-span-5 lg:col-span-5",
    anchor: "bottom-left",
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
      "Transform your website into your best booking agent. Beautiful, fast, and built to drive bookings.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-7 lg:col-span-7",
    anchor: "bottom-right",
    modalFeatures: [
      "SEO optimized",
      "Mobile responsive",
      "Integrated booking engine",
      "Custom templates",
    ],
    imagePlaceholder: "/images/placeholder-website.png",
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
      cardClassName="p-8 justify-between h-[400px]"
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
          description="Seven powerful modules designed to work together as one intelligent system."
        />
      }
      renderCard={(product, { theme }) => (
        <>
          <div className="relative z-10 mb-6">
            <p
              className={cn(
                "font-plus-jakarta-700 mb-3 text-[11px] leading-[17.6px] tracking-[1.5px] uppercase",
                theme === "dark" ? "text-[#FDBA74]" : "text-[#ED862E]"
              )}
            >
              {product.eyebrow}
            </p>
            <h3
              className={cn(
                "font-plus-jakarta-700 mb-3 text-[20px] leading-8",
                theme === "dark" ? "text-white" : "text-[#0F172A]"
              )}
            >
              {product.title}
            </h3>
            <p
              className={cn(
                "font-source-sans-400 max-w-[90%] text-[14px] leading-[23.1px]",
                theme === "dark" ? "text-gray-300" : "text-[#64748B]"
              )}
            >
              {product.subtitle}
            </p>
          </div>

          <div
            className={cn(
              "absolute right-0 bottom-0 left-0 z-0 mx-8 h-[220px] rounded-t-[40px] transition-transform duration-500 group-hover:scale-105",
              theme === "dark" ? "opacity-90" : "opacity-100"
            )}
            style={{
              background: `linear-gradient(225deg, rgba(240, 242, 253, 0.33) 0%, rgba(61, 98, 129, 0.00) 100%), url(${product.imagePlaceholder}) lightgray 0px -5.426px / 100% 119.816% no-repeat`,
            }}
          />
        </>
      )}
    />
  )
}
