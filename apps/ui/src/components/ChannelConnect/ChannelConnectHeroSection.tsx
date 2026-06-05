import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"

import {
  ChannelSyncIcon,
  RevenueGrowthIcon,
} from "../../../public/svg/Channel-Connect"

export function ChannelConnectHeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden  bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
    >
      {/* Container */}
      <div className="relative mt-[165px] z-10 flex w-full flex-1 flex-col px-[15px] lg:px-20">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-start justify-between gap-12 pb-12 lg:flex-row lg:gap-8 lg:pb-0">
          {/* Left Column: Content */}
          <div className="flex w-full flex-col justify-start  lg:w-[50%] xl:w-[45%]">
            <HeroContent
              eyebrow="INTUITIVE EXPERIENCE. FAST FLEXIBILITY."
              title={
                <HeroTitle
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
                <span className="typo-body1 text-white/55">
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
          <div className="relative flex w-full items-center justify-center lg:w-[50%] xl:w-[55%]">
            <div className="relative w-full max-w-[800px]">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/20 blur-[100px]" />

              {/* Main Dashboard Image */}
              <div className="relative overflow-hidden ">
                <Image
                  src="/images/Channel-Connect/Hero-img.png"
                  alt="Channel Connect Dashboard Preview"
                  width={1918}
                  height={1934}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Floating Element 1 (Top Right) */}
              <div className="animate-in fade-in slide-in-from-right-8 fill-mode-both absolute top-8 -right-4 flex items-center gap-3 rounded-full border border-slate-100 bg-white py-2.5 pr-5 pl-2.5 shadow-xl delay-300 duration-1000 md:-right-8 lg:-right-12">
                <ChannelSyncIcon className="h-10 w-10 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-plus-jakarta-700 text-[10px] tracking-wider text-[#64748B] uppercase">
                    100+ CHANNELS
                  </span>
                  <span className="font-plus-jakarta-700 text-[13px] text-[#0F172A]">
                    Active - 0.2s Latency
                  </span>
                </div>
              </div>

              {/* Floating Element 2 (Bottom Left) */}
              <div className="animate-in fade-in slide-in-from-left-8 fill-mode-both absolute bottom-12 -left-4 flex items-center gap-3 rounded-full border border-slate-100 bg-white py-2.5 pr-5 pl-2.5 shadow-xl delay-500 duration-1000 md:-left-8 lg:-left-12">
                <RevenueGrowthIcon className="h-10 w-10 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-plus-jakarta-700 text-[10px] tracking-wider text-[#64748B] uppercase">
                    REVENUE UPLIFT
                  </span>
                  <span className="font-plus-jakarta-700 text-[13px] text-[#0F172A]">
                    +24.9% YoY Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
