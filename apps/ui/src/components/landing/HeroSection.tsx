"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { HeroContent } from "./HeroContent"
import { HeroSequenceAnimation } from "./HeroSequenceAnimation"
import { HeroTitle } from "./HeroTitle"

export function HeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col overflow-hidden bg-[#0A0A0B] pt-12 pb-6 sm:pt-14 sm:pb-8 lg:pt-20 lg:pb-0"
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 pt-2 pb-0 sm:px-6 sm:pt-4 lg:pt-[60px] lg:pr-0 lg:pb-0 lg:pl-[80px]">
        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 items-center gap-4 sm:gap-6 lg:grid-cols-2 lg:items-end lg:gap-4">
          {/* Left Column: Content */}
          <HeroContent
            eyebrow="CLOUD BASED HOTEL MANAGEMENT"
            eyebrowClassName="typo-body2"
            className="h-full justify-center pb-0 lg:pb-14"
            descriptionClassName="mb-5 sm:mb-7 lg:mb-[40px] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[24px]"
            title={
              <HeroTitle>
                The Complete Revenue & Distribution Platform for{" "}
                <HeroTitle.Highlight>Modern Hospitality</HeroTitle.Highlight>
              </HeroTitle>
            }
            description="ResAvenue brings together booking technology, channel connectivity, property management, intelligent pricing, and digital commerce tools into one seamless ecosystem designed to help hospitality brands grow. Whether you manage a luxury resort, boutique hotel, serviced apartment, or vacation stay, our platform helps you simplify operations, increase direct bookings, and maximize revenue across every channel."
            actions={[
              <Link key="demo" href="/contact-us">
                <Button
                  variant="primary"
                  size="default"
                  icon={<ArrowRight className="h-4 w-4" />}
                  // Responsive padding: lg:px-[28px] provides comfortable width matching design
                  className="gap-[7.6px] px-[18px] pt-[8.5px] pb-[8.5px] font-['Plus_Jakarta_Sans'] text-[15px] leading-[22px] font-semibold sm:text-[16px] sm:leading-[24px] lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
                >
                  Request a Demo
                </Button>
              </Link>,
              <Button
                key="products"
                variant="secondary"
                size="default"
                // Exact pixel paddings applied responsively
                className="pt-[9px] pr-[16px] pb-[10px] pl-[17px] font-['Plus_Jakarta_Sans'] text-[15px] leading-[22px] font-semibold sm:text-[16px] sm:leading-[24px] lg:pt-[17px] lg:pr-[28.6px] lg:pb-[18px] lg:pl-[29px] lg:text-[15px]"
              >
                Explore Products
              </Button>,
            ]}
          />
          {/* Right Column: Mockup */}
          <div className="relative z-20 flex w-full items-end justify-center self-end lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] lg:max-w-[860px] lg:translate-x-12 xl:max-w-[920px] xl:translate-x-20">
              {/* Glow effect behind the image */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/15 blur-[80px]" />

              <div className="relative aspect-[1380/884] w-full">
                <HeroSequenceAnimation className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain max-lg:object-center lg:object-right-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
