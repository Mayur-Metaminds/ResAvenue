"use client"

import { BentoProductsSection } from "./BentoProductsSection"
import { ExploreModulesSection } from "./ExploreModulesSection"
import { FaqSection } from "./FaqSection"
import { FeatureCarouselSection } from "./FeatureCarouselSection"
import { HeroSection } from "./HeroSection"
import { PlanSelectionSection } from "./PlanSelectionSection"
import { SolutionSection } from "./SolutionSection"
import { TestimonialsSection } from "./TestimonialsSection"
import { WhoWeServeSection } from "./WhoWeServeSection"
import { CtaSection } from "../common/CtaSection"
import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Marquee<TrustedLogo>
        className="w-full pb-[30px] pt-[50px] "
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
            className="flex items-center text-[#414E62] opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-6 [&_svg]:w-auto md:[&_svg]:h-8"
          >
            <Component />
          </div>
        )}
      />
      <SolutionSection />
      <BentoProductsSection />
      <ExploreModulesSection />
      <FeatureCarouselSection />
      <WhoWeServeSection />
      <TestimonialsSection />
      <PlanSelectionSection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
