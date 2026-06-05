import type { Metadata } from "next"

import PropertyManagementWrapper from "@/components/PropertyManagement/PropertyManagementWrapper"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Property Management",
  description: `Cloud-based property management system by ${siteConfig.name}.`,
}

export default function PropertyManagementPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <PropertyManagementWrapper />
    </main>
  )
}
