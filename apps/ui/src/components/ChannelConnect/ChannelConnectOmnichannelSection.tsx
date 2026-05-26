"use client"

import type * as React from "react"

import { BentoGrid, type BentoItem } from "@/components/common/BentoGrid"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

import { MetaChannelsIcon } from "../../../public/svg/Channel-Connect"

export type OmnichannelCard = BentoItem & {
  description: string
  renderGraphic: () => React.ReactNode
}

const omnichannelCards: OmnichannelCard[] = [
  {
    id: "global-otas",
    title: "100+ Global OTAs",
    description:
      "Direct, reliable connections with all major global OTAs (Booking, Expedia, Agoda) ensuring your inventory is accurately reflected in real-time.",
    theme: "dark",
    gridSpan: "col-span-1 md:col-span-4",
    renderGraphic: () => (
      <div className="absolute bottom-6 left-6 flex items-center gap-2">
        {["B.", "E.", "A."].map((label) => (
          <div
            key={label}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white shadow-md"
          >
            <span className="font-plus-jakarta-700 text-sm font-bold">
              {label}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "direct-apis",
    title: "Direct APIs",
    description:
      "Connect directly to key booking engines and reservation systems without intermediaries ensuring high-performance direct integration.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-4",
    renderGraphic: () => (
      <div className="absolute top-4 right-0 left-0 flex h-[140px] items-center justify-center">
        <div className="relative flex h-full w-full max-w-[200px] items-center justify-center">
          <div className="absolute top-1/2 left-1/2 z-10 flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-lg">
            <span className="font-plus-jakarta-700 text-xs font-bold text-[#ED862E]">
              API
            </span>
          </div>

          <div className="absolute top-[10%] right-[10%] z-20 flex h-8 w-12 items-center justify-center rounded-md bg-[#ED862E] text-white shadow-md">
            <span className="font-plus-jakarta-700 text-[10px] font-bold">
              144.25
            </span>
          </div>
          <div className="absolute bottom-[20%] left-[10%] z-20 flex h-6 w-8 items-center justify-center rounded-md bg-[#ED862E] text-white shadow-md">
            <span className="font-plus-jakarta-700 text-[10px] font-bold">
              33
            </span>
          </div>
          <div className="absolute right-[20%] bottom-[10%] z-20 flex h-8 w-10 items-center justify-center rounded-md bg-[#ED862E] text-white shadow-md">
            <span className="font-plus-jakarta-700 text-[10px] font-bold">
              41.57
            </span>
          </div>

          <svg
            className="absolute inset-0 h-full w-full"
            style={{ zIndex: 0 }}
            aria-hidden
          >
            <line
              x1="50%"
              y1="50%"
              x2="85%"
              y2="20%"
              stroke="#ED862E"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="20%"
              y2="75%"
              stroke="#ED862E"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="75%"
              y2="85%"
              stroke="#ED862E"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: "meta-channels",
    title: "Meta-Channels",
    description:
      "Boost visibility and drive direct bookings with integrations to Google Hotel Ads, TripAdvisor, Kayak, and Trivago.",
    theme: "light",
    gridSpan: "col-span-1 md:col-span-4",
    renderGraphic: () => (
      <div className="absolute top-10 left-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ED862E]/10">
        <MetaChannelsIcon className="h-8 w-8 text-[#ED862E]" />
      </div>
    ),
  },
]

export function ChannelConnectOmnichannelSection() {
  return (
    <BentoGrid<OmnichannelCard>
      items={omnichannelCards}
      sectionClassName="w-full py-[60px] lg:py-[100px] px-4 md:px-8 bg-white"
      containerClassName="container mx-auto max-w-[1200px]"
      cardClassName="p-8 lg:p-10 min-h-[320px] justify-end"
      header={
        <SectionHeader
          theme="light"
          className="mx-auto mb-[40px] max-w-3xl text-center lg:mb-[60px]"
          eyebrow="API-first infrastructure"
          title={
            <>
              Omnichannel Connectivity <br />
              <SectionHeader.Highlight>Ecosystem</SectionHeader.Highlight>
            </>
          }
          description="Power seamless connectivity between PMS, CRSs, and GDS with high performance direct integrations."
        />
      }
      renderCard={(item, { theme }) => (
        <>
          {item.renderGraphic()}
          <div className="relative z-10 mt-auto">
            <h3
              className={cn(
                "font-plus-jakarta-700 mb-3 text-[20px] leading-[1.3]",
                theme === "dark" ? "text-white" : "text-[#0F172A]"
              )}
            >
              {item.title}
            </h3>
            <p
              className={cn(
                "font-source-sans-400 text-[14px] leading-[22px]",
                theme === "dark" ? "text-white/70" : "text-[#64748B]"
              )}
            >
              {item.description}
            </p>
          </div>
        </>
      )}
    />
  )
}
