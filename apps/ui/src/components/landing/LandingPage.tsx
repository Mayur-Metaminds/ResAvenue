"use client"

import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"

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

export default function LandingPage() {
  return (
    <div className="bg-red-600">
      <HeroSection />
      <Marquee<TrustedLogo>
        className="w-full pt-[30px] pb-[30px]"
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
      <SolutionSection />

      <BentoProductsSection />

      <ExploreModulesSection />
      <FeatureCarouselSection />
      <WhoWeServeSection />
      <TestimonialsSection />
      <PlanSelectionSection />
      <FaqSection />
      <CtaSection showFooter />
    </div>
  )
}
