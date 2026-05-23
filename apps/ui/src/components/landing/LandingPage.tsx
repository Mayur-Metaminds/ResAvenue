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
    <div>
      <HeroSection />
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
