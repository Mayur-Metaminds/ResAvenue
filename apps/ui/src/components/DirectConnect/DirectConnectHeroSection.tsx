"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"
import { preloadLottie } from "@/lib/lottie-preload"
import { DC_HERO_OVERLAY_URL } from "@/lib/lottie-urls"

export function DirectConnectHeroSection() {
  // Above the fold: warm the hero animation download before hydration.
  preloadLottie(DC_HERO_OVERLAY_URL)

  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col overflow-hidden bg-[#0A0A0B]"
    >
      {/* Background image */}
      <Image
        src="/images/hero_section_bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="pointer-events-none object-cover object-center select-none"
      />

      {/* Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-[16px] py-[70px] pt-[90px] md:pt-[100px] lg:px-[80px] lg:pt-[70px]">
        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Column: Content */}
          <HeroContent
            eyebrow="HOTEL BOOKING ENGINE"
            title={
              <HeroTitle>
                Built for Every Stay.
                <br />
                <HeroTitle.Highlight>
                  Designed to Drive Direct Bookings.
                </HeroTitle.Highlight>
              </HeroTitle>
            }
            description="From hotels and resorts to boutique properties, serviced apartments, villas, and alternative accommodations, ResAvenue Direct Connect transforms your website into a powerful direct booking engine. Deliver seamless, mobile-first booking experiences with real-time availability, dynamic pricing, exclusive offers, secure payments, and conversion-focused journeys designed to reduce OTA dependency and maximize direct revenue."
            actions={[
              <Button
                key="demo"
                variant="primary"
                size="default"
                icon={<ArrowRight className="h-4 w-4" />}
                className="gap-[7.6px] pt-[8.5px] pr-[10.5px] pb-[8.5px] pl-[9.5px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
              >
                Request a Demo
              </Button>,
              <Button
                key="products"
                variant="secondary"
                size="default"
                className="pt-[9px] pr-[16px] pb-[10px] pl-[17px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:pt-[17px] lg:pr-[28.6px] lg:pb-[18px] lg:pl-[29px] lg:text-[15px]"
              >
                Explore Products
              </Button>,
            ]}
          />

          {/* Right Column: Mockup */}
          <div className="relative z-20 flex h-[300px] w-full items-center justify-center sm:h-[480px] lg:h-[600px] lg:justify-center xl:h-[720px] xl:justify-end">
            <LazyLottie
              src={DC_HERO_OVERLAY_URL}
              priority="eager"
              loop
              className="h-full w-full origin-center scale-[1.35] md:scale-[1.15] lg:scale-[1.3] xl:scale-[1.4]"
              rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
            />

            {/* Glow */}
            <div className="bg-primary/20 absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
