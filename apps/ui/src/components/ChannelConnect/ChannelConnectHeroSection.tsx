"use client"

import { ArrowRight } from "lucide-react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"
import { preloadLottie } from "@/lib/lottie-preload"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

import {
  ChannelSyncIcon,
  RevenueGrowthIcon,
} from "../../../public/svg/Channel-Connect"

export function ChannelConnectHeroSection() {
  // Above the fold: warm the hero animation download before hydration.
  preloadLottie(CHANNEL_CONNECT_HERO_URL)

  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat justify-center"
      style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
    >
      {/* Container */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[20px] py-[106px] lg:flex-row lg:justify-between lg:px-20">
        {/* Left Column: Content */}
        <div className="relative z-10 flex w-full flex-1 flex-col items-start">
            <HeroContent
              eyebrow="INTUITIVE EXPERIENCE. FAST FLEXIBILITY."
              eyebrowClassName="typo-body2"
              title={
                <HeroTitle
                  className="max-sm:w-[250px]"
                  style={
                    {
                      "--hero-title-color": "#FFFFFF",
                      // Updated to match Figma specs exactly
                      "--hero-title-gradient": "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                    } as React.CSSProperties
                  }
                >
                  Master Your
                  <br />
                  <HeroTitle.Highlight>Global Distribution</HeroTitle.Highlight>
                </HeroTitle>
              }
              description={
                <span className="typo-body1 text-white/65">
                  Control Every Channel. Maximize Every Booking. Simplify hotel distribution with a centralized channel management solution built for speed, accuracy, and scale. Connects to 100+ channels directly worldwide. Instantly update rates and inventory across OTAs, GDS, and metasearch platforms while optimizing performance with real-time insights.
                </span>
              }

              actions={[
                <Button
                  key="demo"
                  variant="primary"
                  size="default"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="gap-[7.6px] pt-[8.5px] pr-[10.5px] pb-[8.5px] pl-[9.5px] font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] lg:pt-[14px] lg:pr-[39.16px] lg:pb-[16px] lg:pl-[28px] lg:text-[15px]"
                >
                  Start Your Journey
                </Button>,
              ]}
            />
          </div>

        {/* Right Column: Graphic/Dashboard Preview */}
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
            <div className="relative w-full max-w-[800px]">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/20 blur-[100px]" />

              {/* Main Dashboard Animation */}
              <div className="relative aspect-[1380/884] w-full overflow-hidden">
                <LazyLottie
                  src={CHANNEL_CONNECT_HERO_URL}
                  priority="eager"
                  loop
                  className="h-full w-full"
                  aria-label="Channel Connect Dashboard Preview"
                />
              </div>

            
            </div>
        </div>
      </div>
    </section>
  )
}
