"use client"

import {
  Monitor,
  Link,
  Building2,
  LineChart,
  Globe,
  Ticket,
  Layout,
  Map,
  Smartphone,
  Zap,
  ArrowRight,
} from "lucide-react"
import { useState } from "react"

import { SectionHeader } from "./SectionHeader"

const services = [
  {
    id: "direct-connect",
    title: "Direct Connect",
    description:
      "Booking engine: Turn your website into a highly-converting booking engine.",
    icon: Monitor,
  },
  {
    id: "channel-connect",
    title: "Channel Connect",
    description:
      "Channel Manager: Manage all OTAs and inventory from one dashboard.",
    icon: Link,
  },
  {
    id: "pms",
    title: "Property Management System",
    description: "Run your operations seamlessly in one place.",
    icon: Building2,
  },
  {
    id: "revenue-management",
    title: "Revenue Management",
    description: "Optimize pricing and grow your revenue intelligently.",
    icon: LineChart,
  },
  {
    id: "distribution",
    title: "Distribution Network",
    description:
      "GDS/IDS: Reach more corporates & guests across global booking platforms.",
    icon: Globe,
  },
  {
    id: "event-management",
    title: "Event Management",
    description: "Create, manage, and monetize your events effortlessly.",
    icon: Ticket,
  },
  {
    id: "website-builder",
    title: "Website Builder",
    description: "Build stunning websites that drive direct bookings.",
    icon: Layout,
  },
  {
    id: "tours-packages",
    title: "Tours & Packages Engine",
    description:
      "Sell curated guest experiences that create new revenue streams.",
    icon: Map,
  },
  {
    id: "mobile-app",
    title: "Mobile App Ecosystem",
    description:
      "Manage hospitality operations anytime, anywhere with mobile-first access.",
    icon: Smartphone,
  },
]

export function PlanSelectionSection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    )
  }

  const handleRequestQuote = () => {
    const selectedTitles = services
      .filter((s) => selectedIds.includes(s.id))
      .map((s) => s.title)

    // Save to state/console as requested
    console.log("Saving selected services for quote:", selectedTitles)

    // Redirect to #
    window.location.href = "#"
  }

  return (
    <section
      data-nav-theme="light"
      className="relative flex w-full flex-col items-center overflow-hidden py-24"
      style={{
        background:
          "var(--bg, linear-gradient(225deg, rgba(240, 242, 253, 1) 0%, rgba(61, 98, 129, 0.15) 100%))",
      }}
    >
      {/* Header */}
      <div className="z-10 mb-16 px-4 text-center">
        <SectionHeader
          theme="light"
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
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1300px] md:px-8">
        <div className="flex flex-col gap-16 rounded-[32px] border border-slate-100 bg-white p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] md:p-12 lg:flex-row lg:p-16 xl:gap-24">
          {/* Left Column */}
          <div className="flex w-full flex-col lg:w-[35%]">
            <h3 className="mb-4 text-3xl font-medium tracking-tight text-[#010C28]">
              Ready to get started?
            </h3>
            <p className="mb-10 text-[15px] leading-relaxed text-slate-500">
              Our specialists will build a custom package based on your
              team&apos;s specific requirements.
            </p>

            <div className="mt-auto">
              <button
                onClick={handleRequestQuote}
                className="inline-flex items-center gap-3 rounded-full bg-linear-to-r from-[#ED862E] to-[#D97726] px-8 py-4 font-medium text-white transition-transform hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-[#ED862E] focus:ring-offset-2 focus:outline-none"
              >
                Request Custom Quote
                <ArrowRight className="h-5 w-5" />
              </button>

              <div className="mt-5 flex items-center gap-2 text-emerald-500">
                <Zap className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                <span className="text-sm font-medium">
                  Response within 24 hours
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[65%]">
            <div className="mb-8">
              <h4 className="mb-2 text-xl font-semibold text-[#010C28]">
                Select your core services
              </h4>
              <p className="text-sm text-slate-500">
                Organize your operational stack by choosing the professional
                modules you need.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => {
                const isSelected = selectedIds.includes(service.id)
                const Icon = service.icon

                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`group relative overflow-hidden rounded-[20px] p-6 text-left transition-all duration-300 outline-none ${
                      isSelected
                        ? "border-2 border-[#ED862E] bg-[#0B1530] shadow-[0_0_20px_rgba(237,134,46,0.15)]"
                        : "border-2 border-transparent bg-[#0B1530] hover:border-slate-700"
                    }`}
                  >
                    {/* Checkmark for selected state */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-[#ED862E]">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                    )}

                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors">
                      <Icon
                        className={`h-5 w-5 ${isSelected ? "text-[#ED862E]" : "text-slate-400 group-hover:text-slate-200"}`}
                      />
                    </div>

                    <h5 className="mb-2 pr-6 text-[15px] font-medium text-white">
                      {service.title}
                    </h5>

                    <p className="text-xs leading-relaxed text-slate-400">
                      {service.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
