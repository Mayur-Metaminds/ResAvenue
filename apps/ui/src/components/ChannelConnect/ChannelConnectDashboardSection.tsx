"use client"

import Image from "next/image"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  OmniChannelManagementIcon,
  BulkInventoryControlIcon,
  IntegratedPaymentsIcon,
} from "../../../public/svg/Channel-Connect"

export function ChannelConnectDashboardSection() {
  return (
    <section className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Image/Dashboard Preview */}
          <div className="relative order-2 w-full lg:order-1">
            <Image
              src="/images/Channel-Connect/Hero-img.png"
              alt="Central Reservation Dashboard"
              width={1918}
              height={1934}
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Right Column: Content & Features */}
          <div className="order-1 flex w-full flex-col lg:order-2">
            <SectionHeader
              theme="light"
              className="mb-10 lg:mb-12"
              eyebrow="CENTRALIZED OPERATIONS HUB"
              title={
                <>
                  Central Reservation <br className="hidden lg:block" />
                  <SectionHeader.Highlight>Dashboard</SectionHeader.Highlight>
                </>
              }
              description="Control your entire inventory across all channels from one intuitive interface."
            />

            {/* Feature Cards List */}
            <div className="flex flex-col gap-4">
              {/* Feature 1 */}
              <div className="flex items-center gap-4 rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-[#ED862E]/50 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ED862E]/10">
                  <OmniChannelManagementIcon className="h-6 w-6 text-[#ED862E]" />
                </div>
                <h3 className="font-plus-jakarta-700 text-[16px] text-[#010C28] lg:text-[18px]">
                  Omni-Channel Management
                </h3>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4 rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-[#ED862E]/50 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ED862E]/10">
                  <BulkInventoryControlIcon className="h-6 w-6 text-[#ED862E]" />
                </div>
                <h3 className="font-plus-jakarta-700 text-[16px] text-[#010C28] lg:text-[18px]">
                  Bulk Inventory & Rate Control
                </h3>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4 rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all hover:border-[#ED862E]/50 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ED862E]/10">
                  <IntegratedPaymentsIcon className="h-6 w-6 text-[#ED862E]" />
                </div>
                <h3 className="font-plus-jakarta-700 text-[16px] text-[#010C28] lg:text-[18px]">
                  Integrated Payments
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
