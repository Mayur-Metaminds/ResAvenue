import MobileAppHero from "@/components/MobileApp/MobileAppHero"
import React from "react"
import MobileAppCoreFeatures from "@/components/MobileApp/MobileAppCoreFeatures"
import MobileAppSolutions from "@/components/MobileApp/MobileAppSolutions"
import MobileAppInventory from "@/components/MobileApp/MobileAppInventory"
import MobileAppReservations from "@/components/MobileApp/MobileAppReservations"
import MobileAppAlerts from "@/components/MobileApp/MobileAppAlerts"
import MobileAppShowcase from "@/components/MobileApp/MobileAppShowcase"
import MobileAppBenefits from "@/components/MobileApp/mobileAppBenefits"
import MobileAppCTA from "@/components/MobileApp/MobileAppCTA"
import { FaqSection, type FaqItem } from "@/components/landing/FaqSection"

// Dummy FAQ data for the mobile app page.
const mobileAppFaqs: FaqItem[] = [
  {
    question: "How long does deployment typically take?",
    answer:
      "Deployment typically takes between 2 to 4 weeks depending on the complexity of your existing systems and the modules you choose to implement.",
  },
  {
    question: "What security standards do you maintain?",
    answer:
      "We maintain enterprise-grade security including SOC 2 Type II compliance, PCI-DSS certification for payments, and full GDPR compliance for data protection.",
  },
  {
    question: "Is there API access for custom workflows?",
    answer:
      "Yes, we provide comprehensive RESTful APIs and webhooks that allow your development team to build custom integrations and automate your unique workflows.",
  },
]

const MobileAppWrapper = () => {
  return (
    <div className="flex flex-col w-full">
      <MobileAppHero />
      <MobileAppSolutions />
      <MobileAppCoreFeatures />
      <MobileAppInventory />
      <MobileAppReservations />
      <MobileAppAlerts />
      <MobileAppShowcase />
      <MobileAppBenefits />
      <FaqSection
        faqs={mobileAppFaqs}
        description="Everything you need to know about ResAvenue Mobile."
        defaultOpenIndex={null}
      />
      <MobileAppCTA />

    </div>
  )
}

export default MobileAppWrapper
