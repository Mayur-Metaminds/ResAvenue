import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getMobileAppPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getMobileAppPageSeo().metadata
}

export default function MobileAppPage() {
  const seo = getMobileAppPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
