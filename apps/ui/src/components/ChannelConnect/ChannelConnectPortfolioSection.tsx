"use client"

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef, useState, useSyncExternalStore } from "react"

import { CHANNEL_CONNECT_DATA_DRIVEN_URL } from "@/lib/lottie-urls"
import { LazyLottie } from "@/components/common/LazyLottie"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { CheckedIcon } from "../../../public/svg/commonSvg"

const PORTFOLIO_GRADIENT =
  "radial-gradient(100% 100% at 100% 0%, #ED852E 0%, #1A2F6D 50%, #010E38 100%)"



// Slide-in-from-left reveal used by both the Block-1 FeatureShowcase cards
// and the Block-2 CheckedRow list. Triggered once when the item is 50% in
// view, with a per-index delay so the list feels like it cascades in.
const slideInFromLeft = (i: number) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.2 },
})

export function ChannelConnectPortfolioSection() {
  return (
    <section data-nav-theme="dark" className="w-full bg-white pt-[32px] lg:pt-[80px]">
      {/* One shared gradient card holds both blocks. `overflow-hidden` is
          OMITTED here because it would break the sticky positioning inside
          Block 1; the rounded-[45px] visually clips fine for padded content. */}
      <div
        className="flex flex-col gap-[32px] rounded-[45px]"
        style={{ background: PORTFOLIO_GRADIENT }}
      >
        {/* Block 2 — Normal flow with slide-in-from-left CheckedRows. */}
        <div className="relative py-[40px]  px-[20px] md:p-16 lg:px-24 lg:pt-16 lg:pb-24 3xl:mx-auto 3xl:w-full 3xl:max-w-300">
          <div className="relative z-10">
            <FeatureShowcase
              imagePosition="left"
              // The desktop image lives in `imageSlot` (hidden on mobile); the
              // mobile image is rendered inside `children` instead. Hide the
              // whole image column on mobile so the grid doesn't keep an empty
              // second row + its `gap-10`, which left ~40px of dead gradient
              // space below the bullets.
              imageClassName="hidden lg:flex"
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
                  <LazyLottie
                    src={CHANNEL_CONNECT_DATA_DRIVEN_URL}
                    priority="lazy"
                    loop
                    className="h-full w-full"
                    rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                  />
                </div>
              }
            >
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
              <div className="mt-6 flex w-full justify-center lg:hidden">
                <LazyLottie
                  src={CHANNEL_CONNECT_DATA_DRIVEN_URL}
                  priority="lazy"
                  loop
                  className="h-full w-full"
                  rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                />
              </div>
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