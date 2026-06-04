"use client"

import Image from "next/image"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

const REVENUE_CARDS = [
  {
    id: "packages",
    label: "PACKAGES",
    title: "Bundle More. Earn More.",
    description: "Create attractive room + experience bundles that increase booking value and enhance guest experience.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder4.png", // Replace with actual image later
  },
  {
    id: "promotions",
    label: "PROMOTIONS",
    title: "Drive Bookings with Smart Offers",
    description: "Launch targeted discounts, promo codes, and seasonal deals to boost conversions and fill occupancy faster.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder5.png", 
  },
  {
    id: "upsells",
    label: "UPSELLS",
    title: "Increase Value with Add-Ons",
    description: "Offer extras like airport transfers, meals, or experiences during booking to grow revenue per guest.",
    image: "/images/Hotel-Website-Builder/Hotel-Website-Builder6.png",
  }
]

export function HotelWebsiteBuilderRevenueSection() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        
        {/* Header Content */}
        <div className="mx-auto mb-12 md:mb-16 w-full max-w-3xl">
          <SectionHeader
            eyebrow="Optimized for conversions"
            title={"Maximize Revenue from\nEvery Guest"}
            titleHighlight="Revenue"
            description="Go beyond room bookings — increase your revenue with smart packages, targeted promotions, and high-converting add-ons."
          />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {REVENUE_CARDS.map((card) => (
            <div key={card.id} className="flex flex-col w-full group">
              
              {/* Image & Label Box */}
              <div className="flex w-full flex-col overflow-hidden rounded-[32px] border border-gray-200 bg-white pt-6 md:pt-8 lg:pt-10 shadow-sm transition-shadow hover:shadow-md">
                
                {/* Top Label */}
                <span className="mb-6 text-sm font-bold uppercase tracking-widest text-[#ED862E]">
                  {card.label}
                </span>

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Content (Outside the box) */}
              <div className="flex flex-col gap-3 mt-8 px-2">
                <h3 className="text-2xl font-bold text-[#1E293B]">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-[#64748B]">
                  {card.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
