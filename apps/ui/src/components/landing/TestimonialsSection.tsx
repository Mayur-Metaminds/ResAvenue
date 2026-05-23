"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRef } from "react"

import { SectionHeader } from "./SectionHeader"

const testimonials = [
  {
    quote:
      "The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "SUNITA PATEL",
    title: "Revenue Director - Coastal Escapes",
    initials: "SP",
    colorClass: "bg-blue-500/20 text-blue-400",
  },
  {
    quote:
      "We moved from 5 disconnected tools to one platform. Booking engine conversion doubled, and we manage 12 properties from a single dashboard.",
    name: "ARJUN MEHTA",
    title: "CEO - Urban Stay Apartments",
    initials: "AM",
    colorClass: "bg-emerald-500/20 text-emerald-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
]

const stats = [
  {
    value: "34%",
    label: "Average increase in direct bookings",
  },
  {
    value: "2,500+",
    label: "Hotels powered across the globe",
  },
  {
    value: "40M+",
    label: "Room nights managed annually",
  },
  {
    value: "22+",
    label: "Countries with active properties",
  },
]

const avatars = [
  { color: "bg-orange-500", text: "HK" },
  { color: "bg-blue-500", text: "SP" },
  { color: "bg-emerald-500", text: "AM" },
  { color: "bg-purple-500", text: "VT" },
  { color: "bg-pink-500", text: "HK" },
  { color: "bg-cyan-500", text: "PJ" },
]

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" })
    }
  }

  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#010C28] py-24 lg:py-32"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 h-full w-full opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "url('/images/testimonial-bg-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Top Gradient to blend with previous section (assuming it's dark) */}
      <div className="absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-[#010C28] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-[#010C28] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="flex flex-col items-center text-center">
          <SectionHeader
            theme="dark"
            eyebrow="TESTIMONIAL"
            title={
              <>
                Built for{" "}
                <SectionHeader.Highlight>
                  hospitality leaders
                </SectionHeader.Highlight>{" "}
                who demand more from their technology.
              </>
            }
          />

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <span className="text-sm text-gray-400">Trusted by:</span>
            <div className="flex -space-x-2">
              {avatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#010C28] text-[9px] font-bold text-white ${avatar.color}`}
                >
                  {avatar.text}
                </div>
              ))}
            </div>
            <span className="text-xs tracking-wider text-gray-400 uppercase">
              Rakesh Kumar & 2,500+ Hoteliers
            </span>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative left-1/2 mt-16 -ml-[50vw] w-[100vw]">
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 lg:px-[max(2rem,calc(50vw-640px+2rem))]"
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="flex w-[85vw] shrink-0 snap-start flex-col rounded-[20px] border border-white/5 bg-[#0A1636]/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-[#0A1636] md:w-[400px]"
              >
                <p className="mb-10 flex-grow text-[15px] leading-relaxed font-light text-gray-300">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${testimonial.colorClass}`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {testimonial.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={scrollLeft}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollRight}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 focus:outline-none"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Separator / Spacer */}
        <SectionHeader
          className="mt-32 mb-12"
          theme="dark"
          eyebrow="BY THE NUMBERS"
          title={
            <>
              Proven <SectionHeader.Highlight>Results</SectionHeader.Highlight>{" "}
              at Scale
            </>
          }
        />

        {/* Stats Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-center rounded-[20px] border border-white/5 bg-[#071330]/80 p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-[#071330] lg:p-8"
            >
              <div className="mb-3 text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                {stat.value}
              </div>
              <div
                className="mb-4 h-[3px] w-[72px]"
                style={{
                  background:
                    "linear-gradient(90deg, #ED862E 0%, #1A4F71 100%)",
                  borderRadius: "2.323px",
                }}
              />
              <p className="text-[15px] leading-relaxed text-[#8BA0B2]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar Style Hack */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  )
}
