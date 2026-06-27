import type React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

import {
  GuestRelationship,
  HousekeepingManagement,
  ReportandAnalytics,
  RevenueManagement,
} from "../../../public/svg/Property-Management"

type OperationCard = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  bullets: string[]
  highlight?: boolean
}

const operationCards: OperationCard[] = [
  {
    id: "housekeeping",
    icon: <HousekeepingManagement />,
    title: "Housekeeping Management",
    description: "Track room status, assign tasks, and keep your team perfectly in sync.",
    bullets: ["Live room updates", "Task tracking", "Maintenance alerts"],
  },
  {
    id: "guest-relationship",
    icon: <GuestRelationship />,
    title: "Guest Relationship Management",
    description:
      "Deliver personalized experiences with guest data, preferences, and automated communication.",
    bullets: ["Guest profiles", "Email & SMS automation", "Loyalty tracking"],
    highlight: true,
  },
  {
    id: "revenue",
    icon: <RevenueManagement />,
    title: "Revenue Management",
    description:
      "Built-in loyalty and CRM tools to recognize repeat guests and drive long-term value through personalized offers.",
    bullets: [],
  },
  {
    id: "reporting",
    icon: <ReportandAnalytics />,
    title: "Reporting & Analytics",
    description: "Make smarter decisions with real-time dashboards and performance reports.",
    bullets: ["Live performance data", "Custom reports", "Export anytime"],
  },
]

const PropertyManagementOperations = () => {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-[80px] md:px-8 lg:pb-[143px]"
    >
      <SectionHeader
        eyebrow="ONE PLATFORM. ENDLESS POSSIBILITIES."
        eyebrowColor="#ED862E"
        eyebrowClassName="text-nowrap max-sm:[&>span:last-child]:!tracking-[0.7px]"
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
            Operations Suite
          </SectionHeader.Highlight>
        }
        description="A complete set of tools to streamline operations and scale your business effortlessly."
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {operationCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col rounded-[24px] border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-[#ED862E] hover:shadow-[#ED862E] hover:shadow"
          >
            <div className="flex items-center md:items-start gap-3">
              <span className="shrink-0">{card.icon}</span>
              <h3 className="font-plus-jakarta-700 text-[20px] leading-[22.4px] text-[#010E38] [font-feature-settings:'liga'_off,'clig'_off] xl:leading-8">
                {card.title}
              </h3>
            </div>

            <p className="font-source-sans-400 mt-6 text-[16px] leading-[22.4px] text-[#64748B] xl:text-[18px] xl:leading-7">
              {card.description}
            </p>

            {card.bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="font-source-sans-400 text-[16px] leading-[22.4px] text-[#64748B] xl:text-[18px] xl:leading-7"
                  >
                    • {bullet}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PropertyManagementOperations
