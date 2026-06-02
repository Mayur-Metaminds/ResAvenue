import React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

type Feature = {
  id: string
  title: string
  description: string
  image: string
}

const features: Feature[] = [
  {
    id: "end-to-end-event-management",
    title: "End-to-End Event Management",
    description:
      "Configure and manage events seamlessly with centralized dashboard.",
    image: "/images/Event-Booking/end-to-end-event-management.jpg",
  },
  {
    id: "seamless-payment-integration",
    title: "Seamless Payment Integration",
    description:
      "Maximize conversions with frictionless payment options.",
    image: "/images/Event-Booking/seamless-payment-integration.jpg",
  },
  {
    id: "event-website-custom-pages",
    title: "Event Website & Custom Pages",
    description:
      "Launch stunning event web pages without technical expertise.",
    image: "/images/Event-Booking/event-website-custom-pages.jpg",
  },
  {
    id: "smart-ticketing-registration",
    title: "Smart Ticketing & Registration",
    description:
      "Deliver a smooth and flexible ticketing experience for your attendees.",
    image: "/images/Event-Booking/smart-ticketing-registration.jpg",
  },
  {
    id: "on-ground-check-in-access-control",
    title: "On-Ground Check-In & Access Control",
    description:
      "Ensure a smooth entry experience with minimal wait times.",
    image: "/images/Event-Booking/on-ground-check-in-access-control.jpg",
  },
  {
    id: "marketing-promotion-tools",
    title: "Marketing & Promotion Tools",
    description:
      "Drive registrations with built-in marketing capabilities.",
    image: "/images/Event-Booking/marketing-promotion-tools.jpg",
  },
  {
    id: "crm-engagement-tools",
    title: "CRM & Engagement Tools",
    description: "Build lasting relationships beyond the event.",
    image: "/images/Event-Booking/crm-engagement-tools.jpg",
  },
  {
    id: "analytics-reporting",
    title: "Analytics & Reporting",
    description: "Make data-driven decisions with powerful insights.",
    image: "/images/Event-Booking/analytics-reporting.jpg",
  },
  {
    id: "attendee-management",
    title: "Attendee Management",
    description:
      "Keep your attendees engaged and informed at every stage.",
    image: "/images/Event-Booking/attendee-management.jpg",
  },
]

const EventBookingCoreFeatures = () => {
  return (
    <section className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="mx-auto max-w-6xl">
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
          {features.map((f) => (
            <div
              key={f.id}
              className="rounded-[21.795px] border border-slate-200 bg-white px-[10.9px] py-[9.9px] shadow-sm"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[21.795px] bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-plus-jakarta-700 text-[20px] leading-[22.4px] text-black xl:text-[21.795px] xl:leading-normal">
                  {f.title}
                </h3>
                <p className="font-source-sans-400 mt-2 text-[16px] leading-[22.4px] text-[#666] xl:text-[16.35px] xl:leading-[26.16px]">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  )
}

export default EventBookingCoreFeatures
