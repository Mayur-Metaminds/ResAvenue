import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getCareersPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getCareersPageSeo().metadata
}

export default function CareersPage() {
  const seo = getCareersPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
