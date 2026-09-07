import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getPartnersPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getPartnersPageSeo().metadata
}

export default function PartnersPage() {
  const seo = getPartnersPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
