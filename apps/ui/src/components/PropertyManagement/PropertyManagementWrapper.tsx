import React from "react"

import { CtaSection } from "@/components/common/CtaSection"
import PropertyManagementHero from "@/components/PropertyManagement/PropertyManagementHero"
import PropertyManagementScalability from "@/components/PropertyManagement/PropertyManagementScalability"
import PropertyManagementOperations from "@/components/PropertyManagement/PropertyManagementOperations"
import PropertyManagementFrontDesk from "@/components/PropertyManagement/PropertyManagementFrontDesk"
import PropertyManagementReservation from "@/components/PropertyManagement/PropertyManagementReservation"
import PropertyManagementBilling from "@/components/PropertyManagement/PropertyManagementBilling"
import PropertyManagementHousekeeping from "@/components/PropertyManagement/PropertyManagementHousekeeping"
import PropertyManagementTools from "@/components/PropertyManagement/PropertyManagementTools"

const PropertyManagementWrapper = () => {
  return (
    <div className="flex flex-col w-full">
      <PropertyManagementHero />
      <PropertyManagementScalability />
      <PropertyManagementFrontDesk />
      <PropertyManagementOperations />
      <PropertyManagementReservation />
      <PropertyManagementBilling />
      <PropertyManagementHousekeeping />
      <PropertyManagementTools />
      <CtaSection
        title="The Smarter Way to Run Your Hotel Starts Here"
        description="Join hotels that are simplifying operations, increasing direct bookings, and maximizing revenue with one unified platform."
        backgroundImage="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%)"
        showOverlay={false}
        className="bg-[#010E38]"
        primaryButtonClassName="bg-[#ED862E] text-white shadow-[0_8px_24px_rgba(237,134,46,0.45)] hover:bg-[#d97726] hover:bg-none"
      />
    </div>
  )
}

export default PropertyManagementWrapper
