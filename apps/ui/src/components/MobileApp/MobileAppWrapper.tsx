import MobileAppHero from "@/components/MobileApp/MobileAppHero"
import React from "react"
import MobileAppCoreFeatures from "@/components/MobileApp/MobileAppCoreFeatures"
import MobileAppSolutions from "@/components/MobileApp/MobileAppSolutions"
import MobileAppInventory from "@/components/MobileApp/MobileAppInventory"
import MobileAppReservations from "@/components/MobileApp/MobileAppReservations"
import MobileAppAlerts from "@/components/MobileApp/MobileAppAlerts"
import MobileAppShowcase from "@/components/MobileApp/MobileAppShowcase"
import MobileAppBenefits from "@/components/MobileApp/mobileAppBenefits"
import MobileAppFAQ from "@/components/MobileApp/mobileAppFAQ"
import MobileAppCTA from "@/components/MobileApp/MobileAppCTA"

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
      <MobileAppFAQ />
      <MobileAppCTA />

    </div>
  )
}

export default MobileAppWrapper
