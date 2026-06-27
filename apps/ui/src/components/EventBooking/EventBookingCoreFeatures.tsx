"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

type Feature = {
  id: string
  title: string
  description: string
  image: string
  bullets: string[]
}

const features: Feature[] = [
  {
    id: "end-to-end-event-management",
    title: "End-to-End Event Management",
    description:
      "Configure and manage events seamlessly with centralized dashboard.",
    image: "/images/Event-Booking/Rectangle%204239.png",
    bullets: [
      "Create and manage multiple events from one platform",
      "Configure event schedules, sessions, and venues",
      "Assign roles and manage teams efficiently",
      "Real-time updates and coordination tools",
    ],
  },
  {
    id: "seamless-payment-integration",
    title: "Seamless Payment Integration",
    description: "Maximize conversions with frictionless payment options.",
    image: "/images/Event-Booking/Rectangle%204239%20(1).png",
    bullets: [
      "Seamless payments pre-integrated",
      "Accept credit/debit cards, UPI, wallets, and net banking",
      "Automated invoicing and receipts",
      "Real-time payment tracking and reconciliation",
    ],
  },
  {
    id: "event-website-custom-pages",
    title: "Event Website & Custom Pages",
    description: "Launch stunning event web pages without technical expertise.",
    image: "/images/Event-Booking/Rectangle%204239%20(2).png",
    bullets: [
      "Customizable event microsites",
      "Mobile-responsive designs",
      "Integrated registration and ticket purchase flow",
      "SEO-friendly structure for better visibility",
    ],
  },
  {
    id: "smart-ticketing-registration",
    title: "Smart Ticketing & Registration",
    description:
      "Deliver a smooth and flexible ticketing experience for your attendees.",
    image: "/images/Event-Booking/Rectangle%204239%20(3).png",
    bullets: [
      "Multiple variants for ticket sales (VIP, Early Bird, Group, etc.)",
      "Dynamic pricing and discount codes",
      "Online registration with instant confirmations",
      "Secure digital ticket generation (QR/Barcode-based)",
    ],
  },
  {
    id: "on-ground-check-in-access-control",
    title: "On-Ground Check-In & Access Control",
    description: "Ensure a smooth entry experience with minimal wait times.",
    image: "/images/Event-Booking/Rectangle%204239%20(4).png",
    bullets: [
      "Fast QR/barcode scanning via mobile app",
      "Real-time attendee validation",
      "Multi-entry and access level controls",
    ],
  },
  {
    id: "marketing-promotion-tools",
    title: "Marketing & Promotion Tools",
    description: "Drive registrations with built-in marketing capabilities.",
    image: "/images/Event-Booking/Rectangle%204239%20(5).png",
    bullets: [
      "Email campaigns and automation",
      "Social media integrations",
      "Referral and affiliate tracking",
      "Promo codes and targeted discounts",
    ],
  },
  {
    id: "crm-engagement-tools",
    title: "CRM & Engagement Tools",
    description: "Build lasting relationships beyond the event.",
    image: "/images/Event-Booking/Rectangle%204239%20(6).png",
    bullets: [
      "Capture and manage attendee data",
      "Post-event feedback and surveys",
    ],
  },
  {
    id: "analytics-reporting",
    title: "Analytics & Reporting",
    description: "Make data-driven decisions with powerful insights.",
    image: "/images/Event-Booking/Rectangle%204239%20(7).png",
    bullets: [
      "Real-time ticket sales tracking",
      "Revenue and attendance reports",
      "Marketing performance analytics",
      "Custom downloadable reports",
    ],
  },
  {
    id: "attendee-management",
    title: "Attendee Management",
    description: "Keep your attendees engaged and informed at every stage.",
    image: "/images/Event-Booking/Rectangle%204239.png",
    bullets: [
      "Centralized attendee database",
      "Automated email and SMS communication",
      "Check-in and badge management",
      "Personalized attendee experiences",
    ],
  },
]

function EventBookingCoreFeatures() {
  const [expandedFeatureIds, setExpandedFeatureIds] = useState<Set<string>>(
    () => new Set()
  )

  const toggleFeature = (id: string) => {
    setExpandedFeatureIds((current) => {
      const next = new Set(current)

      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }

      return next
    })
  }

  return (
    <section
      data-nav-theme="light"
      className="4xl:px-50 w-full bg-white px-4 py-[30px] md:px-8 lg:px-10 lg:py-[40px]"
    >
      <div className="mx-auto max-sm:px-0">
        <SectionHeader
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
              Core Features
            </SectionHeader.Highlight>
          }
          description="Powerful modules designed to work together to create seamless event experiences from creation to post-event analysis."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const isExpanded = expandedFeatureIds.has(f.id)

            return (
              <motion.div
                key={f.id}
                layout
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group flex h-full cursor-pointer flex-col rounded-[16px] border border-slate-200 bg-white px-[10.9px] py-[9.9px] shadow-sm lg:rounded-[21.795px]"
              >
                <motion.div
                  layout
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`w-full overflow-hidden rounded-[21.795px] bg-slate-100 ${
                    isExpanded ? "min-h-[200px] flex-1" : "aspect-[4/3.3]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.image}
                    alt={f.title}
                    className="object-fit h-full w-full transition-transform duration-300 group-hover:scale-[1.1]"
                  />
                </motion.div>
                <div className="px-2 py-4 md:p-5">
                  <h3 className="font-plus-jakarta-700 text-[20px] leading-[22.4px] text-black xl:text-[21.795px] xl:leading-normal">
                    {f.title}
                  </h3>
                  <p className="font-source-sans-400 mt-2 text-[16px] leading-[22.4px] text-[#666] xl:text-[16.35px] xl:leading-[26.16px]">
                    {f.description}
                  </p>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key={`${f.id}-bullets`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="font-source-sans-400 mt-3 list-disc space-y-1 pl-5 text-[14px] leading-[20px] text-[#666] xl:text-[15px] xl:leading-[22px]">
                          {f.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => toggleFeature(f.id)}
                    aria-expanded={isExpanded}
                    className="font-source-sans-400 mt-3 inline-flex items-center gap-1.5 text-[16px] leading-[22.4px] text-[#ED862E] opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 xl:text-[16.35px] xl:leading-[26.16px]"
                  >
                    {isExpanded ? "Show less" : "Learn more"}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`transition-transform duration-300 group-hover:translate-x-1 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default EventBookingCoreFeatures
