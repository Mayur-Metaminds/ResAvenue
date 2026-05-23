"use client"

import { useState } from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

type AccordionItemData = {
  id: string
  title: string
  description?: string
}

const accordionData: AccordionItemData[] = [
  {
    id: "item-1",
    title: "Easy Mobile Bookings",
    description:
      "Make it simple for guests no matter where they are with a seamless 2-step mobile booking experience.",
  },
  {
    id: "item-2",
    title: "Real-time Sync",
    description:
      "Ensure your inventory is perfectly synced across all channels, avoiding double bookings and maintaining accurate availability.",
  },
  {
    id: "item-3",
    title: "Dynamic Pricing Logic",
    description:
      "Automatically adjust your rates based on demand, seasonality, and competitor analysis to maximize your RevPAR.",
  },
  {
    id: "item-4",
    title: "Simple payment processing",
    description:
      "Offer multiple payment gateways and currencies to provide a frictionless checkout experience for your global guests.",
  },
]

export function DirectConnectDeepDiveSection() {
  const [openItems, setOpenItems] = useState<string[]>(["item-1"])

  return (
    <section className="w-full rounded-[45px] bg-[#010C28] px-4 py-[21px] lg:py-[60px] lg:pr-[80px] lg:pl-[65px]">
      <div className="grid grid-cols-1 items-center gap-[56px] lg:grid-cols-2 lg:items-start lg:gap-[80px]">
        {/* Left Column: Image Graphic */}
        <div className="relative order-2 flex w-full items-center justify-center rounded-[24px] lg:order-1">
          <img
            src="/images/DeepDiveSectionImg.png"
            alt="Fastest Booking Experience Dashboard"
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Right Column: Content & Accordion */}
        <div className="order-1 flex w-full flex-col lg:order-2">
          {/* Header */}
          <SectionHeader
            theme="dark"
            className="mb-[38px] items-start text-left"
            eyebrow={
              <Eyebrow
                className="mb-[24px]"
                showDot
                style={
                  {
                    "--eyebrow-color": "#ED862E",
                    "--eyebrow-dot-color": "#ED862E",
                  } as React.CSSProperties
                }
              >
                DEEP DIVE
              </Eyebrow>
            }
            title={
              <>
                The Fastest Booking <br />
                <SectionHeader.Highlight>
                  Experience on the Market.
                </SectionHeader.Highlight>
              </>
            }
          />

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {accordionData.map((item, index) => {
              const isOpen = openItems.includes(item.id)
              const number = index + 1

              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex cursor-pointer flex-col overflow-hidden rounded-[16px] border transition-all duration-300",
                    isOpen
                      ? "border-white/10 bg-[#061435]"
                      : "border-white/5 bg-transparent hover:border-white/10 hover:bg-white/[0.02]"
                  )}
                  onClick={() =>
                    setOpenItems(
                      isOpen
                        ? openItems.filter((id) => id !== item.id)
                        : [...openItems, item.id]
                    )
                  }
                >
                  <div className="flex items-start gap-[14px] py-[16px] pr-[7px] pl-[16px] select-none lg:pr-[31px]">
                    <div
                      className={cn(
                        "flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg text-[15px] font-bold transition-all duration-300",
                        isOpen
                          ? "bg-[#ED862E] text-white"
                          : "bg-white/5 text-white/50"
                      )}
                    >
                      {number}
                    </div>
                    <div>
                      <h4
                        className={cn(
                          "font-plus-jakarta-700 mb-[10px] text-[18px] transition-colors duration-300 lg:text-[19px]",
                          isOpen ? "text-white" : "text-[#94A3B8]"
                        )}
                      >
                        {item.title}
                      </h4>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300 ease-in-out",
                          isOpen
                            ? "max-h-[200px] pb-5 opacity-100"
                            : "max-h-0 pb-0 opacity-0"
                        )}
                      >
                        <p className="font-source-sans-400 text-[15px] leading-[1.6] text-[#94A3B8] lg:text-[16px]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
