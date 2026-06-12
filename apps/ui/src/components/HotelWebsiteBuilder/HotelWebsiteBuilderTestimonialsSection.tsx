"use client"

import { Marquee } from "@/components/common/Marquee"
import { SectionHeader } from "@/components/landing/SectionHeader"

const testimonials = [
  {
    id: 1,
    quote: "Guests tell us that the flow from reservation to stay to billing is a very logical and smooth experience. Mews plays a big part in that - it's all about the guest.",
    name: "Coen Schelfhorst",
    role: "Owner - GuestHouse Hotels",
    initials: "CS",
  },
  {
    id: 2,
    quote: "The seamless integration and intuitive interface have completely transformed how we manage daily operations. It feels less like software and more like a partner.",
    name: "Sarah Jenkins",
    role: "General Manager - The Boutique",
    initials: "SJ",
  },
  {
    id: 3,
    quote: "Our direct bookings skyrocketed within the first month. The platform is robust, easy to use, and our staff adopted it immediately without any steep learning curve.",
    name: "David Chen",
    role: "Director of Revenue - Horizon Resorts",
    initials: "DC",
  },
  {
    id: 4,
    quote: "Guests tell us that the flow from reservation to stay to billing is a very logical and smooth experience. Mews plays a big part in that - it's all about the guest.",
    name: "Coen Schelfhorst",
    role: "Owner - GuestHouse Hotels",
    initials: "CS",
  },
  {
    id: 5,
    quote: "The seamless integration and intuitive interface have completely transformed how we manage daily operations. It feels less like software and more like a partner.",
    name: "Sarah Jenkins",
    role: "General Manager - The Boutique",
    initials: "SJ",
  },
]

export function HotelWebsiteBuilderTestimonialsSection() {
  return (
    <section className="w-full bg-white py-[50px] md:py-[85px] overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeader
          eyebrow="Trusted by Modern Hotels"
          eyebrowClassName="mb-[16px] md:mb-[32px] typo-body2"
          title={
            <SectionHeader.Highlight
              style={{
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              Loved by Hospitality Teams
              <br />
              Around the World
            </SectionHeader.Highlight>
          }
          titleClassName="mb-[24px] md:mb-[12px]"
          highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 57.71%, #ED862E 68.44%)"
          description="Empowering hotels around the world to deliver seamless digital experiences, smarter operations, and guest journeys designed to convert."
          descriptionClassName="typo-body1 text-[#464554]"
        />
      </div>

      <div className="mt-[81px] md:mt-[51px] w-full">
        <Marquee
          className="w-full py-4"
          items={testimonials}
          getKey={(item) => item.id}
          durationSeconds={45}
          pauseOnHover={true}
          edgeFade
          mdGapPx={34}
          gapPx={8}
          backgroundColor="transparent"
          renderItem={(testimonial) => (
            <div className="flex h-full min-h-[220px] flex-col justify-between w-[320px] md:w-[400px] rounded-[18px] border border-[#ED862E]/20 bg-white p-6 md:p-8 transition-shadow hover:shadow-lg">
              <p className="text-[#010E38] text-[24px] typo-body1">
                {testimonial.quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ED862E] text-white font-plus-jakarta-600 text-[14px]">
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#ED862E] typo-body5 font-bold">{testimonial.name}</span>
                  <span className="text-[#010C28] typo-body3 font-normal">{testimonial.role}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}
