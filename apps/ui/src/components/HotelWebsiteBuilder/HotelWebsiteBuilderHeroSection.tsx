import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"

export function HotelWebsiteBuilderHeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
    >
      {/* Container */}
      <div className="relative z-10 flex w-full flex-1 flex-col px-[15px] pt-[106px] lg:px-20">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-between gap-12 pb-12 lg:flex-row lg:gap-8 lg:pb-0">
          {/* Left Column: Content */}
          <div className="my-auto flex w-full flex-col justify-center lg:w-[50%] lg:py-20 xl:w-[45%]">
            <HeroContent
              eyebrow="DIRECT BOOKING PLATFORM"
              title={
                <HeroTitle
                  style={
                    {
                      "--hero-title-color": "#FFFFFF",
                      // Updated to match Figma specs exactly
                      "--hero-title-gradient": "linear-gradient(90deg, #ED862E 0%, #FDBA74 100%)",
                    } as React.CSSProperties
                  }
                >
                  Turn Your Website Into
                  <br className="hidden lg:block" />
                  <HeroTitle.Highlight>Your #1 Booking Channel</HeroTitle.Highlight>
                </HeroTitle>
              }
              description={
                <span className="typo-body1 text-white/55">
                  Build stunning, high-converting hotel websites designed to drive direct bookings & revenue.
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
                  Request a Demo
                </Button>,
              ]}
            />
          </div>

          {/* Right Column: Graphic/Dashboard Preview */}
          <div className="relative flex w-full items-center justify-center lg:w-[50%] xl:w-[55%]">
            <div className="relative w-full max-w-[800px]">
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/20 blur-[100px]" />

              {/* Main Image (Placeholder) */}
              <div className="relative overflow-hidden">
                <Image
                  src="/images/Hotel-Website-Builder/Hero-img.png"
                  alt="Hotel Website Builder Preview"
                  width={1918}
                  height={1934}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
