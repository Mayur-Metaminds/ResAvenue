"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"
import { preloadLottie } from "@/lib/lottie-preload"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

// Alternative animation options:
// import { HeroSequenceAnimation } from "@/components/landing/HeroSequenceAnimation"
// import { CardStackAnimation } from "./CardStackAnimation"

export function ChannelConnectHeroSection() {
  // Above the fold: warm the hero animation download before hydration.
  preloadLottie(CHANNEL_CONNECT_HERO_URL)

  return (
    <section
      data-nav-theme="dark"
      className="4xl:min-h-[42vh] relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#0A0A0B] pt-20 pb-0 sm:pt-14 sm:pb-0 lg:min-h-[666px] lg:pt-20 lg:pb-0 [@media(min-width:1000px)]:min-h-[300px] [@media(min-width:1000px)]:pt-5 [@media(min-width:2000px)]:min-h-[42vh]"
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
      <div className="4xl:max-w-[1440px] 4xl:px-0 4xl:pl-20 relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 pt-2 pb-0 sm:px-6 sm:pt-4 lg:pt-[60px] lg:pr-0 lg:pb-0 lg:pl-16 xl:pl-20 [@media(min-width:1000px)]:px-8">
        {/* Main Content */}
        <div className="4xl:grid-cols-[auto_1fr] 4xl:items-end 4xl:gap-0 grid flex-1 grid-cols-1 grid-rows-[auto_1fr] items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:grid-rows-none lg:items-end lg:gap-8 xl:gap-4 [@media(min-width:1000px)]:grid-cols-2 [@media(min-width:1000px)]:grid-rows-none [@media(min-width:1000px)]:items-end [@media(min-width:1000px)]:gap-6">
          {/* Left Column: Content */}
          <HeroContent
            eyebrow="INTUITIVE EXPERIENCE. FAST FLEXIBILITY."
            eyebrowClassName="typo-body2"
            className="4xl:max-w-2xl 4xl:pb-20 4xl:translate-x-0 h-full max-w-none justify-center pb-0 md:max-w-2xl lg:max-w-xl lg:pb-1 xl:translate-x-18"
            descriptionClassName="mb-[16px] lg:mb-[24px] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[24px]"
            title={
              <HeroTitle
                className="max-sm:w-[250px]"
                style={
                  {
                    "--hero-title-color": "#FFFFFF",
                    "--hero-title-gradient":
                      "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                  } as React.CSSProperties
                }
              >
                Master Your
                <br />
                <HeroTitle.Highlight>Global Distribution</HeroTitle.Highlight>
              </HeroTitle>
            }
            description="Control Every Channel. Maximize Every Booking. Simplify hotel distribution with a centralized channel management solution built for speed, accuracy, and scale. Connects to 100+ channels directly worldwide. Instantly update rates and inventory across OTAs, GDS, and metasearch platforms while optimizing performance with real-time insights."
            actions={[
              <Link key="demo" href="/contact-us">
                <Button
                  variant="primary"
                  size="default"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="gap-[7.6px] pt-[8.5px] pr-[10.5px] pb-[8.5px] pl-[9.5px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:pt-[14px] lg:pr-[39.16px] lg:pb-[16px] lg:pl-[28px] lg:text-[15px]"
                >
                  Start your journey
                </Button>
              </Link>,
            ]}
          />

          {/* Right Column: Hero Animation */}
          <div className="4xl:justify-end relative z-20 mt-auto flex w-full items-end justify-center self-end lg:mt-0 lg:justify-end [@media(min-width:1000px)]:mt-0">
            <div className="4xl:max-w-[980px] 4xl:-translate-x-10 relative w-full max-w-[340px] min-[400px]:max-w-[380px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[860px] lg:-translate-x-4 xl:max-w-[920px] xl:-translate-x-10 [@media(min-width:1000px)]:max-w-[580px]">
              {/* Glow effect behind the image */}
              <div className="absolute top-1/2 left-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ED862E]/15 blur-[80px]" />

              {/* Active: Lottie Animation (RES HERO JSON.json) with screen blend for transparent background */}
              <div
                className="relative aspect-[20/17] w-full mix-blend-screen"
                style={{ mixBlendMode: "screen" }}
              >
                <LazyLottie
                  src={CHANNEL_CONNECT_HERO_URL}
                  priority="eager"
                  loop
                  className="h-full w-full object-contain"
                  lottieClassName="mix-blend-screen"
                  rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }}
                  aria-label="Channel Connect Hero Animation"
                />
              </div>

              {/* Alternative: Hero Globe Sequence Animation */}
              {/* <div className="relative aspect-[1380/884] w-full">
                <HeroSequenceAnimation className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain max-lg:object-center lg:object-right-bottom" />
              </div> */}

              {/* Alternative: Main 3D Card Stack Animation */}
              {/* <CardStackAnimation className="h-[220px] w-full sm:h-[295px] md:h-[380px] lg:h-[480px] xl:h-[510px]" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
