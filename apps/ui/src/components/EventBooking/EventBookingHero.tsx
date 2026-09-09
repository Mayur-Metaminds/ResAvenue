import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type React from "react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

function EventBookingHero() {
  const heroAnimationUrl = CHANNEL_CONNECT_HERO_URL

  return (
    <div
      data-nav-theme="dark"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[20px] py-[106px] lg:flex-row lg:justify-between lg:px-20">
        <div className="relative z-10 flex w-full flex-1 flex-col items-start lg:pt-6">
          <HeroContent
            eyebrow="Enterprise Analytics"
            title={
              <HeroTitle
                className="typo-h1 max-w-100 tracking-[-1.8px] text-white max-sm:max-w-[300px]"
                style={
                  {
                    "--hero-title-color": "#FFFFFF",
                    // Updated to match Figma specs exactly
                    "--hero-title-gradient":
                      "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                  } as React.CSSProperties
                }
              >
                Comprehensive Event Booking &
                <br />
                <HeroTitle.Highlight>ticketing Platform</HeroTitle.Highlight>
              </HeroTitle>
            }
            description="Streamline your Ticketing, Payments, and Event Management
with a single, powerful enterprise solution designed for scale."
            descriptionClassName="typo-body1 mb-0 mb-[30px] md:mb-[20px] text-white opacity-55"
          />

          <div className="mt-5 flex justify-center">
            <Link href="/contact-us">
              <Button
                key="demo"
                variant="primary"
                size="default"
                icon={<ArrowRight className="h-4 w-4" />}
                // Responsive padding: lg:px-[28px] provides comfortable width matching design
                className="gap-[7.6px] px-[18px] pt-[8.5px] pb-[8.5px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
              >
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Dummy Lottie animation placeholder */}
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          {/* Reserves the animation's native aspect ratio so the layout
              doesn't jump once the Lottie JSON loads in (prevents CLS). */}
          <div className="relative aspect-[1380/884] w-full max-w-2xl overflow-hidden">
            <LazyLottie
              src={heroAnimationUrl}
              priority="lazy"
              loop
              className="h-full w-full"
              aria-label="Event booking animation"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventBookingHero
