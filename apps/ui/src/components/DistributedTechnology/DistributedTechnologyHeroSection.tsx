"use client"

import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"

import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"

import globeAnimation from "../../../public/assets/landing/distribution-network.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

export function DistributedTechnologyHeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#0A0A0B]"
    >
      <Image
        src="/images/hero_section_bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="pointer-events-none object-cover object-center select-none"
      />

      <div className="relative z-10 flex w-full flex-1 flex-col px-[15px] mt-[200px] lg:px-20">
        <div className="flex flex-1 flex-col items-start justify-between gap-12 pb-12 lg:flex-row lg:gap-8 lg:pb-0">
          {/* Left — content */}
          <div className="flex w-full flex-col justify-start lg:w-[50%] xl:w-[45%]">
            <HeroContent

              eyebrow="CLOUD BASED HOTEL MANAGEMENT"
              title={
                <HeroTitle>
                  Expand Your Reach
                  <br />
                  Across{" "}
                  <HeroTitle.Highlight>Global Distribution Networks</HeroTitle.Highlight>

                </HeroTitle>
              }
              titleClassName="w-[550px]"
              description="The complete hospitality ecosystem for modern revenue management. Synchronize inventory in real-time across GDS, OTAs, and Metasearch from a single source of truth."
              actions={[
                <Button
                  key="demo"
                  variant="primary"
                  size="default"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="gap-[7.6px] pt-[8.5px] pr-[10.5px] pb-[8.5px] pl-[9.5px] font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
                >
                  Request a Demo
                </Button>,
              ]}
            />
          </div>

          {/* Right — globe animation */}
          <div className="relative z-20 flex h-[300px] w-full items-start justify-center self-start sm:h-[480px] lg:h-[600px] lg:w-[50%] lg:justify-end xl:h-[720px] xl:w-[55%]">
            <div className="relative flex h-full w-full max-w-[800px] items-start justify-start">
              <Lottie
                animationData={globeAnimation}
                loop
                className="h-full w-full"
                rendererSettings={{ preserveAspectRatio: "xMidYMin meet" }}
              />
            </div>
            <div className="bg-primary/20 absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
