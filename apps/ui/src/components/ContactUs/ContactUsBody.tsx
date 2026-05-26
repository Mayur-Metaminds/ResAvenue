"use client"

import type React from "react"

import type { OmnichannelCard } from "@/components/ChannelConnect/ChannelConnectOmnichannelSection"
import { BentoGrid } from "@/components/common/BentoGrid"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15V5a2 2 0 012-2h10" />
    </svg>
  )
}

function MarketingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function RiskIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  )
}

function BillingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      />
    </svg>
  )
}

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-[14px] bg-[#FEF3E2] text-[#ED862E]">
      {children}
    </div>
  )
}

type ContactCard = OmnichannelCard & {
  icon: React.ReactNode
  email: string
}

const contactCards: ContactCard[] = [
  {
    id: "marketing-inquiries",
    title: "Marketing inquiries",
    description: "For partnerships, media, and general inquiries.",
    theme: "light",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <MarketingIcon />,
    email: "contact@resavenue.com",
    renderGraphic: () => null,
  },
  {
    id: "technical-support",
    title: "Technical support",
    description: "For API issues, integrations, and technical assistance.",
    theme: "light",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <SupportIcon />,
    email: "support@resavenue.com",
    renderGraphic: () => null,
  },
  {
    id: "risk-cardholder-support",
    title: "Risk & Cardholder Support",
    description: "For fraud concerns, chargebacks, and cardholder issues.",
    theme: "light",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <RiskIcon />,
    email: "risk@resavenue.com",
    renderGraphic: () => null,
  },
  {
    id: "billing-accounts",
    title: "Billing & Accounts",
    description: "For invoices, payments, and accounts related queries.",
    theme: "light",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <BillingIcon />,
    email: "accounts@resavenue.com",
    renderGraphic: () => null,
  },
]

function ContactUsBody() {
  return (
    <section className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="px-6">
        <BentoGrid<ContactCard>
          items={contactCards}
          containerClassName="w-full"
          gridClassName="relative grid auto-rows-fr grid-cols-1 gap-6 lg:grid-cols-12"
          cardClassName="min-h-[220px] w-full justify-start overflow-hidden rounded-[24px] border border-slate-200 bg-white max-lg:px-4 max-md:p-4 md:p-4 lg:p-6"
          header={
            <SectionHeader
              theme="light"
              className="mx-auto mb-[40px] max-w-3xl text-center lg:mb-[60px]"
              eyebrow="API-first infrastructure"
              title={
                <SectionHeader.Highlight>
                  Reach the Right Team
                </SectionHeader.Highlight>
              }
              description="Choose the appropriate email below and our team will get back to you with the right support as quickly as possible."
            />
          }
          renderCard={(item, { theme }) => (
            <div className="flex h-full flex-col justify-between">
              <div className="min-h-[120px]">
                <div className="flex items-start gap-3">
                  <CardIcon>{item.icon}</CardIcon>

                  <div>
                    <h3
                      className={cn(
                        "font-plus-jakarta-700 text-[16px] leading-[1.3]",
                        theme === "dark" ? "text-white" : "text-[#0F172A]"
                      )}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={cn(
                        "font-source-sans-400 mt-2 max-w-[260px] text-[14px] leading-[24px] md:text-[16px]",
                        theme === "dark" ? "text-white/70" : "text-[#64748B]"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-source-sans-600 truncate pl-[60px] text-[16px] text-[#ED862E]">
                  {item.email}
                </span>

                <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-[#ED862E] hover:text-[#ED862E]">
                  <CopyIcon />
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}

export default ContactUsBody
