"use client"

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef, useState } from "react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { CONTROL_YOUR_PORTFOLIO_URL } from "@/lib/lottie-urls"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { PortfolioIcon1, PortfolioIcon2, PortfolioIcon3 } from "../../../public/svg/Channel-Connect"

const portfolioHeader = {
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
}

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
    <section data-nav-theme="light" className="w-full bg-white my-[50px] lg:my-[60px]">
      <div
        className="flex flex-col gap-[32px] rounded-[45px] bg-white"
      >
        {/* Scroll-driven sticky reveal. Below lg: top-anchored flex so the
            Lottie isn't clipped. lg+: original centered sticky pane. */}
        <div ref={block1Ref} className="relative h-[200vh] lg:h-[300vh]">
          {/* On mobile the eyebrow + title scroll out of view before the pin
              engages, freeing the pinned viewport for the phone image + cards.
              Hidden at lg+, where the header renders inside FeatureShowcase. */}
          <div className="px-[12px] pt-[8px] pb-[20px] md:px-16 lg:hidden">
            <SectionHeader
              {...portfolioHeader}
              className="items-start gap-[12px] text-left"
            />
          </div>
          <div className="sticky top-20 flex h-[calc(100svh-80px)] w-full overflow-hidden max-lg:flex-col lg:items-center lg:justify-center">
            <div className="w-full max-lg:flex max-lg:h-full max-lg:min-h-0 max-lg:flex-col">
              <div className="relative p-[12px] pb-4 md:px-16 md:pb-6 lg:px-24 lg:pb-16 3xl:mx-auto 3xl:w-full 3xl:max-w-300 max-lg:flex max-lg:min-h-0 max-lg:flex-1 max-lg:flex-col max-lg:justify-start">
                <div className="relative z-10 max-lg:flex max-lg:min-h-0 max-lg:flex-1 max-lg:flex-col">
                  <FeatureShowcase
                    className="max-lg:min-h-0 max-lg:flex-1 max-lg:items-stretch"
                    childrenClassName="max-lg:min-h-0 max-lg:flex-1"
                    imagePosition="left"
                    imageClassName="hidden lg:flex"
                    header={{
                      ...portfolioHeader,
                      className: "hidden lg:flex mb-[16px] lg:mb-[24px]",
                    }}
                    imageSlot={
                      <div className="hidden lg:flex justify-center w-full">
                        <div className="relative w-full  overflow-hidden rounded-[24px]">
                          <LazyLottie
                            src={CONTROL_YOUR_PORTFOLIO_URL}
                            priority="lazy"
                            loop
                            className="h-full w-full"
                            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                          />
                        </div>
                      </div>
                    }
                  >
                    <div className="flex flex-col gap-4 max-lg:min-h-0 max-lg:flex-1">
                      {/* Portfolio animation shown below lg (above the cards)
                          since the desktop imageSlot is hidden on mobile. Hidden
                          at lg+ where imageSlot renders the visual on the left.
                          Height is capped with svh so phones + cards fit inside
                          the sticky viewport without clipping either. */}
                      <div className="relative mx-auto mt-0 h-[clamp(140px,28svh,280px)] w-full max-w-[520px] shrink-0 lg:hidden">
                        <LazyLottie
                          src={CONTROL_YOUR_PORTFOLIO_URL}
                          priority="lazy"
                          loop
                          showSkeleton={false}
                          className="h-full w-full"
                          lottieClassName="h-full! w-full!"
                          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                        />
                      </div>
                      <div className="flex flex-col gap-4 max-lg:min-h-0 max-lg:flex-1 max-lg:justify-center">
                        {portfolioCards.map((card, i) => (
                          <FeatureShowcase.Card
                            key={card.title}
                            variant="light"
                            icon={card.icon}
                            title={card.title}
                            subtitle={card.subtitle}
                            isActive={activeIndex === i}
                            activeEffect
                          />
                        ))}
                      </div>
                    </div>
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
