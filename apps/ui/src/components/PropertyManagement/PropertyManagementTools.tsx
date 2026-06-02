"use client"

import type React from "react"
import { useRef, useState } from "react"

import { ArrowLeft, ArrowRight } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  ChannelUpdates,
  EliminateOverbookings,
  InventoryControl,
  RestrictionManagement,
} from "../../../public/svg/Property-Management"

type ToolCard = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

// Dummy svg icons + placeholder image areas for now.
const toolCards: ToolCard[] = [
  {
    id: "reservation-revenue",
    icon: <InventoryControl />,
    title: "Reservation & revenue management",
    description: "Manage every booking from a single timeline.",
  },
  {
    id: "guest-checkin",
    icon: <ChannelUpdates />,
    title: "Guest Check-in/Check-out",
    description: "Offer fast, flexible check-in experiences.",
  },
  {
    id: "upsells-addons",
    icon: <RestrictionManagement />,
    title: "Upsells & Add-ons",
    description: "Increase revenue at every touchpoint.",
  },
  {
    id: "analytics-insights",
    icon: <EliminateOverbookings />,
    title: "Analytics & Insights",
    description: "Track performance and act in real time.",
  },
]

const PropertyManagementTools = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Move to the prev/next card and center it in the viewport.
  const goTo = (dir: 1 | -1) => {
    const next = Math.min(Math.max(activeIndex + dir, 0), toolCards.length - 1)
    setActiveIndex(next)
    const container = scrollRef.current
    const card = cardRefs.current[next]
    if (!container || !card) return
    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    })
  }

  return (
    <section
      data-nav-theme="light"
      className="w-full overflow-hidden bg-white px-4 py-[60px] md:px-8 lg:py-[100px]"
    >
      <SectionHeader
        eyebrow="CONVERSION-DRIVEN DESIGN"
        eyebrowColor="#ED862E"
        className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
        descriptionClassName="typo-body1 text-center text-[#64748B]"
        title={
          <SectionHeader.Highlight
            style={{
              background:
                "var(--cta-gradient, linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            More tools. Even bigger impact.
          </SectionHeader.Highlight>
        }
        description="Connect every part of your property operations to save time, boost revenue and delight guests."
      />

      {/* Cards carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-1 pt-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {toolCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="flex h-[365px] w-[310.1561px] shrink-0 flex-col rounded-2xl border border-[#ED862E80] bg-white p-5 sm:h-[472px] sm:w-[410px]"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex shrink-0 items-center justify-center rounded-[12px] bg-[#FEF3E2] p-2.5">
                {card.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-plus-jakarta-700 text-[18px] leading-[24px] text-[#010E38]">
                  {card.title}
                </h3>
                <p className="font-source-sans-400 mt-1 text-[14px] leading-[20px] text-[#64748B]">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Illustration placeholder (real image added later) */}
            <div className="mt-5 w-full flex-1 rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ED862E] text-[#ED862E] transition-colors hover:bg-[#ED862E] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ED862E] text-[#ED862E] transition-colors hover:bg-[#ED862E] hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

export default PropertyManagementTools
