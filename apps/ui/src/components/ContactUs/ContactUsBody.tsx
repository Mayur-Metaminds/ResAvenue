"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

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

function TickIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 500)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? `Copied ${email}` : `Copy ${email}`}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-white transition",
        copied
          ? "border-[#ED862E] text-[#ED862E]"
          : "border-slate-200 text-slate-500 hover:border-[#ED862E] hover:text-[#ED862E]"
      )}
    >
      {copied ? <TickIcon /> : <CopyIcon />}
    </button>
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
          cardClassName="min-h-[150px] w-full justify-start overflow-hidden rounded-xl border border-slate-200 bg-white max-lg:px-4 max-md:p-4 md:p-4 lg:p-6"
          header={
            <SectionHeader
              className="mx-auto mb-[40px] max-w-3xl text-center lg:mb-[60px]"
              eyebrowClassName="typo-body2 font-normal text-[#ED862E] xl:font-bold xl:text-[12px] xl:tracking-[0.7px]"
              titleClassName="xl:leading-[56.5px] xl:tracking-normal"
              descriptionClassName="typo-body1 text-center text-[#64748B]"
              eyebrow="API-first infrastructure"
              title={
                <SectionHeader.Highlight
                  style={{
                    background:
                      "linear-gradient(86deg, #010E38 -2.62%, #1A2F6D 54.67%, #ED862E 76.16%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Reach the Right Team
                </SectionHeader.Highlight>
              }
              description="Choose the appropriate email below and our team will get back to you with the right support as quickly as possible."
            />
          }
          renderCard={(item, { theme }) => (
            <div className="flex h-full flex-col justify-between">
              <div className="">
                <div className="flex items-start gap-3">
                  <CardIcon>{item.icon}</CardIcon>

                  <div>
                    <h3
                      className={cn(
                        "font-plus-jakarta-700 text-[16px] leading-[24px]",
                        theme === "dark" ? "text-white" : "text-[#010E38]"
                      )}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={cn(
                        "font-source-sans-400 mt-2 max-w-[260px] text-[14px] leading-[20px]",
                        theme === "dark" ? "text-white/70" : "text-[#475569]"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-source-sans-400 truncate pl-[60px] text-[16px] leading-[22.75px] text-[#ED862E]">
                  {item.email}
                </span>

                <CopyEmailButton email={item.email} />
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}

export default ContactUsBody
