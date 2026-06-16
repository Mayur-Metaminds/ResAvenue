"use client"
import type * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import Lottie from "lottie-react"
import animationData from "../../../public/assets/landing/pilles_animation.json"
import { HeroTitle } from "./HeroTitle"

export function SolutionSection() {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white py-[61px]"
    >
      <div className="container mx-auto flex lg:max-w-5xl flex-col items-center text-center px-2 lg:px-4 md:px-8">
        {/* Eyebrow */}
        <Eyebrow
          className="mb-[12px]"
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
      </div>

      {/* Animation Box / Horizontal Lines */}
      <div className="relative mx-auto mb-[34px] mt-[34px] flex h-[200px] w-full items-center justify-center overflow-hidden md:container md:h-[340px] md:px-8 lg:max-w-5xl lg:px-4">
        {/* GIF Mockup — `slice` makes the Lottie cover its container by
            zooming in, hiding the built-in canvas padding around the pills. */}
        <div className="relative z-10 h-[90%] w-[90%] md:h-[90%] md:w-[90%]">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="container mx-auto flex lg:max-w-5xl flex-col items-center text-center px-2 lg:px-4 md:px-8">
        {/* Description */}
        <p className="typo-body1 max-w-3xl text-[#64748B]">
          Managing bookings, channels, operations, and revenue across
          disconnected systems leads to lost revenue, overbookings, and poor
          guest experiences. ResAvenue unifies everything.
        </p>
      </div>
    </section>
  )
}
