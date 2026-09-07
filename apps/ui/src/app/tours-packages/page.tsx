import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getToursPackagesPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getToursPackagesPageSeo().metadata
}

export default function ToursPackagesPage() {
  const seo = getToursPackagesPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
