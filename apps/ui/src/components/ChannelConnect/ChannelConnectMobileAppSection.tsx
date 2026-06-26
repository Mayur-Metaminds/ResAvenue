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
    <section data-nav-theme="light" className="w-full bg-white mt-[50px]">
      <div
        className="flex flex-col gap-[32px] rounded-[45px] bg-white"
      >
        {/* Scroll-driven sticky reveal at all breakpoints. The sticky pane is a
            fixed height (viewport minus the nav) that centers its content, so it
            never grows as the active card expands on scroll. On very short
            screens the stack can still exceed that height — overflow-hidden
            clips it rather than letting the pane grow. */}
        <div ref={block1Ref} className="relative h-[200vh] lg:h-[300vh]">
          {/* On mobile the eyebrow + title scroll out of view before the pin
              engages, freeing the pinned viewport for the phone image + cards.
              Hidden at lg+, where the header renders inside FeatureShowcase. */}
          <div className="px-[12px] pt-[8px] pb-[20px] lg:hidden">
            <SectionHeader
              {...portfolioHeader}
              className="items-start gap-[12px] text-left"
            />
          </div>
          <div className="sticky top-20 flex w-full h-[calc(100svh-80px)] items-center justify-center overflow-hidden">
            <div className="w-full">
              <div className="relative p-[12px] pb-[56px] md:px-16 lg:px-24 lg:pb-16 3xl:mx-auto 3xl:w-full 3xl:max-w-300">
                <div className="relative z-10">
                  <FeatureShowcase
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
                    {/* Portfolio animation shown below lg (above the cards)
                        since the desktop imageSlot is hidden on mobile. Hidden
                        at lg+ where imageSlot renders the visual on the left. */}
                    <div className="flex lg:hidden justify-center w-full mb-2 mt-0">
                      <div className="relative w-full max-w-[520px] aspect-[1468/695] overflow-hidden rounded-[20px]">
                        <LazyLottie
                          src={CONTROL_YOUR_PORTFOLIO_URL}
                          priority="lazy"
                          loop
                          className="h-full w-full"
                          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
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
                        activeEffect
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
