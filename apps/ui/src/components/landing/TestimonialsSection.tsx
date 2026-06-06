"use client"

import { CountUp } from "@/components/common/CountUp"
import { Marquee } from "@/components/common/Marquee"

import { SectionHeader } from "./SectionHeader"

const testimonials = [
  {
    quote:
      "The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "SUNITA PATEL",
    title: "Revenue Director - Coastal Escapes",
    initials: "SP",
    colorClass: "bg-blue-500/20 text-blue-400",
  },
  {
    quote:
      "We moved from 5 disconnected tools to one platform. Booking engine conversion doubled, and we manage 12 properties from a single dashboard. The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "ARJUN MEHTA",
    title: "CEO - Urban Stay Apartments",
    initials: "AM",
    colorClass: "bg-emerald-500/20 text-emerald-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
  {
    quote:
      "Event management module is flawless. 300+ tickets sold with QR check-in. Analytics help us understand delegates better.The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "VIKRAM TANDON",
    title: "Events Head - Grand Conventions",
    initials: "VT",
    colorClass: "bg-purple-500/20 text-purple-400",
  },
]

const stats: Array<{
  target: number
  suffix: string
  format?: (n: number) => string
  label: string
}> = [
  {
    target: 30,
    suffix: "%",
    label: "Average Increase in Direct Bookings",
  },
  {
    target: 3500,
    suffix: "+",
    format: (n) => Math.round(n).toLocaleString(),
    label: "Hotels Powered Across the Globe",
  },
  {
    target: 25,
    suffix: "M+",
    label: "Room Nights Managed Annually",
  },
  {
    target: 22,
    suffix: "+",
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
  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full rounded-[40px] flex-col items-center justify-center overflow-hidden bg-[#010C28] py-24 lg:py-32"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(1, 12, 40, 0.00) 0%, #010C28 100%), url('/images/testimonial-bg-image.png') top center / 100% auto no-repeat`,
        }}
      />

      <div className="relative z-10 mx-auto w-full px-[16px] lg:px-[80px]">
        {/* Testimonials Header */}
        <div className="flex flex-col items-center text-center">
          <SectionHeader
            eyebrow="TESTIMONIAL"
            eyebrowDotColor="#FFF"
            eyebrowColor="#FFF"
            titleColor="#FFFFFF"
            highlightGradient="linear-gradient(90deg, #ED862E 0%, #ED862E 100%)"
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

          <div className="mt-8 flex flex-col items-center gap-4 ">
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

        {/* Testimonials Marquee — auto-scrolls, pauses on card hover */}
        <Marquee
          className="relative left-1/2 mt-16 -ml-[50vw] w-[100vw]"
          items={testimonials}
          durationSeconds={60}
          pauseOnHover
          edgeFade
          gapPx={24}
          ariaLabel="Customer testimonials"
          getKey={(_, idx) => idx}
          renderItem={(testimonial) => (
            <div className="flex h-[199px] justify-between w-[325px] flex-col  rounded-[24px] border-[1.266px] border-white/[0.06] bg-white/[0.06] px-[20px] py-[20px] backdrop-blur-[6px] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08] md:h-[265px] md:w-[456px] md:px-[24px] md:py-[24px]">
              <p className="line-clamp-4 text-[13px] leading-relaxed font-light text-white/60 md:line-clamp-5 md:text-[15px]">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${testimonial.colorClass}`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-[16px] font-medium text-white">
                    {testimonial.name}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        {/* Separator / Spacer */}
        <SectionHeader
          className="mt-32 mb-12"
          eyebrow="BY THE NUMBERS"
          eyebrowColor="#FFF"
          eyebrowDotColor="#FFF"
          titleColor="#FFFFFF"
          highlightGradient="linear-gradient(90deg, #ED862E 0%, #ED862E 100%)"
          title={
            <>
              Proven <SectionHeader.Highlight>Results</SectionHeader.Highlight>{" "}
              at Scale
            </>
          }
        />

        {/* Stats Grid */}
        <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-start rounded-[20px] border border-white/5 bg-[#071330]/80 p-3 lg:p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-[#071330]"
            >
              <div className="mb-3 text-[40px] font-medium tracking-tight text-white xl:text-[65px]">
                <CountUp
                  target={stat.target}
                  suffix={stat.suffix}
                  format={stat.format}
                />
              </div>
              <div
                className="mb-4 h-[3px] w-[72px]"
                style={{
                  background:
                    "linear-gradient(90deg, #ED862E 0%, #1A4F71 100%)",
                  borderRadius: "2.323px",
                }}
              />
              <p className="text-[16px] xl:text-[18px] leading-relaxed text-[#8BA0B2]">
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
