import type React from "react"

import { ArrowRight } from "lucide-react"

import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"

function PropertyManagementHero() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="relative z-10 flex w-full flex-1 flex-col px-[15px] pt-[106px] lg:px-20">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-between gap-8 pb-8 md:gap-12 lg:flex-row lg:justify-evenly lg:gap-15 lg:pb-0">
          {/* Left Column: Content */}
          <div className="my-auto flex w-full flex-col justify-center lg:w-[50%] lg:py-20 xl:w-[45%]">
            <HeroContent
              className="lg:w-[499px]"
              eyebrow="ONE PLATFORM. TOTAL CONTROL. BETTER REVENUE."
              eyebrowColor="#fff"
              title={
                <HeroTitle
                  style={
                    {
                      "--hero-title-color": "#FFFFFF",
                      "--hero-title-gradient":
                        "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                    } as React.CSSProperties
                  }
                >
                  Run Your Entire Hotel From{" "}
                  <HeroTitle.Highlight>One Powerful Platform</HeroTitle.Highlight>
                </HeroTitle>
              }
              description={
                <span className="typo-body1 text-white/65 lg:w-129">
                  Your front desk, bookings, payments, housekeeping, and revenue—all
                  unified into one intelligent system.
                  <br />
                  Drive more direct bookings. Eliminate operational chaos. Deliver
                  seamless guest experiences at scale.
                </span>
              }
              actions={[
                <button
                  key="demo"
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ED862E] px-8 py-3.5 font-medium text-white shadow-[0_8px_24px_rgba(237,134,46,0.45)] transition-transform hover:scale-105 hover:bg-[#d97726] lg:text-[15px]"
                >
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </button>,
                <button
                  key="sales"
                  type="button"
                  className="rounded-full border border-white/10 bg-[#1C2C47]/60 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#1C2C47]/80 lg:text-[15px]"
                >
                  <span className="lg:hidden">Explore Products</span>
                  <span className="hidden lg:inline">Talk to Sales</span>
                </button>,
              ]}
            />
          </div>

          {/* Right Column: mockup (dummy placeholder — swap with the real asset) */}
          <div className="w-full min-w-0 flex-1 self-center lg:pt-15">
            <div className="mx-auto aspect-square w-full max-w-[420px] rounded-3xl bg-white/5" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyManagementHero
