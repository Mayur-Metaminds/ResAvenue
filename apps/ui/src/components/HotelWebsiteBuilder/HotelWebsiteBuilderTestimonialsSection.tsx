"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Marquee } from "@/components/common/Marquee"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

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

type Testimonial = (typeof testimonials)[number]

function HotelWebsiteBuilderTestimonialCard({
  testimonial,
  className,
  active = false,
  onClick,
}: {
  testimonial: Testimonial
  className?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex h-full gap-[23px] md:min-h-[329px] flex-col justify-between w-full rounded-[15px] md:rounded-[24px] border transition-all duration-300 bg-white p-[16px] md:p-[28px]",
        active ? "border-[#ED862E]/60 shadow-md" : "border-[#ED862E]/20 hover:shadow-lg",
        onClick && "cursor-pointer",
        className
      )}
    >
      <p className="font-source-sans-400 h-auto text-[14px] md:text-[24px] leading-[28px] md:text-[24px] md:leading-[30.124px] text-[#010E38] flex justify-center items-center">
        {testimonial.quote}
      </p>
      <div className="flex items-center gap-[12px]">
        <div className="flex h-[28px] w-[28px] md:h-[44px] md:w-[44px] shrink-0 items-center justify-center rounded-full bg-[#ED862E] text-white font-plus-jakarta-600 text-[10px] md:text-[15px]">
          {testimonial.initials}
        </div>
        <div className="flex flex-col text-left">
          <span className="font-plus-jakarta-700 text-[9.83px] md:text-[15px] leading-[24px] text-[#ED862E]">{testimonial.name}</span>
          <span className="font-source-sans-400 text-[9.06px] md:text-[12.65px] leading-[20.251px] text-[#010C28]">{testimonial.role}</span>
        </div>
      </div>
    </div>
  )
}

function HotelWebsiteBuilderTestimonialsMobileCarousel({ items }: { items: Testimonial[] }) {
  const count = items.length
  const [pos, setPos] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [snapping, setSnapping] = useState(false)
  const [active, setActive] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)

  const extended: Testimonial[] =
    count > 1 ? [items[count - 1]!, ...items, items[0]!] : items

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let onScreen = true
    const sync = () => setActive(onScreen && !document.hidden)
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              onScreen = entry?.isIntersecting ?? true
              sync()
            },
            { threshold: 0.1 }
          )
        : null
    io?.observe(el)
    document.addEventListener("visibilitychange", sync)
    sync()

    return () => {
      io?.disconnect()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])

  useEffect(() => {
    if (isPaused || !active || count <= 1) return
    const id = setInterval(() => setPos((p) => p + 1), 4000)
    return () => clearInterval(id)
  }, [isPaused, active, count])

  useEffect(() => {
    if (!snapping) return
    const raf = requestAnimationFrame(() => setSnapping(false))
    return () => cancelAnimationFrame(raf)
  }, [snapping])

  useEffect(() => {
    if (count <= 1) return
    if (pos > count + 1 || pos < 0) {
      setSnapping(true)
      setPos((((pos - 1) % count) + count) % count + 1)
    }
  }, [pos, count])

  const handleTransitionEnd = () => {
    if (pos >= count + 1) {
      setSnapping(true)
      setPos(pos - count)
    } else if (pos <= 0) {
      setSnapping(true)
      setPos(pos + count)
    }
  }

  const prev = () => {
    setIsPaused(true)
    setPos((p) => p - 1)
  }
  const next = () => {
    setIsPaused(true)
    setPos((p) => p + 1)
  }

  return (
    <div
      ref={rootRef}
      className="mt-[51px] w-full md:hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="overflow-hidden px-4">
        <div
          className="flex"
          style={{
            transform: `translateX(-${pos * 88}%)`,
            transition: snapping ? "none" : "transform 500ms ease-out",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((testimonial, idx) => (
            <div
              key={idx}
              className="w-[88%] shrink-0 px-2"
              aria-hidden={idx !== pos}
            >
              <HotelWebsiteBuilderTestimonialCard
                testimonial={testimonial}
                active={idx === pos}
                onClick={() => setIsPaused(true)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-[#ED862E] hover:bg-[#ED862E] hover:text-white active:scale-95"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-12 w-12 touch-manipulation items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-[#ED862E] hover:bg-[#ED862E] hover:text-white active:scale-95"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export function HotelWebsiteBuilderTestimonialsSection() {
  return (
    <section  data-nav-theme="light" className="w-full bg-white pt-[20px] pb-[50px] md:py-[85px] overflow-hidden">
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

      <div className="mt-[81px] md:mt-[51px] w-full hidden md:block">
        <Marquee
          className="w-full py-4"
          items={testimonials}
          getKey={(item) => item.id}
          durationSeconds={110}
          pauseOnHover={true}
          edgeFade
          mdGapPx={34}
          gapPx={8}
          backgroundColor="transparent"
          renderItem={(testimonial) => (
            <HotelWebsiteBuilderTestimonialCard
              testimonial={testimonial}
              className="w-[320px] md:w-[530px]"
            />
          )}
        />
      </div>
      
      <HotelWebsiteBuilderTestimonialsMobileCarousel items={testimonials} />
    </section>
  )
}
