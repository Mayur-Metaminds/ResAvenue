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
    <section className="relative w-full bg-white py-8 md:py-20">
      <div className="container mx-auto max-w-[1200px] px-[12px] md:px-8">

        {/* Header Content */}
        <div className="mx-auto mb-8 md:mb-[32px] w-full max-w-3xl">
          <SectionHeader
            eyebrow="Optimized for conversions"
            eyebrowClassName="md:mb-[32px]"
            title={
              <>
              
              <SectionHeader.Highlight>
               Maximize Revenue from             
               </SectionHeader.Highlight>

               <br />
               Every {" "}
               <SectionHeader.Highlight>
                Guest
               </SectionHeader.Highlight>
              </>
              
            }
            highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 57.71%, #ED862E 68.44%)"
            description="Go beyond room bookings — increase your revenue with smart packages, targeted promotions, and high-converting add-ons."
            descriptionClassName="typo-body4 text-[#464554]"
            titleClassName="mb-[12px] tracking-[-1.5px]!"
          />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3 lg:gap-10">
          {REVENUE_CARDS.map((card) => (
            <div key={card.id} className="flex flex-col w-full group ">

              {/* Image & Label Box */}
              <div className="flex w-full flex-col overflow-hidden rounded-[20px] border-[0.5px] border-solid border-[#ED862E] bg-white pt-6 md:pt-8 lg:pt-10 shadow-sm transition-shadow hover:shadow-md">

                {/* Top Label */}
                <span className="mb-6 pl-[33px] text-[11px] font-bold uppercase leading-[17.6px] tracking-[1.5px] text-[#ED862E] [font-family:var(--font-plus-jakarta)]">
                  {card.label}
                </span>

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-2xl bg-gray-50">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Content (Outside the box) */}
              <div className="flex flex-col gap-[6px] mt-[12px] p-[16px]">
                <h3 className="typo-body1 text-[20px] font-bold leading-7 text-[#191C1E]">
                  {card.title}
                </h3>
                <p className="typo-body4 text-[#464554]">
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
