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
    <section  data-nav-theme="light" className="w-full bg-white py-[50px] md:py-[85px] overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        <SectionHeader
          eyebrow="Trusted by Modern Hotels"
          eyebrowClassName="mb-[16px] md:mb-[32px] typo-body2"
          title={
            <SectionHeader.Highlight
              className="px-2 md:px-0"
              style={{
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              Loved by Hospitality Teams
              <br className="hidden md:block" /> Around the World
            </SectionHeader.Highlight>
          }
          titleClassName="mb-[24px] md:mb-[12px] tracking-[-1.5px]! max-w-[674px] mx-auto"
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
            <div className="flex h-full gap-[23px] min-h-[329px] flex-col justify-between w-[320px] md:w-[530px] rounded-[24px] border border-[#ED862E]/20 bg-white p-6 md:p-8 transition-shadow hover:shadow-lg">
              <p className="font-source-sans-400 h-full text-[24px] leading-[30.124px] text-[#010E38] flex justify-center items-center">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-[12px]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ED862E] text-white font-plus-jakarta-600 text-[14px]">
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-plus-jakarta-700 text-[16px] leading-[24px] text-[#ED862E]">{testimonial.name}</span>
                  <span className="font-source-sans-400 text-[14px] leading-[20.251px] text-[#010C28]">{testimonial.role}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}
