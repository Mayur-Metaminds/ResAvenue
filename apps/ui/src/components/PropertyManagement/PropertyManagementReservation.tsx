"use client"

import type React from "react"

import { motion } from "framer-motion"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  ChannelUpdatesNoBg,
  EliminateOverbookingsNoBg,
  InventoryControlNoBg,
  RestrictionManagementNoBg,
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
    icon: <ChannelUpdatesNoBg />,
    title: "Real-time channel updates",
    description:
      "Access real-time insights to optimize strategies and maximize revenue with precision.",
  },
  {
    id: "rate-restriction",
    icon: <RestrictionManagementNoBg />,
    title: "Rate & restriction management",
    description:
      "Optimize pricing strategies and manage booking conditions effortlessly for",
  },
  {
    id: "inventory-control",
    icon: <InventoryControlNoBg />,
    title: "Centralized inventory control",
    description:
      "Maintain total control of your hotel's inventory to make data-driven decisions.",
  },
  {
    id: "eliminate-overbookings",
    icon: <EliminateOverbookingsNoBg />,
    title: "Eliminate overbookings",
    description:
      "Seamlessly manage rates and availability across all channels, ensuring",
  },
]

const PropertyManagementReservation = () => {
  return (
    <section
      data-nav-theme="dark"
      className="w-full bg-cover bg-center bg-no-repeat px-4 py-[34px] md:px-8 lg:py-[118px]"
      style={{ backgroundImage: "url('/images/Property-Management/gradiantbg.png')" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        {/* Product image. Below content on mobile, left on desktop. */}
        <div className="order-last min-w-0 lg:order-none lg:flex-[0.8]">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img
              src="/images/Mobile-App/mobileAppReservations.png"
              alt="Reservation management illustration"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right: content */}
        <div className="flex min-w-0 flex-col lg:flex-[1.2]">
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
            descriptionClassName="typo-body1 text-left text-white/50 lg:max-w-[555px]"
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
            {reservationCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="rounded-2xl border border-[#ED862E80] bg-white/5 p-5"
              >
                <div className="flex items-start justify-start gap-3">
                  <span className="shrink-0">{card.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-normal leading-[22.4px] text-white [font-family:var(--font-source-sans)] xl:font-medium xl:leading-[19.2px] xl:tracking-[-0.25px] xl:[font-family:var(--font-plus-jakarta)]">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-[14px] font-normal leading-[22.4px] text-white/50 [font-family:var(--font-source-sans)] xl:text-[12px] xl:font-medium xl:leading-[15.6px] xl:text-white/65">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyManagementReservation
