"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LazyLottie } from "@/components/common/LazyLottie"
import { preloadLottie } from "@/lib/lottie-preload"
import { HERO_LAPTOP_URL } from "@/lib/lottie-urls"
import { HeroContent } from "./HeroContent"
import { HeroTitle } from "./HeroTitle"

export function HeroSection() {
  // Above the fold: start the (large) hero animation download as early as
  // possible, in parallel with hydration, instead of waiting for the effect.
  preloadLottie(HERO_LAPTOP_URL)

  return (
    <section
      data-nav-theme="dark"
      className="relative flex py-18 w-full flex-col overflow-hidden bg-[#0A0A0B]"
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
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[16px] lg:px-[80px] py-[70px] flex flex-1 flex-col">
        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-1 lg:grid-cols-2">
          {/* Left Column: Content */}
          <HeroContent
            eyebrow="CLOUD BASED HOTEL MANAGEMENT"
            eyebrowClassName="typo-body2"
            className="h-full"
            title={
              <HeroTitle>
                The Complete Revenue & Distribution Platform for{" "}
                <HeroTitle.Highlight>Modern Hospitality</HeroTitle.Highlight>
              </HeroTitle>
            }
            description="ResAvenue brings together booking technology, channel connectivity, property management, intelligent pricing, and digital commerce tools into one seamless ecosystem designed to help hospitality brands grow. Whether you manage a luxury resort, boutique hotel, serviced apartment, or vacation stay, our platform helps you simplify operations, increase direct bookings, and maximize revenue across every channel."
            actions={[
              <Button
                key="demo"
                variant="primary"
                size="default"
                icon={<ArrowRight className="h-4 w-4" />}
                // Exact pixel paddings & gap applied responsively
                className="gap-[7.6px] pt-[8.5px] pr-[12px] lg:pr-[10.5px] pb-[8.5px] pl-[11px] lg:pl-[9.5px] font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
              >
                Request a Demo
              </Button>,
              <Button
                key="products"
                variant="secondary"
                size="default"
                // Exact pixel paddings applied responsively
                className="pt-[9px] pr-[16px] pb-[10px] pl-[17px] font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] lg:pt-[17px] lg:pr-[28.6px] lg:pb-[18px] lg:pl-[29px] lg:text-[15px]"
              >
                Explore Products
              </Button>,
            ]}
          />
          {/* Right Column: Mockup */}
          <div className="relative z-20 flex h-[300px] w-full items-center justify-center sm:h-[480px] lg:h-[600px] lg:justify-end">
            <div className="relative w-full max-w-[800px]">
              {/* Glow effect behind the image */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/15 blur-[80px]" />

              <div className="relative aspect-[1380/884] w-full max-lg:overflow-hidden">
                <LazyLottie
                  src={HERO_LAPTOP_URL}
                  priority="eager"
                  loop
                  autoplay
                  className="h-full w-full overflow-visible lg:ml-5"
                  lottieClassName="max-[1025px]:scale-95 lg:scale-125"
                  rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                  aria-label="ResAvenue dashboard preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
