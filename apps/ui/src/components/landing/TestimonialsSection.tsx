"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { CountUp } from "@/components/common/CountUp"
import { Marquee } from "@/components/common/Marquee"
import { cn } from "@/lib/styles"

import { SectionHeader } from "./SectionHeader"

const testimonials = [
  {
    quote:
      "The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.The PMS and Channel Manager working together is a game-changer. Our team saves 3 hours daily. Revenue management insights transformed our pricing strategy.",
    name: "John Doe",
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

type Testimonial = (typeof testimonials)[number]

/** Single testimonial card. Width is controlled by the parent via `className`
 *  (fixed widths in the desktop marquee, full-width in the mobile carousel). */
function TestimonialCard({
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
        "flex h-[199px] flex-col justify-between rounded-[24px] border-[1.266px] border-white/[0.06] bg-white/[0.04] px-[20px] py-[20px] backdrop-blur-[6px] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.08] md:h-[265px] md:px-[24px] md:py-[24px]",
        active && "border-[#ED862E]/40 bg-white/[0.1]",
        onClick && "cursor-pointer",
        className
      )}
    >
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
          <div className="mt-0.5 text-xs text-gray-500">{testimonial.title}</div>
        </div>
      </div>
    </div>
  )
}

/** Mobile-only testimonials carousel: autoplays through cards on a seamless
 *  infinite loop, pauses the moment the user taps a card / uses the controls,
 *  and keeps their selection active (autoplay never overrides it again until
 *  the page reloads).
 *
 *  Infinite loop: the track renders a clone of the last slide before the first
 *  and a clone of the first after the last. Positions run 0..count+1 over this
 *  extended track (1..count are the real slides). When the animation lands on a
 *  clone we snap — with transitions disabled — to the matching real slide, so
 *  there's never a visible "rewind". */
function TestimonialsMobileCarousel({ items }: { items: Testimonial[] }) {
  const count = items.length
  // Position over the extended track: 0 = clone(last), 1..count = real, count+1 = clone(first).
  const [pos, setPos] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  // While snapping from a clone back to its real slide, transitions are off so
  // the jump is invisible.
  const [snapping, setSnapping] = useState(false)
  // Autoplay only runs while the carousel is on-screen AND the tab is visible.
  // Off-screen / backgrounded, CSS transitions and rAF (which drive the seamless
  // snap-back) are throttled, so `pos` could otherwise drift past the clones and
  // leave a blank slide showing.
  const [active, setActive] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)

  const extended: Testimonial[] =
    count > 1 ? [items[count - 1]!, ...items, items[0]!] : items

  // Track whether the carousel is on-screen (IntersectionObserver) and the tab
  // is visible (Page Visibility) — autoplay is gated on both.
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

  // Autoplay — advance one card every 4s while active and not user-paused.
  // Flipping any gate tears down the interval on the same commit.
  useEffect(() => {
    if (isPaused || !active || count <= 1) return
    const id = setInterval(() => setPos((p) => p + 1), 4000)

    return () => clearInterval(id)
  }, [isPaused, active, count])

  // Re-enable transitions one frame after a silent snap, by which point the
  // browser has committed the no-transition jump — so nothing animates.
  useEffect(() => {
    if (!snapping) return
    const raf = requestAnimationFrame(() => setSnapping(false))

    return () => cancelAnimationFrame(raf)
  }, [snapping])

  // Safety net: if `pos` ever lands beyond the extended track (e.g. a snap was
  // missed while backgrounded), wrap it to the matching real slide with no
  // animation — guaranteeing a valid slide is always on screen.
  useEffect(() => {
    if (count <= 1) return
    if (pos > count + 1 || pos < 0) {
      setSnapping(true)
      setPos((((pos - 1) % count) + count) % count + 1)
    }
  }, [pos, count])

  // When the slide animation finishes on a clone, jump silently to the real one.
  // `>=` / `<=` (not `===`) so an overshoot still resolves to a real slide.
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
      className="mt-12 w-full md:hidden"
      role="group"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="overflow-hidden px-1">
        <div
          className="flex"
          style={{
            // 88% slide width → ~12% of the next card peeks on the right. The
            // track step must match the slide width, so translate by pos * 88%.
            transform: `translateX(-${pos * 88}%)`,
            transition: snapping ? "none" : "transform 500ms ease-out",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extended.map((testimonial, idx) => (
            <div
              key={idx}
              className="w-[88%] shrink-0 px-1"
              aria-hidden={idx !== pos}
            >
              <TestimonialCard
                testimonial={testimonial}
                active={idx === pos}
                onClick={() => setIsPaused(true)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls — Prev / Next */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 active:scale-95"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full rounded-t-[40px] flex-col items-center justify-center overflow-hidden bg-[#010C28] py-24 lg:py-32"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(1, 12, 40, 0.00) 0%, #010C28 100%), url('/images/testimonial-bg-image.png') top center / 100% auto no-repeat`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px]">
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

        {/* Desktop / tablet (md+): auto-scrolling marquee, pauses on card hover. */}
        <Marquee
          className="relative left-1/2 mt-16 -ml-[50vw] hidden w-[100vw] md:block"
          items={testimonials}
          durationSeconds={60}
          pauseOnHover
          edgeFade
          gapPx={24}
          ariaLabel="Customer testimonials"
          getKey={(_, idx) => idx}
          renderItem={(testimonial) => (
            <TestimonialCard
              testimonial={testimonial}
              className="w-[325px] md:w-[456px]"
            />
          )}
        />

        {/* Mobile (<md): tappable carousel — tap a card to pause autoplay and
            keep it active; use the prev/next buttons or dots to navigate. */}
        <TestimonialsMobileCarousel items={testimonials} />

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
              className="flex flex-col items-start justify-start rounded-[20px] border border-white/5 bg-[#071330]/80 p-3 lg:p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-[#ED862C] hover:bg-[#071330]"
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
