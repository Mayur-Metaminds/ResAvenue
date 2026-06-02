"use client"

import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"
import { HotelWebsiteBuilderHeroSection } from "./HotelWebsiteBuilderHeroSection"
import { HotelWebsiteBuilderTestimonialsSection } from "./HotelWebsiteBuilderTestimonialsSection"

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
            durationSeconds={35}
            pauseOnHover={false}
            edgeFade
            gapPx={64}
            backgroundColor="#FFFFFF"
            ariaLabel="Trusted by"
            renderItem={({ name, Component }) => (
              <div
                aria-label={name}
                className="flex items-center text-[#414E62] opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-8 [&_svg]:w-auto md:[&_svg]:h-10"
              >
                <Component />
              </div>
            )}
          />
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <HotelWebsiteBuilderTestimonialsSection />

    </div>
  )
}
