"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

import type { OmnichannelCard } from "@/components/ChannelConnect/ChannelConnectOmnichannelSection"
import { BentoGrid } from "@/components/common/BentoGrid"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"
import {
  MarketingIcon,
  SupportIcon,
  ShieldIcon,
  BillsIcon,
  CopyIcon,
} from "../../../public/svg/Contact-Us"


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
        "flex h-9 w-9 cursor-pointer shrink-0 items-center justify-center rounded-lg bg-white transition",
        copied
          ? "text-[#ED862E]"
          : "text-slate-500 hover:text-[#ED862E]"
      )}
    >
      {copied ? <TickIcon /> : <CopyIcon />}
    </button>
  )
}

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-[14px] bg-[#FEFAF5] text-[#ED862E]">
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
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <MarketingIcon />,
    email: "contact@resavenue.com",
    renderGraphic: () => null,
  },
  {
    id: "technical-support",
    title: "Technical support",
    description: "For API issues, integrations, and technical assistance.",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <SupportIcon />,
    email: "support@resavenue.com",
    renderGraphic: () => null,
  },
  {
    id: "risk-cardholder-support",
    title: "Risk & Cardholder Support",
    description: "For fraud concerns, chargebacks, and cardholder issues.",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <ShieldIcon />,
    email: "risk@resavenue.com",
    renderGraphic: () => null,
  },
  {
    id: "billing-accounts",
    title: "Billing & Accounts",
    description: "For invoices, payments, and accounts related queries.",
    gridSpan: "col-span-1 lg:col-span-3",
    icon: <BillsIcon />,
    email: "accounts@resavenue.com",
    renderGraphic: () => null,
  },
]

function ContactUsBody() {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-15 md:px-8 lg:py-25"
    >
      <div className="">
        <BentoGrid<ContactCard>
          items={contactCards}
          containerClassName="w-full"
          gridClassName="relative grid auto-rows-fr grid-cols-1 gap-6 lg:grid-cols-12"
          cardClassName="min-h-[150px] w-full justify-start overflow-hidden rounded-xl border border-slate-200 bg-white max-lg:px-4 max-md:p-4 md:p-4 lg:p-2 xl:p-6 "
          header={
            <SectionHeader
              className="mx-auto mb-[40px] max-w-3xl text-center lg:mb-[60px]"
              eyebrowClassName="typo-body2 font-normal text-[#ED862E] xl:font-bold xl:text-[12px] xl:tracking-[0.7px]"
              titleClassName="xl:leading-[56.5px] tracking-[-1.5px]! xl:tracking-normal!"
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
          renderCard={(item) => (
            <div className="flex h-full flex-col">
              <div className="">
                <div className="flex items-start gap-3">
                  <CardIcon>{item.icon}</CardIcon>

                  <div>
                    <h3 className="typo-body5 text-[#010E38] font-bold! font-source-sans! leading-[22.4px]! xl:font-plus-jakarta! xl:leading-6!">
                      {item.title}
                    </h3>

                    <p className="typo-body1 mt-2 max-w-[260px] text-[14px]! text-[#475569] xl:leading-5!">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <span className="typo-body1 truncate xl:pl-[60px] pl-[60px] lg:pl-2 text-[#ED862E] xl:text-[16px]! xl:leading-[22.75px]!">
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
