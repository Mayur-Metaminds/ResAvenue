import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getCookiePolicyPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getCookiePolicyPageSeo().metadata
}

export default function CookiePolicyPage() {
  const seo = getCookiePolicyPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
