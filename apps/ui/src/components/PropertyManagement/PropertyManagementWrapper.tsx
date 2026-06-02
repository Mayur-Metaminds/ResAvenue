import React from "react"

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


    </div>
  )
}

export default PropertyManagementWrapper
