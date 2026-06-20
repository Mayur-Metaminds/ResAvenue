"use client"

import type React from "react"

import { motion } from "framer-motion"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  ChannelUpdates,
  EliminateOverbookings,
  InventoryControl,
  RestrictionManagement,
} from "../../../public/svg/Property-Management"

type HousekeepingCard = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

// Dummy icons for now — swap with the real ones later.
const housekeepingCards: HousekeepingCard[] = [
  {
    id: "live-room-status",
    icon: <ChannelUpdates />,
    title: "Live Room Status",
    description: "Know exactly which rooms are ready, dirty, or in progress — instantly.",
  },
  {
    id: "real-time-tracking",
    icon: <InventoryControl />,
    title: "Real-Time Tracking",
    description: "Monitor cleaning progress as it happens and stay in complete control.",
  },
  {
    id: "smart-task-assignment",
    icon: <RestrictionManagement />,
    title: "Smart Task Assignment",
    description: "Assign cleaning tasks to staff with just a click — no confusion, no delays.",
  },
  {
    id: "maintenance-alerts",
    icon: <EliminateOverbookings />,
    title: "Maintenance Alerts",
    description: "Flag issues instantly and ensure they're resolved before guest check-in.",
  },
]

const PropertyManagementHousekeeping = () => {
  return (
    <section
      data-nav-theme="dark"
      className="w-full bg-cover bg-center bg-no-repeat px-4 py-[60px] md:px-8 lg:py-[108px]"
      style={{ backgroundImage: "url('/images/Property-Management/gradiantbg.png')" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Product image (dummy placeholder — not given yet). Below content on mobile, left on desktop. */}
        <div className="min-w-0 lg:flex-2">
          <div className="aspect-[4/3] w-full rounded-2xl bg-white/5" />
        </div>

        {/* Right: content */}
        <div className="flex min-w-0 flex-col lg:flex-[3]">
          <SectionHeader
            eyebrow={
              <span className="inline-flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#ED862E]"
                />
                {/* typo-body2 matches the mobile eyebrow exactly; override only the desktop size + tracking. */}
                <span className="typo-body2 text-white lg:text-[12px]! lg:tracking-[0.7px]!">
                  TURN ROOMS FASTER
                </span>
              </span>
            }
            className="items-start text-left"
            descriptionClassName="typo-body1 text-left text-white/50"
            title="House Keeping Management"
            titleHighlight="Management"
            titleColor="#FFFFFF"
            highlightGradient="linear-gradient(90deg, #ED862E 0%, #ED862E 100%)"
            description={
              <>
                Stay in control of your inventory across all channels.
                <br />
                Update availability, rates, and bookings in real time—without manual
                effort.
              </>
            }
          />

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {housekeepingCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="rounded-2xl border border-[#ED862E80] bg-white/5 p-5"
              >
                <div className="h-12 w-12">{card.icon}</div>

                <h4 className="mt-4 typo-body1 text-white lg:text-[14px]! lg:font-medium! lg:leading-[16.8px]! lg:tracking-[-0.25px]! lg:[font-family:'Public_Sans',sans-serif]!">
                  {card.title}
                </h4>
                <p className="mt-2 font-source-sans-400 text-[14px] leading-[22.4px] text-white/50 lg:text-[12px] lg:font-light! lg:leading-[15.6px] lg:[font-family:'Public_Sans',sans-serif]!">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyManagementHousekeeping
