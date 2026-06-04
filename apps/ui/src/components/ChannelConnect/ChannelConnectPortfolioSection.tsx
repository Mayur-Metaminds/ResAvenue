"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import Image from "next/image"
import { useRef, useState, useSyncExternalStore } from "react"

// Sticky-scroll behaviour only makes sense at lg+ where the side-by-side
// (mobile + cards) layout fits in one viewport. On smaller screens the section
// renders as normal flow and all card subtitles are visible.
const LG_MQ = "(min-width: 1024px)"
const subscribeToLg = (cb: () => void) => {
  const mq = window.matchMedia(LG_MQ)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}
const getLgSnapshot = () => window.matchMedia(LG_MQ).matches
const getLgServerSnapshot = () => false

import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { PortfolioIcon1, PortfolioIcon2, PortfolioIcon3 } from "../../../public/svg/Channel-Connect"
import { CheckedIcon } from "../../../public/svg/commonSvg"

const PORTFOLIO_GRADIENT =
  "radial-gradient(100% 100% at 100% 0%, #ED852E 0%, #1A2F6D 50%, #010E38 100%)"

const portfolioCards = [
  {
    icon: <PortfolioIcon1 className="h-5 w-5 text-white/80" />,
    title: "Instant Booking Alerts",
    subtitle:
      "Get push notifications the moment a booking lands across any of your connected channels.",
  },
  {
    icon: <PortfolioIcon2 className="h-5 w-5 text-white/80" />,
    title: "Quick Rate Override",
    subtitle: "Adjust pricing instantly to respond to last-minute demand changes.",
  },
  {
    icon: <PortfolioIcon3 className="h-5 w-5 text-white/80" />,
    title: "Discounts & Promotions",
    subtitle:
      "Roll out time-limited offers and promo codes from anywhere you are.",
  },
]

// Slide-in-from-left reveal used by both the Block-1 FeatureShowcase cards
// and the Block-2 CheckedRow list. Triggered once when the item is 50% in
// view, with a per-index delay so the list feels like it cascades in.
const slideInFromLeft = (i: number) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.12 },
})

