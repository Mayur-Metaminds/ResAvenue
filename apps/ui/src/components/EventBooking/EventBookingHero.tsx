import { ArrowRight } from 'lucide-react'

import { LazyLottie } from '@/components/common/LazyLottie'
import { HeroContent } from '@/components/landing/HeroContent'
import { HeroTitle } from '@/components/landing/HeroTitle'
import { Button } from '@/components/ui/button'
import { CHANNEL_CONNECT_HERO_URL } from '@/lib/lottie-urls'
import React from 'react'

const EventBookingHero = () => {
  return (
    <div data-nav-theme="dark" className='relative flex min-h-screen w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat justify-center'
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}>
      <div className='flex flex-col lg:flex-row lg:justify-between'>
        <div className='relative z-10 flex w-full flex-1 flex-col px-[20px] pt-[106px] lg:px-20 items-start'>
          <HeroContent
            eyebrow='Enterprise Analytics'
            title={
              <HeroTitle
                className='typo-h1 tracking-[-1.8px] text-white max-sm:max-w-[300px] max-w-100'
                style={
                  {
                    "--hero-title-color": "#FFFFFF",
                    // Updated to match Figma specs exactly
                    "--hero-title-gradient":
                      "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                  } as React.CSSProperties
                }
              >
                Comprehensive Event Booking &
                <br />
                <HeroTitle.Highlight>ticketing Platform</HeroTitle.Highlight>
              </HeroTitle>
            }
            description='Streamline your Ticketing, Payments, and Event Management
with a single, powerful enterprise solution designed for scale.'
            descriptionClassName='typo-body1 mb-0 md:mb-[40px] text-white opacity-55' />


          <div className="mt-6 flex justify-center md:mt-8">
            <Button
              variant="primary"
              size="default"
              icon={<ArrowRight className="h-4 w-4" />}
              className="h-[44px] gap-[7.6px] pt-[9px] pr-[26.5px] pb-[10px] pl-[25.5px] font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] lg:px-[28px] lg:pt-[17px] lg:pb-[18px] lg:text-[15px]"
            >
              Request Demo
            </Button>
          </div>

        </div>

        {/* Right Column: Dummy Lottie animation placeholder */}
        <div className="relative z-10 flex w-full flex-1 items-center justify-center px-[15px] pt-10 lg:pt-[106px] lg:px-20">
          <LazyLottie
            src={CHANNEL_CONNECT_HERO_URL}
            priority="lazy"
            loop
            className="h-full w-full max-w-2xl"
            aria-label="Event booking animation"
          />
        </div>

      </div>
    </div>
  )
}

export default EventBookingHero