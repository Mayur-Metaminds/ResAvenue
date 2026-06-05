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
      <section className="w-full bg-white pt-16 md:pt-24 pb-8">
        <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
          
          <Marquee<TrustedLogo>
            className="w-full"
            items={[...trustedLogos]}
            getKey={(logo) => logo.name}
            durationSeconds={60}
            pauseOnHover={false}
            edgeFade
            gapPx={96}
            backgroundColor="#FFFFFF"
            ariaLabel="Trusted by"
            renderItem={({ name, Component }) => (
              <div
                aria-label={name}
                className="opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-6 [&_svg]:w-auto md:[&_svg]:h-auto md:[&_svg]:w-auto"
              >
                <Component />
              </div>
            )}
          />
        </div>
      </section>

     

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

      <CtaSection/>

    </div>
  )
}
