import { HeroContent } from '@/components/landing/HeroContent'
import { HeroTitle } from '@/components/landing/HeroTitle'
import React from 'react'

const EventBookingHero = () => {
  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat justify-center px-4'
    style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}>
        <div className='flex lg:flex-row lg:justify-between'>
            <div className='relative z-10 flex w-full flex-1 flex-col px-[15px] pt-[106px] lg:px-20 items-start'>
            <HeroContent
        eyebrow='Enterprise Analytics'
        title={
                        <HeroTitle
                        className='typo-h1 tracking-[-1.8px] text-white max-w-[400px]'
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
with a single, powerful enterprise solution designed for scale.'/>

        
        <div className="mt-6 flex justify-center md:mt-8">
          <button type="submit" className="font-plus-jakarta-700 cursor-pointer rounded-full bg-[#ED862E] px-5 md:px-6 py-3 text-[8.909px] leading-[14.255px] text-white shadow-lg transition hover:bg-orange-600 md:px-10 md:py-4 lg:text-[15px] lg:leading-6">
            Request Demo →
          </button>
        </div>

        </div>

        

        </div>
    </div>
  )
}

export default EventBookingHero