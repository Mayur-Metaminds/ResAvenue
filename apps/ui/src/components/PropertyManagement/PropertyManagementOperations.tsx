import type React from "react"

import { BarChart3, BrushCleaning, Coins, Users } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

// Icon badge — same style as ContactUsBody's CardIcon.
function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-[14px] bg-[#FEF3E2] text-[#ED862E]">
      {children}
    </div>
  )
}

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
    icon: <BrushCleaning className="h-5 w-5" />,
    title: "Housekeeping Management",
    description: "Track room status, assign tasks, and keep your team perfectly in sync.",
    bullets: ["Live room updates", "Task tracking", "Maintenance alerts"],
  },
  {
    id: "guest-relationship",
    icon: <Users className="h-5 w-5" />,
    title: "Guest Relationship Management",
    description:
      "Deliver personalized experiences with guest data, preferences, and automated communication.",
    bullets: ["Guest profiles", "Email & SMS automation", "Loyalty tracking"],
    highlight: true,
  },
  {
    id: "revenue",
    icon: <Coins className="h-5 w-5" />,
    title: "Revenue Management",
    description:
      "Built-in loyalty and CRM tools to recognize repeat guests and drive long-term value through personalized offers.",
    bullets: [],
  },
  {
    id: "reporting",
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Reporting & Analytics",
    description: "Make smarter decisions with real-time dashboards and performance reports.",
    bullets: ["Live performance data", "Custom reports", "Export anytime"],
  },
]

const PropertyManagementOperations = () => {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]"
    >
      <SectionHeader
        eyebrow="ONE PLATFORM. ENDLESS POSSIBILITIES."
        eyebrowColor="#ED862E"
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
            className={cn(
              "flex flex-col rounded-[24px] border bg-white p-6",
              card.highlight
                ? "border-[#ED862E] shadow-[0_10px_40px_rgba(237,134,46,0.18)]"
                : "border-slate-200"
            )}
          >
            <div className="flex items-start gap-3">
              <CardIcon>{card.icon}</CardIcon>
              <h3 className="font-plus-jakarta-700 text-[18px] leading-[24px] text-[#010E38]">
                {card.title}
              </h3>
            </div>

            <p className="font-source-sans-400 mt-6 text-[14px] leading-[22px] text-[#475569]">
              {card.description}
            </p>

            {card.bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {card.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="font-source-sans-400 text-[14px] leading-[22px] text-[#64748B]"
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
