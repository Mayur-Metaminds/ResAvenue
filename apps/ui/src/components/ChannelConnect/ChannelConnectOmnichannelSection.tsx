"use client"

import * as React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

import {
  OmnichannelCardIcon1,
  OmnichannelCardIcon2,
  OmnichannelCardIcon3,
  OmnichannelCardIcon4,
  OpenCardDownIcon,
} from "../../../public/svg/Channel-Connect"

export type OmnichannelCard = BentoItem & {
  description: string
  icon?: React.ReactNode
  renderGraphic?: () => React.ReactNode
}

const CARDS_DATA = [
  {
    id: "global-otas",
    title: "100+ Global OTAs",
    description:
      "Direct, reliable connections with all major global OTAs (Booking, Expedia, Agoda) ensuring your inventory is accurately reflected in real-time.",
    Icon: OmnichannelCardIcon1,
    renderGraphic: () => (
      <div className="relative mt-[15px] md:absolute md:mt-0 md:bottom-8 md:left-8 xl:bottom-10 xl:left-10 flex items-center -space-x-3 z-20 transition-opacity duration-300">
        {["EX", "BK", "AG"].map((label) => (
          <div
            key={label}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#1E293B] bg-white text-[#010C28] shadow-sm"
          >
            <span className="font-plus-jakarta-700 text-[13px] font-bold">
              {label}
            </span>
          </div>
        ))}
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white/20 bg-[#010C28] text-white shadow-sm">
          <span className="font-plus-jakarta-700 text-[12px] font-bold tracking-tight">
            +1.9k
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "direct-apis",
    title: "Direct APIs",
    description:
      "Connect directly to key booking engines and reservation systems without intermediaries ensuring high-performance direct integration.",
    Icon: OmnichannelCardIcon2,
    renderGraphic: () => (
      <div className="relative mt-[15px] md:absolute md:mt-0 md:bottom-8 md:left-8 xl:bottom-10 xl:left-10 flex items-center -space-x-3 z-20 transition-opacity duration-300">
        {["EX", "BK", "AG"].map((label) => (
          <div
            key={label}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#1E293B] bg-white text-[#010C28] shadow-sm"
          >
            <span className="font-plus-jakarta-700 text-[13px] font-bold">
              {label}
            </span>
          </div>
        ))}
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white/20 bg-[#010C28] text-white shadow-sm">
          <span className="font-plus-jakarta-700 text-[12px] font-bold tracking-tight">
            +1.9k
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "gds-access",
    title: "GDS Access",
    description:
      "Expand reach to corporate travellers via leading GDS platforms like Amadeus, Sabre, and Travelport.",
    Icon: OmnichannelCardIcon3,
    renderGraphic: () => (
      <div className="relative mt-[15px] md:absolute md:mt-0 md:bottom-8 md:left-8 xl:bottom-10 xl:left-10 flex items-center -space-x-3 z-20 transition-opacity duration-300">
        {["EX", "BK", "AG"].map((label) => (
          <div
            key={label}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#1E293B] bg-white text-[#010C28] shadow-sm"
          >
            <span className="font-plus-jakarta-700 text-[13px] font-bold">
              {label}
            </span>
          </div>
        ))}
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white/20 bg-[#010C28] text-white shadow-sm">
          <span className="font-plus-jakarta-700 text-[12px] font-bold tracking-tight">
            +1.9k
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "meta-channels",
    title: "Meta-Channels",
    description:
      "Boost visibility and drive direct traffic with integrations to meta-search platforms like Google Hotel Finder.",
    Icon: OmnichannelCardIcon4,
    renderGraphic: () => (
      <div className="relative mt-[15px] md:absolute md:mt-0 md:bottom-8 md:left-8 xl:bottom-10 xl:left-10 flex items-center -space-x-3 z-20 transition-opacity duration-300">
        {["EX", "BK", "AG"].map((label) => (
          <div
            key={label}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#1E293B] bg-white text-[#010C28] shadow-sm"
          >
            <span className="font-plus-jakarta-700 text-[13px] font-bold">
              {label}
            </span>
          </div>
        ))}
        <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white/20 bg-[#010C28] text-white shadow-sm">
          <span className="font-plus-jakarta-700 text-[12px] font-bold tracking-tight">
            +1.9k
          </span>
        </div>
      </div>
    ),
  },
]

export function ChannelConnectOmnichannelSection() {
  const [activeId, setActiveId] = useState("global-otas")

  const omnichannelCards: OmnichannelCard[] = CARDS_DATA.map((card) => {
    const isActive = card.id === activeId
    return {
      id: card.id,
      title: card.title,
      description: card.description,
      isDark: isActive,
      gridSpan: isActive
        ? "col-span-1 md:col-span-6 xl:col-span-2 md:min-h-[380px] px-[20px] py-[15px] md:p-8 xl:p-10"
        : "col-span-1 md:col-span-6 xl:col-span-1 md:min-h-[380px] min-h-auto px-[20px] gap-[9px] py-[15px] md:p-8 xl:p-10",
      icon: isActive ? (
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#010C28]/40 ring-1 ring-white/10 backdrop-blur-md transition-colors duration-300 [&_svg_path]:fill-white">
          <card.Icon />
        </div>
      ) : (
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#ED862E]/10 transition-colors duration-300">
          <card.Icon />
        </div>
      ),
      renderGraphic: card.renderGraphic,
    }
  })

  return (
    <div data-nav-theme="light">
      <BentoGrid<OmnichannelCard>
        items={omnichannelCards}
        sectionClassName="w-full py-[32px] lg:py-[90px] px-[12px] lg:px-[80px] bg-white"
        containerClassName="mx-auto w-full max-w-[1440px] [&>.grid]:xl:!grid-cols-5"
        cardClassName="p-6 md:p-8 xl:p-10 min-h-[320px] md:min-h-[380px] justify-start"
        header={
          <SectionHeader
            className="mx-auto max-w-3xl text-center md:py-0 py-[24px] mb-[45px] lg:mb-[28px]"
            eyebrow="API-first infrastructure"
            eyebrowClassName="mb-[24px] lg:mb-[12px]"
            highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 41.93%, #ED862E 60.24%)"
            titleClassName="font-medium mb-[16px] lg:mb-[24px] leading-[-1.5px]"
            title={
              <SectionHeader.Highlight className="text-center">
                Omnichannel
                <br className="md:hidden" />
                Connectivity
                <br className="hidden md:block" />
                <span className="md:hidden"> </span>
                Ecosystem
              </SectionHeader.Highlight>
            }
            description="Maximize visibility across all channels with real-time API connectivity, ensuring your inventory is always available to book."
          />
        }
        renderCard={(item) => {
          const isActive = item.id === activeId
          return (
            <>
              <div
                className={cn(
                  "absolute inset-0 z-50",
                  isActive ? "pointer-events-none" : "cursor-pointer"
                )}
                onClick={() => !isActive && setActiveId(item.id)}
              />
              <div
                className={cn(
                  "relative z-20 flex w-full transition-all duration-300",
                  isActive
                    ? "mb-[15px] gap-[40px] md:mb-[32px] xl:mb-[40px] items-start"
                    : "mb-[7px] md:mb-[32px] gap-[18px] xl:mb-[40px] items-center"
                )}
              >
                {item?.icon && <div className="shrink-0">{item.icon}</div>}
                {!isActive && (
                  <h3 className="font-plus-jakarta-700 flex-1 text-[20px] leading-[1.2] tracking-tight text-[#0F172A] md:hidden">
                    {item?.title}
                  </h3>
                )}

                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.3 }}
                      className="md:hidden"
                    >
                      <OpenCardDownIcon />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative z-10 transition-colors duration-300">
                <h3
                  className={cn(
                    "font-plus-jakarta-700 mb-[9px] text-[20px] leading-[1.2] tracking-tight transition-colors duration-300",
                    item.isDark ? "text-white" : "text-[#0F172A]",
                    !isActive ? "hidden md:block" : ""
                  )}
                >
                  {item?.title}
                </h3>
                <p
                  className={cn(
                    "font-source-sans-400 text-[16px] leading-[24px] transition-colors duration-300",
                    item.isDark ? "text-white/80" : "text-[#64748B]"
                  )}
                >
                  {item?.description}
                </p>
              </div>

              <AnimatePresence>
                {isActive && item?.renderGraphic && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.renderGraphic()}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )
        }}
      />
    </div>
  )
}
