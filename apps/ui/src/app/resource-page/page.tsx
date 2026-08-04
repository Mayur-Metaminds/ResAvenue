import type { Metadata } from "next"

import ResourcePageWrapper from "@/components/ResourcePage/ResourcePageWrapper"
import { StructuredData } from "@/components/seo/StructuredData"
import { getResourcePageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getResourcePageSeo().metadata
}

export default function ResourcePage() {
  const seo = getResourcePageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ResourcePageWrapper />
    </>
  )
}
