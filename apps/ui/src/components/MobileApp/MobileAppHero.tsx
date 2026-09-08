import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type React from "react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { Button } from "@/components/ui/button"
import { CHANNEL_CONNECT_HERO_URL } from "@/lib/lottie-urls"

function MobileAppHero() {
  return (
    <section
      className="relative flex w-full flex-col justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-[20px] py-[106px] lg:flex-row lg:justify-between lg:px-20">
        {/* Left Column: Content */}
        <div className="relative z-10 flex w-full flex-1 flex-col items-start lg:pt-6">
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

          <div className="flex justify-start pt-[12px] md:pt-[20px]">
            <Link href="/contact-us">
              <Button
                key="demo"
                variant="primary"
                size="default"
                icon={<ArrowRight className="h-4 w-4" />}
                // Exact pixel paddings & gap applied responsively
                className="gap-[7.6px] pt-[8.5px] pr-[12px] pb-[8.5px] pl-[11px] font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-semibold lg:px-[28px] lg:pt-[17px] lg:pr-[10.5px] lg:pb-[18px] lg:pl-[9.5px] lg:text-[15px]"
              >
                Request a Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Mobile mockup */}
        <div className="relative z-10 flex w-full flex-1 items-center justify-center">
          {/* Reserves the animation's native aspect ratio so the layout
              doesn't jump once the Lottie JSON loads in (prevents CLS). */}
          <div className="relative aspect-[1380/884] w-full max-w-2xl overflow-hidden">
            <LazyLottie
              src={CHANNEL_CONNECT_HERO_URL}
              priority="lazy"
              loop
              className="h-full w-full"
              aria-label="Mobile app animation"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileAppHero
