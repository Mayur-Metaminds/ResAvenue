import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
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
      <ComingSoonPage />
    </>
  )
}
