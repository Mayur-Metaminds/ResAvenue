"use client"

import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"
import { HotelWebsiteBuilderHeroSection } from "./HotelWebsiteBuilderHeroSection"
import { HotelWebsiteBuilderFeaturesSection } from "./HotelWebsiteBuilderFeaturesSection"
import { HotelWebsiteBuilderPoweringSection } from "./HotelWebsiteBuilderPoweringSection"
import { HotelWebsiteBuilderTestimonialsSection } from "./HotelWebsiteBuilderTestimonialsSection"
import { HotelWebsiteBuilderOpportunitySection } from "./HotelWebsiteBuilderOpportunitySection"
import { HotelWebsiteBuilderRevenueSection } from "./HotelWebsiteBuilderRevenueSection"
import { HotelWebsiteBuilderGlobalSection } from "./HotelWebsiteBuilderGlobalSection"
import { HotelWebsiteBuilderCarouselSection } from "./HotelWebsiteBuilderCarouselSection"
import { HotelWebsiteBuilderPerformanceSection } from "./HotelWebsiteBuilderPerformanceSection"
import { CtaSection } from "@/components/common/CtaSection"

export default function HotelWebsiteBuilder() {
  return (
    <div className="flex flex-col w-full bg-[#FAFAFA]">
      <HotelWebsiteBuilderHeroSection />
      
      {/* Trusted Logos & Marquee Section */}
     
          
          <Marquee<TrustedLogo>
            className="w-full pb-[30px] pt-[30px] "
            items={[...trustedLogos]}
            getKey={(logo) => logo.name}
            durationSeconds={110}
            pauseOnHover={false}
            edgeFade
            gapPx={96}
            backgroundColor="#FFFFFF"
            ariaLabel="Trusted by"
            renderItem={({ name, Component }) => (
              <div
                aria-label={name}
                className="opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-[70px] [&_svg]:w-[150px] md:[&_svg]:h-[80px] md:[&_svg]:w-[170px]"
              >
                <Component />
              </div>
            )}
          />
 

     

      {/* Testimonials Marquee Section */}
      <HotelWebsiteBuilderTestimonialsSection />

      {/* Features Animated Section */}
      <HotelWebsiteBuilderFeaturesSection />

       {/* Powering Section */}
      <HotelWebsiteBuilderPoweringSection />  

       {/* Opportunity Section */}
      <HotelWebsiteBuilderOpportunitySection />

      {/* Revenue Section */}
      <HotelWebsiteBuilderRevenueSection />

      {/* Global Section */}
      <HotelWebsiteBuilderGlobalSection />

      {/* Carousel Section */}
      <HotelWebsiteBuilderCarouselSection />

      {/* Performance Section */}
      <HotelWebsiteBuilderPerformanceSection />

      <CtaSection 
        title="Turn Your Website Into Your Most Profitable Channel" 
        description="Join hotels driving more direct bookings, reducing OTA commissions, and unlocking higher revenue with ResAvenue." 
        primaryButtonLabel={null}
        secondaryButtonLabel="Get Started Today"
        secondaryButtonHref="/contact-us"
        showFooter 
      />

    </div>
  )
}
