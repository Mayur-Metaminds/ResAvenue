import type React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  ChannelUpdates,
  EliminateOverbookings,
  InventoryControl,
  RestrictionManagement,
} from "../../../public/svg/Property-Management"

type ReservationCard = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
}

const reservationCards: ReservationCard[] = [
  {
    id: "channel-updates",
    icon: <ChannelUpdates />,
    title: "Real-time channel updates",
    description:
      "Access real-time insights to optimize strategies and maximize revenue with precision.",
  },
  {
    id: "rate-restriction",
    icon: <RestrictionManagement />,
    title: "Rate & restriction management",
    description:
      "Optimize pricing strategies and manage booking conditions effortlessly for",
  },
  {
    id: "inventory-control",
    icon: <InventoryControl />,
    title: "Centralized inventory control",
    description:
      "Maintain total control of your hotel's inventory to make data-driven decisions.",
  },
  {
    id: "eliminate-overbookings",
    icon: <EliminateOverbookings />,
    title: "Eliminate overbookings",
    description:
      "Seamlessly manage rates and availability across all channels, ensuring",
  },
]

const PropertyManagementReservation = () => {
  return (
    <section
      data-nav-theme="dark"
      className="w-full bg-cover bg-center bg-no-repeat px-4 py-[60px] md:px-8 lg:py-[100px]"
      style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Product image (dummy placeholder — swap with the real asset). Below content on mobile, left on desktop. */}
        <div className="order-last min-w-0 lg:order-none lg:flex-1">
          <div className="aspect-[4/3] w-full rounded-2xl bg-white/5" />
        </div>

        {/* Right: content */}
        <div className="flex min-w-0 flex-col lg:flex-1">
          <SectionHeader
            eyebrow={
              <span className="inline-flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#ED862E]"
                />
                {/* typo-body2 matches the mobile eyebrow exactly; override only the desktop size + tracking. */}
                <span className="typo-body2 text-white lg:text-[12px]! lg:tracking-[0.7px]!">
                  NEVER MISS A BOOKING. NEVER OVERBOOK AGAIN.
                </span>
              </span>
            }
            className="items-start text-left"
            descriptionClassName="typo-body1 text-left text-white/50"
            title="Room & Reservation Management"
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

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reservationCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-[#ED862E80] bg-white/5 p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0">{card.icon}</span>
                  <div className="min-w-0">
                    <h4 className="typo-body1 text-white lg:text-[14px]! lg:font-medium! lg:leading-[16.8px]! lg:tracking-[-0.25px]! lg:[font-family:'Public_Sans',sans-serif]!">
                      {card.title}
                    </h4>
                    <p className="font-source-sans-400 mt-1 text-[14px] leading-[22.4px] text-white/50 lg:text-[12px] lg:font-light! lg:leading-[15.6px] lg:[font-family:'Public_Sans',sans-serif]!">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyManagementReservation
