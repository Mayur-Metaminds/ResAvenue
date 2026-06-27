import { ArrowRight } from "lucide-react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

export function HotelWebsiteBuilderHeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat pt-[156px] pb-[45px] md:pb-[95px]"
      style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
    >
      {/* Container */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[20px] lg:flex-row lg:justify-between lg:px-20">
        {/* Left Column: Content */}
        <div className="relative z-10 flex w-full flex-1 flex-col justify-center">
          <HeroContent

            eyebrow="DIRECT BOOKING PLATFORM"
            eyebrowClassName="lg:mb-[12px] mb-[24px]"
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
            titleClassName="typo-h1 tracking-normal leading-normal"
            description={
              <span className="typo-body1 text-white/55">
                Build stunning, high-converting hotel websites designed to drive direct bookings & revenue.
              </span>
            }

            descriptionClassName="mb-6 typo-body1 text-[rgba(255,255,255,0.55)]"

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
        <div className="relative z-10 flex w-full flex-1 items-start justify-start">
          <LazyLottie
            src={CHANNEL_CONNECT_HERO_URL}
            priority="lazy"
            loop
            className="h-full w-full max-w-2xl"
            aria-label="Hotel website builder animation"
          />
        </div>
      </div>
    </section>
  )
}
