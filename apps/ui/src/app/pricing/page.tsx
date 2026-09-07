import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getPricingPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getPricingPageSeo().metadata
}

export default function PricingPage() {
  const seo = getPricingPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
