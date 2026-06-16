"use client"

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import Image from "next/image"
import { useRef, useState } from "react"

import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { PortfolioIcon1, PortfolioIcon2, PortfolioIcon3 } from "../../../public/svg/Channel-Connect"

const portfolioCards = [
  {
    icon: <PortfolioIcon1 className="h-5 w-5 text-[#010C28]" />,
    title: "Instant Booking Alerts",
    subtitle:
      "Get push notifications the moment a booking lands across any of your connected channels.",
  },
  {
    icon: <PortfolioIcon2 className="h-5 w-5 text-[#010C28]" />,
    title: "Quick Rate Override",
    subtitle: "Adjust pricing instantly to respond to last-minute demand changes.",
  },
  {
    icon: <PortfolioIcon3 className="h-5 w-5 text-[#010C28]" />,
    title: "Discounts & Promotions",
    subtitle:
      "Roll out time-limited offers and promo codes from anywhere you are.",
  },
]

export function ChannelConnectMobileAppSection() {
  const block1Ref = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

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
    <section data-nav-theme="light" className="w-full bg-white ">
      <div
        className="flex flex-col gap-[32px] rounded-[45px] bg-white max-sm:pb-30"
      >
        {/* Scroll-driven sticky reveal at all breakpoints. Note: below lg the
            single-column stack can exceed the pinned viewport height on short
            screens, clipping the bottom card. */}
        <div ref={block1Ref} className="relative h-[300vh]">
          <div className="sticky top-20 flex h-[calc(100dvh-5rem)] w-full items-start lg:items-center">
            <div className="w-full">
              <div className="relative p-[12px] md:px-16 lg:px-24 lg:pb-16">
                <div className="relative z-10">
                  <FeatureShowcase
                    imagePosition="left"
                    header={{
                      className: "mb-[16px] lg:mb-[24px]",
                      eyebrow: "PORTFOLIO CONTROL, SIMPLIFIED",
                      eyebrowColor: "#ED862E",
                      eyebrowClassName: "mb-0",
                      eyebrowDotColor: "#ED862E",
                      title: "Control Your Portfolio\nOn the Go",
                      titleClassName: "mb-0",
                      titleHighlight: "Control Your Portfolio",
                      titleColor: "#010C28",
                      highlightGradient: "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                      description: (
                        <span className="hidden lg:block font-source-sans-400 text-[16px] leading-[26px] text-[#475569]">
                          Never miss a critical update. Our premium mobile application
                          gives revenue managers real-time alerts and &quot;One-Touch&quot; rate
                          overriding capabilities.
                        </span>
                      ),
                    }}
                    imageSlot={
                      <div className="hidden lg:flex justify-center w-full">
                        <div className="relative flex aspect-[3/4] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
                          <Image
                            src="/images/Channel-Connect/Hero-img.png"
                            alt="Mobile App"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    }
                  >
                    {/* Phone image hidden below lg so the header + all 3 cards
                        fit within the pinned viewport (otherwise the 3rd tab
                        falls below the fold). Shown again at lg+. */}
                    <div className="hidden justify-center w-full mb-3 mt-1">
                      <div className="relative flex aspect-[3/4] w-[120px] md:w-[180px] items-center justify-center overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-xl">
                        <Image
                          src="/images/Channel-Connect/Hero-img.png"
                          alt="Mobile App"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {portfolioCards.map((card, i) => (
                      <FeatureShowcase.Card
                        key={card.title}
                        variant="light"
                        icon={card.icon}
                        title={card.title}
                        subtitle={card.subtitle}
                        isActive={activeIndex === i}
                      />
                    ))}
                  </FeatureShowcase>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
