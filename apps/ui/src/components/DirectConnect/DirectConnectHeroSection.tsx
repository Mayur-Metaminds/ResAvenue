import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"

export function DirectConnectHeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0A0A0B]">
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
      <div className="relative z-10 flex w-full flex-1 flex-col px-[15px] pt-[106px] lg:px-20">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-between gap-12 pb-12 lg:flex-row lg:gap-8 lg:pb-0">
          {/* Left Column: Content */}
          <div className="my-auto flex w-full flex-col justify-center lg:w-[50%] lg:py-20 xl:w-[45%]">
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
                  className="gap-[7.6px] pt-[8.5px] pr-[10.5px] pb-[8.5px] pl-[9.5px] lg:px-[28px] lg:pt-[17px] lg:pb-[18px]"
                >
                  Request a Demo
                </Button>,
                <Button
                  key="products"
                  variant="secondary"
                  size="default"
                  className="pt-[9px] pr-[16px] pb-[10px] pl-[17px] lg:pt-[17px] lg:pr-[28.6px] lg:pb-[18px] lg:pl-[29px]"
                >
                  Explore Products
                </Button>,
              ]}
            />
          </div>

          {/* Right Column: Mockup */}
          <div className="relative z-20 flex h-[300px] w-full items-end justify-center self-end sm:h-[480px] lg:h-[600px] lg:w-[50%] lg:justify-end xl:h-[720px] xl:w-[55%]">
            <div className="relative flex h-full w-full max-w-[800px] items-center justify-center lg:justify-end">
              <img
                src="/images/Direct-connect/hero-img.png"
                alt="Room-Rates Mockup"
                className="h-full w-full object-contain"
              />
            </div>

            {/* Glow */}
            <div className="bg-primary/20 absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
