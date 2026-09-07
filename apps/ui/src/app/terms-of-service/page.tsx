import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getTermsOfServicePageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getTermsOfServicePageSeo().metadata
}

export default function TermsOfServicePage() {
  const seo = getTermsOfServicePageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
