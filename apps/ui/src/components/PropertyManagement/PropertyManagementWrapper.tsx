import React from "react"

import PropertyManagementHero from "@/components/PropertyManagement/PropertyManagementHero"
import PropertyManagementScalability from "@/components/PropertyManagement/PropertyManagementScalability"
import PropertyManagementOperations from "@/components/PropertyManagement/PropertyManagementOperations"

const PropertyManagementWrapper = () => {
  return (
    <div className="flex flex-col w-full">
      <PropertyManagementHero />
      <PropertyManagementScalability />
      <PropertyManagementOperations />

    </div>
  )
}

export default PropertyManagementWrapper
