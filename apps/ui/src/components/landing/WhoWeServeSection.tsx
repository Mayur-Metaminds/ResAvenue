"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  Umbrella,
  Globe,
  LineChart,
  Home,
  Calendar,
  Building,
} from "lucide-react"
import { useState } from "react"

import { SectionHeader } from "./SectionHeader"
import {
  DnaSvg,
  AddSvg,
  ResAvenueBlackLogo,
  CloseBtn,
  CheckedIcon,
} from "../../../public/svg/commonSvg"

// Segment Data
const segments = [
  {
    id: "independent-hotels",
    title: "Independent Hotels",
    subtitle: "Increase direct bookings & simplify operations",
    points: [
      "Increase direct bookings by up to 40% with a high-converting booking engine",
      "Reduce OTA commissions & drive guest loyalty with promo tools",
      "Manage bookings, rates, and guest data from one unified dashboard",
      "Automate confirmations, payments, and guest communication",
      "Gain real-time insights on occupancy, revenue, and pricing",
    ],
    image: "/images/gradient-image.png",
    position: { top: "10%", left: "50%", transform: "translate(-50%, -50%)" },
    icon: Building2,
  },
  {
    id: "serviced-apartments",
    title: "Serviced Apartments",
    subtitle: "Support long-stay bookings with flexible pricing models",
    points: [
      "Manage inventory across multiple buildings and locations",
      "Automate invoicing and recurring payments",
      "Reduce manual work with self-service guest portals",
      "Track performance by unit, location, or duration",
    ],
    image: "/images/gradient-image.png",
    position: { top: "24%", right: "0%", transform: "translate(0%, -50%)" },
    icon: Home,
  },
  {
    id: "hotel-chains",
    title: "Hotel Chains & Groups",
    subtitle: "Manage all properties from a single, centralized dashboard",
    points: [
      "Standardize pricing, inventory, and distribution across locations",
      "Gain central reporting with advanced drill-down capabilities",
      "Role-based access for teams across locations",
      "Scale effortlessly with API integrations and automation",
    ],
    image: "/images/gradient-image.png",
    position: { top: "48%", right: "-4%", transform: "translate(0%, -50%)" },
    icon: Building,
  },
  {
    id: "revenue-management",
    title: "Revenue Management Companies",
    subtitle:
      "Manage pricing and distribution for multiple hotels from one platform",
    points: [
      "Access real-time performance data across all connected properties",
      "Adjust rates globally based on market demand and competitor data",
      "Monitor competitor pricing and market demand",
      "Deliver detailed revenue and ADR reports",
    ],
    image: "/images/gradient-image.png",
    position: { bottom: "15%", right: "2%", transform: "translate(0%, 50%)" },
    icon: LineChart,
  },
  {
    id: "tour-operators",
    title: "Tour Operators",
    subtitle: "Access real-time hotel inventory and availability",
    points: [
      "Bundle rooms with other packages and experiences",
      "Simple booking management for all guest programs",
      "Secure and safe transactions with advanced confirmations",
      "Expand distribution through connected global channels",
    ],
    image: "/images/gradient-image.png",
    position: { bottom: "6%", left: "50%", transform: "translate(-50%, 50%)" },
    icon: Globe,
  },
  {
    id: "event-organisers",
    title: "Event Organisers",
    subtitle:
      "Sell event tickets/blocks with integrated booking & payment system",
    points: [
      "Dedicated custom blocks for group reservations",
      "Track registrations, attendance, and revenue in real time",
      "Manage multiple events from a single dashboard",
      "Capture attendee data for future marketing campaigns",
    ],
    image: "/images/gradient-image.png",
    position: { bottom: "18%", left: "2%", transform: "translate(0%, 50%)" },
    icon: Calendar,
  },
  {
    id: "resorts-villas",
    title: "Resorts, Villas & Boutique Properties",
    subtitle:
      "Showcase unique experiences, and packages with an easy booking engine",
    points: [
      "Sell add-ons (spa, dining, activities) at the time of room booking",
      "Manage multi-property or standalone villa inventory",
      "Dynamic pricing based on season and demand",
      "Deliver seamless guest journeys from booking to check-out",
    ],
    image: "/images/gradient-image.png",
    position: { top: "35%", left: "-4%", transform: "translate(0%, -50%)" },
    icon: Umbrella,
  },
]

