import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getAboutUsPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getAboutUsPageSeo().metadata
}

export default function AboutUsPage() {
  const seo = getAboutUsPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
