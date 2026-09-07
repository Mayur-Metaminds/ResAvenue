import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
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
      <ComingSoonPage />
    </>
  )
}