export function ChannelConnectPortfolioSection() {
  // Block 1 (Control Your Portfolio): on lg+ the panel pins for
  // `cards.length × 100vh` of page scroll and reveals one card's subtitle at
  // a time. On mobile the panel flows normally and every card stays expanded.
  const block1Ref = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isLgUp = useSyncExternalStore(
    subscribeToLg,
    getLgSnapshot,
    getLgServerSnapshot
  )

  const { scrollYProgress } = useScroll({
    target: block1Ref,
    offset: ["start start", "end end"],
  })
  const indexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, portfolioCards.length - 1]
  )
  useMotionValueEvent(indexMotion, "change", (latest) => {
    const next = Math.max(
      0,
      Math.min(portfolioCards.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  return (
    <section data-nav-theme="light" className="w-full bg-white pt-[80px]">
      {/* One shared gradient card holds both blocks. `overflow-hidden` is
          OMITTED here because it would break the sticky positioning inside
          Block 1; the rounded-[45px] visually clips fine for padded content. */}
      <div
        className="flex flex-col gap-[32px] rounded-[45px]"
        style={{ background: PORTFOLIO_GRADIENT }}
      >
        {/* Block 1 — Sticky-scroll on lg+, normal flow on mobile. The tall
            outer (`lg:h-[300vh]`) only pins on desktop where the side-by-side
            content fits in a single viewport. */}
        <div ref={block1Ref} className="relative lg:h-[300vh]">
          <div className="lg:sticky lg:top-20 lg:flex lg:h-[calc(100dvh-5rem)] w-full lg:items-center">
            <div className="w-full">
              <div className="relative p-[20px] md:p-16 lg:px-24 lg:pt-24 lg:pb-16">
                <div className="relative z-10">
                  <FeatureShowcase
                    imagePosition="left"
                    header={{
                      className: "mb-[24px]",
                      eyebrow: "PORTFOLIO CONTROL, SIMPLIFIED",
                      eyebrowColor: "#FFF",
                      eyebrowClassName: "mb-0",
                      eyebrowDotColor: "#FFF",
                      title: "Control Your Portfolio\nOn the Go",
                      titleClassName: "mb-0",
                      titleHighlight: "Control Your Portfolio",
                      titleColor: "#F9F9F9",
                      highlightGradient: "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                      description: (
                        <span className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                          Never miss a critical update. Our premium mobile application
                          gives revenue managers real-time alerts and &quot;One-Touch&quot; rate
                          overriding capabilities.
                        </span>
                      ),
                    }}
                    imageSlot={
                      <div className="hidden lg:flex justify-center w-full">
                        <div className="relative flex aspect-[3/4] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[32px] border border-slate-700 bg-slate-800 shadow-2xl">
                          <Image
                            src="/images/Channel-Connect/Hero-img.png"
                            alt="Mobile App"
                            fill
                            className="object-cover opacity-80"
                          />
                        </div>
                      </div>
                    }
                  >
                    <div className="flex lg:hidden justify-center w-full mb-6 mt-4">
                      <div className="relative flex aspect-[3/4] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[32px] border border-slate-700 bg-slate-800 shadow-2xl">
                        <Image
                          src="/images/Channel-Connect/Hero-img.png"
                          alt="Mobile App"
                          fill
                          className="object-cover opacity-80"
                        />
                      </div>
                    </div>
                    {portfolioCards.map((card, i) => (
                      <FeatureShowcase.Card
                        key={card.title}
                        variant="dark"
                        icon={card.icon}
                        title={card.title}
                        subtitle={card.subtitle}
                        // On mobile we pass `undefined` so the dark-variant
                        // collapse logic doesn't fire — every card stays
                        // expanded since there's no scroll-driven progression.
                        isActive={isLgUp ? activeIndex === i : undefined}
                      />
                    ))}
                  </FeatureShowcase>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2 — Normal flow with slide-in-from-left CheckedRows. */}
        <div className="relative p-[20px] md:p-16 lg:px-24 lg:pt-16 lg:pb-24">
            <div className="relative z-10">
              <FeatureShowcase
                imagePosition="left"
                header={{
                  className: "mb-[24px]",
                  eyebrowDotColor: "#FFF",
                  eyebrowClassName: "mb-0",
                  titleClassName: "mb-0",
                  eyebrow: "BUILT FOR DATA-DRIVEN DECISIONS",
                  eyebrowColor: "#FFF",
                  title: "Decisions Driven by\nData, Not Guesswork",
                  titleHighlight: "Decisions Driven by",
                  highlightGradient: "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                  titleColor: "#F5F4F0",
                  description: (
                    <span className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                      Our advanced analytics suite breaks down your revenue performance by
                      channel, region, and segment in real time.
                    </span>
                  ),
                }}
                imageSlot={
                  <div className="hidden lg:flex justify-center w-full lg:justify-end">
                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] border border-slate-700 bg-slate-800 shadow-2xl">
                      <Image
                        src="/images/Channel-Connect/Hero-img.png"
                        alt="Dashboard Dummy"
                        fill
                        className="object-cover opacity-80"
                      />
                    </div>
                  </div>
                }
              >
                <div className="flex lg:hidden justify-center w-full mb-6 mt-4">
                  <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] border border-slate-700 bg-slate-800 shadow-2xl">
                    <Image
                      src="/images/Channel-Connect/Hero-img.png"
                      alt="Dashboard Dummy"
                      fill
                      className="object-cover opacity-80"
                    />
                  </div>
                </div>
                <motion.div {...slideInFromLeft(0)}>
                  <CheckedRow text="Track booking sources and identify top-performing channels." />
                </motion.div>
                <motion.div {...slideInFromLeft(1)}>
                  <CheckedRow text="Monitor revenue, occupancy, and key metrics in real-time." />
                </motion.div>
                <motion.div {...slideInFromLeft(2)}>
                  <CheckedRow text="Maintain consistent pricing across all OTAs." />
                </motion.div>
                <motion.div {...slideInFromLeft(3)}>
                  <CheckedRow text="Benchmark rates and stay ahead of the market." />
                </motion.div>
              </FeatureShowcase>
            </div>
          </div>
      </div>
    </section>
  )
}

function CheckedRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-[16px]">
      <CheckedIcon className="h-[20px] w-[20px] shrink-0" />
      <p className="font-source-sans-400 text-[16px] leading-[24px] text-white/80">
        {text}
      </p>
    </div>
  )
}