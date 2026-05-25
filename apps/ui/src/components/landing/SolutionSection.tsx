"use client"
import type * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import Lottie from "lottie-react"
import animationData from "../../../public/assets/animation.json"
import { HeroTitle } from "./HeroTitle"

export function SolutionSection() {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-[24px] md:px-8"
    >
      <div className="container mx-auto flex max-w-5xl flex-col items-center text-center">
        {/* Eyebrow */}
        <Eyebrow
          className="mb-[16px] lg:mb-[24px]"
          style={
            {
              "--eyebrow-color": "#E47724",
              "--eyebrow-dot-color": "#E47724",
            } as React.CSSProperties
          }
        >
          OUR SOLUTION
        </Eyebrow>

        {/* Title */}
        <HeroTitle
          className="mb-[34px] max-w-4xl lg:mb-[84px]"
          style={{ "--hero-title-color": "#010C28" } as React.CSSProperties}
        >
          Hotels run on disparate systems.
          <br className="hidden md:block" />
          <HeroTitle.Highlight
            style={
              {
                "--hero-title-gradient":
                  "linear-gradient(90deg, #010C28 0%, #E47724 100%)",
              } as React.CSSProperties
            }
          >
            {" "}
            Yours doesn&apos;t have to.
          </HeroTitle.Highlight>
        </HeroTitle>

        {/* Animation Box / Horizontal Lines */}
        <div className="relative mb-[34px] flex h-[300px] w-full items-center justify-center overflow-hidden md:h-[500px]">
          {/* Horizontal Lines Background */}

          {/* GIF Mockup */}
          <div className="relative z-10 h-[90%] w-[90%]">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Description */}
        <p className="typo-body1 max-w-3xl leading-relaxed text-[#414E62]">
          Managing bookings, channels, operations, and revenue across
          disconnected systems leads to lost revenue, overbookings, and poor
          guest experiences. ResAvenue unifies everything.
        </p>
      </div>
    </section>
  )
}
