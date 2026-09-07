import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getAnalyticsReportingPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getAnalyticsReportingPageSeo().metadata
}

export default function AnalyticsReportingPage() {
  const seo = getAnalyticsReportingPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
