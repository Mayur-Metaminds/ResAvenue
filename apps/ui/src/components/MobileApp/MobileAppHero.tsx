import type React from "react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

function MobileAppHero() {
  return (
    <section
      className="relative flex w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat justify-center"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[20px] py-[106px] lg:flex-row lg:justify-between lg:px-20">
        {/* Left Column: Content */}
        <div className="relative z-10 flex w-full flex-1 flex-col items-start">
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
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          <LazyLottie
            src={CHANNEL_CONNECT_HERO_URL}
            priority="lazy"
            loop
            className="h-full w-full max-w-2xl"
            aria-label="Mobile app animation"
          />
        </div>
      </div>
    </section>
  )
}

export default MobileAppHero
