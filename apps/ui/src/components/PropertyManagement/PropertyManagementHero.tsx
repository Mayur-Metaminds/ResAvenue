import type React from "react"

import { ArrowRight } from "lucide-react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

function PropertyManagementHero() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat justify-center"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[20px] py-[106px] lg:flex-row lg:justify-between lg:px-20">
        {/* Left Column: Content */}
        <div className="relative z-10 flex w-full flex-1 flex-col items-start">
            <HeroContent
              className="lg:w-[499px]"
              eyebrow="ONE PLATFORM. TOTAL CONTROL. BETTER REVENUE."
              eyebrowColor="#fff"
              eyebrowClassName="max-sm:w-[288px]"
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
                  <br className="hidden lg:block" /> Drive more direct bookings. Eliminate operational chaos. Deliver
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
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          <LazyLottie
            src={CHANNEL_CONNECT_HERO_URL}
            priority="lazy"
            loop
            className="h-full w-full max-w-2xl"
            aria-label="Property management animation"
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyManagementHero
