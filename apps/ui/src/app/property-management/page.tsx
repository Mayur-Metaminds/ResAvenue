import type { Metadata } from "next"

import PropertyManagementWrapper from "@/components/PropertyManagement/PropertyManagementWrapper"
import { StructuredData } from "@/components/seo/StructuredData"
import { getPropertyManagementPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getPropertyManagementPageSeo().metadata
}

export default function PropertyManagementPage() {
  const seo = getPropertyManagementPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <main className="flex min-h-screen items-center justify-center">
        <PropertyManagementWrapper />
      </main>
    </>
  )
}
