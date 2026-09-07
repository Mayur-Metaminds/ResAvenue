import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getFaqsPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getFaqsPageSeo().metadata
}

export default function FaqsPage() {
  const seo = getFaqsPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
