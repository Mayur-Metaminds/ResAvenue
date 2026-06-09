"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HeroContent } from "./HeroContent"
import { HeroTitle } from "./HeroTitle"
import Lottie from "lottie-react"
import dashboardLottie from "../../../public/assets/landing/hero-section.json"


export function HeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0A0A0B]"
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
      <div className="relative z-10 lg:mx-[80px] mx-[16px] mt-[165px] flex flex-1 flex-col">
        {/* Main Content */}
        <div className="grid flex-1 grid-cols-1 items-start gap-12 lg:grid-cols-2 ">
          {/* Left Column: Content */}
          <HeroContent
            eyebrow="CLOUD BASED HOTEL MANAGEMENT"
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
          <div className="relative z-20 flex h-[210px] w-[600px] w-full items-center sm:h-[480px] lg:absolute lg:top-1/2 lg:left-[40%] lg:h-[430px] lg:w-[700px] lg:-translate-y-1/2 xl:left-[42%] xl:h-[590px] xl:w-[876px]">
            {/* Dashboard video — muted + playsInline are required for mobile autoplay */}
              <Lottie
              animationData={dashboardLottie}
              loop
              autoplay
              className="h-full w-full"
            />

            {/* Glow */}
            <div className="bg-primary/20 absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>      
    </section>
  )
}
