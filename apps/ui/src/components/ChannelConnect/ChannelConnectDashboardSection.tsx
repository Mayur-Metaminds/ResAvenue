"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/styles"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"

import {
  OmniChannelManagementIcon,
  BulkInventoryControlIcon,
  IntegratedPaymentsIcon,
  ReservationDashboardIcon1,
  ReservationDashboardIcon2,
  ReservationDashboardIcon3,
} from "../../../public/svg/Channel-Connect"

const features = [
  {
    title: "Omni-Channel Management",
    description: "Manage rates, inventory, and bookings across OTAs, GDS, and direct channels in real time.",
    icon: ReservationDashboardIcon1,
  },
  {
    title: "Bulk Inventory & Rate Control",
    description: "Update prices and availability effortlessly across platforms from a single centralized interface.",
    icon: ReservationDashboardIcon2,
  },
  {
    title: "Integrated Payments",
    description: "Process transactions seamlessly and securely with integrated payment gateways and automated invoices.",
    icon: ReservationDashboardIcon3,
  }
]

export function ChannelConnectDashboardSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimerKey((k) => k + 1)
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length)
      setTimerKey((k) => k + 1)
    }, 5000) // Advances every 5 seconds
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
    startTimer() // Reset timer so it doesn't immediately advance
  }

  const images = [
    "/images/Channel-Connect/Hero-img.png",
    "/images/Direct-Connect/Unified-Intelligence-Dashboard.png",
    "/images/Direct-Connect/Booking-Engine.png",
  ] as const
  const activeImage = images[activeIndex] ?? images[0]

  return (
    <section data-nav-theme="light" className="w-full bg-white px-4 md:px-8">
      <div className="container mx-auto max-w-[1200px]">
        <FeatureShowcase
          className="lg:items-stretch"
          imagePosition="left"
          header={{
            eyebrow: "CENTRALIZED OPERATIONS HUB",
            eyebrowClassName: "mb-0",
            className: "mb-[50px]",
            title: (
              <SectionHeader.Highlight>
                Central <br className="hidden lg:block" />
                Reservation Dashboard
              </SectionHeader.Highlight>
            ),
            highlightGradient: "linear-gradient(155deg, #010E38 8.47%, #1A2F6D 35.93%, #ED862E 52.96%)",
            titleClassName: "mb-0",
            description: "Control your entire inventory across all channels from one intuitive interface.",
          }}
          imageSlot={
            <div className="hidden lg:block relative h-full w-full lg:absolute lg:inset-0">
              <Image
                key={activeImage}
                src={activeImage}
                alt="Central Reservation Dashboard"
                width={1918}
                height={1934}
                className="h-auto w-full object-cover lg:absolute lg:inset-0 lg:h-full lg:w-full lg:rounded-[24px]"
              />
            </div>
          }
        >
          <div className="flex flex-col gap-4 mt-4 lg:mt-0">
            {/* Mobile Image */}
            <div className="block lg:hidden mb-2 w-full">
              <Image
                key={activeImage}
                src={activeImage}
                alt="Central Reservation Dashboard"
                width={1918}
                height={1934}
                className="h-auto w-full object-cover rounded-[16px]"
              />
            </div>
            {features.map((feature, index) => {
              const isActive = activeIndex === index
              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={cn(
                    "relative flex w-full cursor-pointer gap-[9px] overflow-hidden rounded-[18px] border bg-white p-[12px] transition-all duration-300",
                    isActive
                      ? "items-start border-[#ED862E]/10 shadow-[0_55px_15px_0_rgba(236,91,19,0),0_35px_14px_0_rgba(236,91,19,0.01),0_20px_12px_0_rgba(236,91,19,0.03),0_9px_9px_0_rgba(236,91,19,0.04),0_2px_5px_0_rgba(236,91,19,0.05)]"
                      : "items-center border-[#E2E8F0] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-[#ED862E]/50 hover:shadow-md"
                  )}
                >
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ED862E]/10">
                      <motion.div
                        key={timerKey}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        className="h-full bg-[#ED862E]"
                      />
                    </div>
                  )}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ED862E]/10 text-[#ED862E]">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className={cn("flex w-full flex-col", isActive && "pt-1")}>
                    <h3 className="font-plus-jakarta-700 text-[16px] text-[#010C28] lg:text-[18px]">
                      {feature.title}
                    </h3>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isActive ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="font-source-sans-400 text-[15px] leading-[24px] text-[#64748B]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </FeatureShowcase>
      </div>
    </section>
  )
}
