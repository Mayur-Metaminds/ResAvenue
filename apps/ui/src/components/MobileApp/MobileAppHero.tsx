import type React from "react"

import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"

function MobileAppHero() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="relative z-10 flex w-full flex-1 flex-col px-[15px] pt-[106px] lg:px-20">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-between gap-8 pb-8 md:gap-12 lg:flex-row lg:justify-evenly lg:gap-15 lg:pb-0">
          {/* Left Column: Content */}
          <div className="my-auto flex w-full flex-col justify-center lg:w-[50%] lg:-translate-y-8 lg:py-20 xl:w-[45%]">
            <HeroContent
              eyebrow="CLOUD-BASED HOTEL MANAGEMENT"
              eyebrowColor="#FFF"
              title={
                <HeroTitle
                  style={
                    {
                      "--hero-title-color": "#FFFFFF",
                      "--hero-title-gradient":
                        "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                    } as React.CSSProperties
                  }
                >
                  Manage Your Hotel
                  <br />
                  <HeroTitle.Highlight>Anytime, Anywhere</HeroTitle.Highlight>
                </HeroTitle>
              }
              description={
                <span className="typo-body1 text-white/65">
                  Empower your team with full control of rates, inventory, and
                  reservations directly from their pocket. The ultimate mobile
                  companion for hoteliers.
                </span>
              }
            />

            <div className="flex justify-start pt-[39px] md:pt-[32px]">
              <button type="submit" className="font-plus-jakarta-700 cursor-pointer rounded-full bg-[#ED862E] px-5 md:px-6 py-3 text-[8.909px] leading-[14.255px] text-white shadow-lg transition hover:bg-orange-600 md:px-10 md:py-4 lg:text-[15px] lg:leading-6">
                Request a Demo →
              </button>
            </div>
          </div>

          {/* Right Column: Mobile mockup */}
          <div className="w-full min-w-0 flex-1 self-center lg:pt-15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Mobile-App/mobile-app-hero.png"
              alt="ResAvenue mobile app"
              className="mx-auto h-auto w-full max-w-[420px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileAppHero
