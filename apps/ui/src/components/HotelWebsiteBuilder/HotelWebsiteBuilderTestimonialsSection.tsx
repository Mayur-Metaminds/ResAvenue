"use client"

import { Marquee } from "@/components/common/Marquee"

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
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-2 mb-6 md:mb-10">
            <div className="h-2 w-2 rounded-full bg-[#ED862E]" />
            <span className="font-plus-jakarta-500 text-[14px] tracking-[1.4px] text-[#ED862E] uppercase">
              Trusted by Modern Hotels
            </span>
          </div>
          <h2 className="font-plus-jakarta-500 text-[40px] leading-[1.2] text-[#0F172A] md:text-[48px]">
            Loved by <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(91deg, #010E38 9.57%, #1A2F6D 37.74%, #ED862E 82.58%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hospitality Teams</span>
            <br />
            Around the World
          </h2>
          <p className="mt-6 max-w-3xl font-plus-jakarta-400 text-[16px] text-[#64748B] md:text-[18px]">
            Empowering hotels around the world to deliver seamless digital experiences, smarter operations, and guest journeys designed to convert.
          </p>
        </div>
      </div>

      <div className="mt-12 w-full">
        <Marquee
          className="w-full py-4"
          items={testimonials}
          getKey={(item) => item.id}
          durationSeconds={45}
          pauseOnHover={true}
          edgeFade
          gapPx={24}
          backgroundColor="transparent"
          renderItem={(testimonial) => (
            <div className="flex h-full min-h-[220px] flex-col justify-between w-[320px] md:w-[400px] rounded-[18px] border border-[#ED862E]/20 bg-white p-6 md:p-8 transition-shadow hover:shadow-lg">
              <p className="text-[#0F172A] font-plus-jakarta-400 text-[15px] md:text-[16px] leading-[1.6]">
                {testimonial.quote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ED862E] text-white font-plus-jakarta-600 text-[14px]">
                  {testimonial.initials}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#ED862E] font-plus-jakarta-600 text-[14px] md:text-[15px] leading-tight">{testimonial.name}</span>
                  <span className="text-[#64748B] font-plus-jakarta-400 text-[12px] md:text-[13px] mt-1 leading-tight">{testimonial.role}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  )
}
