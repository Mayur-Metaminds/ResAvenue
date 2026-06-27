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
        backgroundImage="url('/images/hero_section_bg.png')"
        showOverlay={false}
        className="bg-[#010E38]"
        primaryButtonClassName="text-nowrap bg-[#ED862E] text-white shadow-[0_8px_24px_rgba(237,134,46,0.45)] hover:bg-[#d97726] hover:bg-none justify-center max-md:px-2.5 max-md:py-[8.5px]"
        secondaryButtonClassName="text-nowrap inline-flex items-center justify-center max-md:px-4 max-md:py-2.25"
        actionsClassName="flex-col min-[330px]:flex-row"
        // Plus Jakarta Sans, 500 weight, 51.52px line-height, -0.5px tracking on
        // both breakpoints; only the font-size changes (32px mobile, 48px desktop).
        titleClassName="max-sm:w-[295px] mx-auto [font-family:var(--font-plus-jakarta)] font-medium text-[32px] md:text-[48px] lg:text-[48px] leading-[51.52px] tracking-[-0.5px]"
        descriptionClassName="text-[16px] font-normal leading-[30.6px] md:text-[18px] md:font-light md:leading-relaxed"
        showFooter
      />
    </div>
  )
}

export default PropertyManagementWrapper