export function WhoWeServeSection() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)

  const activeSegmentData = segments.find((s) => s.id === selectedSegment)

  return (
    <section
      data-nav-theme="light"
      className="relative flex w-full flex-col items-center overflow-hidden py-[69px]"
      style={{
        background:
          "var(--bg, linear-gradient(225deg, rgba(240, 242, 253, 1) 0%, rgba(61, 98, 129, 0.15) 100%))",
      }}
    >
      {/* Header */}
      <SectionHeader
        className="z-10 mb-16 px-4"
        eyebrow="PRODUCTS"
        title={
          <>
            Who We <SectionHeader.Highlight>Serve</SectionHeader.Highlight>
          </>
        }
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
      />

      {/* ────────── Desktop: orbital map (logo + DNA background + absolute-positioned segment nodes) ────────── */}
      <div className="relative hidden h-[700px] w-[800px] max-w-full scale-75 items-center justify-center sm:scale-100 md:flex">
        {/* DNA SVG Background — DnaSvg uses `currentColor` for its fill, so the wrapper's text-color drives the DNA tint. */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-900/40">
          <DnaSvg />
        </div>

        {/* Central Logo with glow */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="absolute h-[200px] w-[200px] rounded-full bg-white opacity-80 blur-2xl" />
          <div className="relative z-10 scale-125">
            <ResAvenueBlackLogo />
          </div>
        </div>

        {/* Orbital nodes */}
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="absolute z-30 flex items-center gap-3 rounded-full border border-gray-100 bg-white px-5 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-transform hover:scale-105"
            style={segment.position}
          >
            <span className="text-sm font-medium text-gray-700">
              {segment.title}
            </span>
            <button
              type="button"
              onClick={() => setSelectedSegment(segment.id)}
              className="touch-manipulation transition-transform hover:scale-110 focus:outline-none"
              aria-label={`View details for ${segment.title}`}
            >
              <AddSvg />
            </button>
          </div>
        ))}
      </div>

      {/* ────────── Mobile: logo + flat vertical list of segment pills (no DNA, no orbital positioning) ────────── */}
      <div className="flex w-full max-w-md flex-col items-center gap-8 px-4 md:hidden">
        {/* Central logo — keep the glow, drop the orbital map scale tricks */}
        <div className="relative flex items-center justify-center py-4">
          <div className="absolute h-32 w-32 rounded-full bg-white opacity-80 blur-2xl" />
          <div className="relative z-10">
            <ResAvenueBlackLogo />
          </div>
        </div>

        {/* Segment pills */}
        <ul className="flex w-full flex-col gap-3">
          {segments.map((segment) => (
            <li key={segment.id}>
              <button
                type="button"
                onClick={() => setSelectedSegment(segment.id)}
                aria-label={`View details for ${segment.title}`}
                className="flex w-full touch-manipulation items-center justify-between gap-3 rounded-full border border-gray-100 bg-white px-5 py-3 text-left shadow-[0_4px_16px_rgb(0,0,0,0.06)] transition-transform active:scale-[0.98]"
              >
                <span className="text-sm font-medium text-gray-700">
                  {segment.title}
                </span>
                <AddSvg />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedSegment && activeSegmentData && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#010C28]/60 backdrop-blur-sm"
              onClick={() => setSelectedSegment(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 z-50 w-full max-w-[680px] -translate-x-1/2 -translate-y-1/2 px-4"
            >
              <div className="relative flex max-h-[90vh] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)]">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSegment(null)}
                  className="absolute top-6 right-6 z-10 text-gray-400 transition-transform hover:scale-105 hover:text-gray-700 focus:outline-none lg:top-8 lg:right-8"
                >
                  <CloseBtn size={48} />
                </button>

                <div className="overflow-y-auto p-3 md:p-10 lg:p-12">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEFAF5]">
                    <activeSegmentData.icon className="h-8 w-8 text-[#ED862E]" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mb-3 text-3xl font-semibold tracking-tight text-[#010C28]">
                    {activeSegmentData.title}
                  </h3>
                  <p className="mb-8 pr-6 text-[17px] font-medium text-[#8BA0B2]">
                    {activeSegmentData.subtitle}
                  </p>

                  {/* Points */}
                  <ul className="mb-10 space-y-4">
                    {activeSegmentData.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <div className="mt-1 shrink-0">
                          <CheckedIcon />
                        </div>
                        <span className="text-[16px] leading-relaxed text-[#475467]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Image */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-gray-100">
                    <img
                      src={activeSegmentData.image}
                      alt={activeSegmentData.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
