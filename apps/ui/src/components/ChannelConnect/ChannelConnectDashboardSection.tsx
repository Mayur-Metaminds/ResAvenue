"use client"

import Image from "next/image"

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

export function ChannelConnectDashboardSection() {
  return (
    <section className="w-full bg-white px-4  md:px-8">
      <div className="container mx-auto max-w-[1200px]">
        <FeatureShowcase
          imagePosition="left"
          header={{
            eyebrow: "CENTRALIZED OPERATIONS HUB",
            title: (
              <>
                Central Reservation <br className="hidden lg:block" />
                <SectionHeader.Highlight>Dashboard</SectionHeader.Highlight>
              </>
            ),
            description: "Control your entire inventory across all channels from one intuitive interface.",
          }}
          imageSlot={
            <Image
              src="/images/Channel-Connect/Hero-img.png"
              alt="Central Reservation Dashboard"
              width={1918}
              height={1934}
              className="h-auto w-full object-cover"
            />
          }
        >
          {/* Feature 1 */}
          <FeatureShowcase.Card
            variant="compact"
            icon={<ReservationDashboardIcon1 className="h-6 w-6 text-[#ED862E]" />}
            title="Omni-Channel Management"
          />

          {/* Feature 2 */}
          <FeatureShowcase.Card
            variant="compact"
            icon={<ReservationDashboardIcon2 className="h-6 w-6 text-[#ED862E]" />}
            title="Bulk Inventory & Rate Control"
          />

          {/* Feature 3 */}
          <FeatureShowcase.Card
            variant="compact"
            icon={<ReservationDashboardIcon3 className="h-6 w-6 text-[#ED862E]" />}
            title="Integrated Payments"
          />
        </FeatureShowcase>
      </div>
    </section>
  )
}
