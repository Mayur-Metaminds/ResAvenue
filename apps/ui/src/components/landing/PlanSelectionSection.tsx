"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { buttonVariants } from "@/components/ui/button"

import {
  CoreServicesIcon1,
  CoreServicesIcon2,
  CoreServicesIcon3,
  CoreServicesIcon4,
  CoreServicesIcon5,
  CoreServicesIcon6,
  CoreServicesIcon7,
} from "../../../public/svg/LandingPage"

import { SectionHeader } from "./SectionHeader"
import { CheckedIcon } from "../../../public/svg/commonSvg"
import { UnifiedPlatformIcon1 } from "../../../public/svg/Direct-Connect"

const services = [
  {
    id: "direct-connect",
    title: "Direct Connect",
    description:
      "Booking engine: Turn your website into a highly-converting booking engine.",
    icon: CoreServicesIcon1,
  },
  {
    id: "channel-connect",
    title: "Channel Connect",
    description:
      "Channel Manager: Manage all OTAs and inventory from one dashboard.",
    icon: CoreServicesIcon2,
  },
  {
    id: "pms",
    title: "Property Management System",
    description: "Run your operations seamlessly in one place.",
    icon: CoreServicesIcon3,
  },
  {
    id: "revenue-management",
    title: "Revenue Management",
    description: "Optimize pricing and grow your revenue intelligently.",
    icon: CoreServicesIcon4,
  },
  {
    id: "distribution",
    title: "Distribution Network",
    description:
      "GDS/IDS: Reach more corporates & guests across global booking platforms.",
    icon: CoreServicesIcon5,
  },
  {
    id: "event-management",
    title: "Event Management",
    description: "Create, manage, and monetize your events effortlessly.",
    icon: CoreServicesIcon6,
  },
  {
    id: "website-builder",
    title: "Website Builder",
    description: "Build stunning websites that drive direct bookings.",
    icon: CoreServicesIcon7,
  },
  {
    // Reuses CoreServicesIcon5 (globe) — closest semantic match for travel.
    id: "tours-packages",
    title: "Tours & Packages Engine",
    description:
      "Sell curated guest experiences that create new revenue streams.",
    icon: CoreServicesIcon5,
  },
  {
    // Reuses CoreServicesIcon1 — no dedicated mobile icon in CoreServicesIcon set.
    id: "mobile-app",
    title: "Mobile App Ecosystem",
    description:
      "Manage hospitality operations anytime, anywhere with mobile-first access.",
    icon: CoreServicesIcon1,
  },
  {
    // Reuses CoreServicesIcon4 (chart) — fits analytics theme.
    id: "analytics-reporting",
    title: "Analytics & Reporting",
    description:
      "Real-time pace, pickup, and channel mix dashboards built for revenue teams.",
    icon: CoreServicesIcon4,
  },
  {
    // Reuses CoreServicesIcon2 (transfer/connection) — fits loyalty/CRM theme.
    id: "guest-crm",
    title: "Guest CRM & Loyalty",
    description:
      "Negotiated rates, loyalty tiers, and travel-program portals in one place.",
    icon: CoreServicesIcon2,
  },
]

export function PlanSelectionSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectService = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }


  return (
    <section
      data-nav-theme="light"
      className="relative flex w-full rounded-b-[40px] flex-col items-center overflow-hidden py-[58px]"
      style={{
        background:
          "var(--bg, linear-gradient(225deg, rgba(240, 242, 253, 1) 0%, rgba(61, 98, 129, 0.15) 100%))",
      }}
    >
      {/* Header */}
      <div className="z-10 mb-[16px] lg:mb-[60px] px-4 text-center">
        <SectionHeader
          eyebrow="PRICING"
          title={
            <>
              Choose the plan that fits your
              <br />
              <SectionHeader.Highlight>
                organization&apos;s needs
              </SectionHeader.Highlight>
            </>
          }
          description="Explore powerful tools designed to simplify operations, increase bookings, and maximize revenue."
          descriptionClassName="typo-body-1 text-slate-400"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] xl:px-[80px] ">
        <div className="flex flex-col gap-8 rounded-[32px] py-[48px] border border-slate-100 bg-white px-[12px] lg:px-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]  lg:flex-row lg:gap-[48.34px] ">
          {/* Left Column */}
          <div className="flex w-full flex-col border-slate-300 lg:w-[336px] lg:border-r">
            <h3 className=" typo-h1 text-[24px] lg:text-[30px] text-[#010C28] mr-[23px]">
              Ready to get started?
            </h3>
            <p className="mb-0 lg:mb-10 typo-body1 leading-[22.8px] text-[14px] lg:w-[287px] text-slate-400">
              Our specialists will build a custom package based on your
              team&apos;s specific requirements.
            </p>

            <div className="mt-auto hidden lg:block">
              <Link
                href="/contact-us"
                className={buttonVariants({
                  variant: "primary",
                  size: "default",
                  className: "gap-3 px-8 py-4 typo-body5 !rounded-[16px]",
                })}
              >
                Request Custom Quote
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-5 flex items-center gap-2 text-emerald-500">
                <UnifiedPlatformIcon1 />
                <span className="typo-body-2 text-slate-400">
                  Response within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[65%]">
            <div className="mb-[24px]">
              <h4 className="mb-[4px] typo-h2 text-[20px] font-medium text-[#010C28]">
                Select your core services
              </h4>
              <p className="typo-body3 font-normal text-slate-400">
                Organize your operational stack by choosing the professional
                modules you need.
              </p>
            </div>

            <div className="flex flex-wrap gap-1 lg:gap-4">
              {services.map((service) => {
                const isSelected = selectedId === service.id
                const Icon = service.icon

                return (
                  <button
                    key={service.id}
                    onClick={() => selectService(service.id)}
                    className={`group relative cursor-pointer flex min-h-[171px] w-full flex-col items-start gap-4 rounded-[16px] bg-[#010C28] p-[21px] text-left transition-all duration-300 outline-none sm:w-[243px] ${isSelected
                        ? "border-2 border-[#ED862E] shadow-[0_0_20px_rgba(237,134,46,0.15)]"
                        : "border-2 border-transparent hover:border-slate-700"
                      }`}
                  >
                    {/* Checkmark for selected state */}
                    {isSelected && (
                      <div className="absolute top-[21px] right-[21px] text-[#ED862E]">
                        <CheckedIcon />
                      </div>
                    )}

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-[#ED862E]/10 group-hover:text-[#ED862E] [&_svg]:h-full [&_svg]:w-full ${isSelected
                          ? "bg-[#ED862E]/10 text-[#ED862E]"
                          : "bg-transparent text-slate-400"
                        }`}
                    >
                      <Icon />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h5 className="pr-6 text-[15px] font-medium text-white transition-colors duration-200 group-hover:text-[#ED862E]">
                        {service.title}
                      </h5>
                      <p className="text-xs leading-relaxed text-slate-400">
                        {service.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 block lg:hidden">
              <Link
                href="/contact-us"
                className={buttonVariants({
                  variant: "primary",
                  size: "default",
                  className: "gap-3 px-8 py-4 typo-body5 !rounded-[16px]",
                })}
              >
                Request Custom Quote
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-5 flex items-center gap-2 text-emerald-500">
                <UnifiedPlatformIcon1 />
                <span className="typo-body-2 text-slate-400">
                  Response within 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
