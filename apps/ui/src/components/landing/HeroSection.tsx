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
      className="relative flex w-full flex-col overflow-hidden bg-[#0A0A0B] py-18"
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
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-[16px] py-[70px] lg:px-[80px]">
        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-1">
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
              <Link key="demo" href="/contact-us">
                <Button
                  variant="primary"
                  size="default"
                  icon={<ArrowRight className="h-4 w-4" />}
                  // Responsive padding: lg:px-[28px] provides comfortable width matching design
                  className="gap-[7.6px] px-[18px] pt-[8.5px] pb-[8.5px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
                >
                  Request a Demo
                </Button>
              </Link>,
              <Button
                key="products"
                variant="secondary"
                size="default"
                // Exact pixel paddings applied responsively
                className="pt-[9px] pr-[16px] pb-[10px] pl-[17px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:pt-[17px] lg:pr-[28.6px] lg:pb-[18px] lg:pl-[29px] lg:text-[15px]"
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
                <HeroSequenceAnimation className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
