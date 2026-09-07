import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getHotelWebsiteBuilderPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getHotelWebsiteBuilderPageSeo().metadata
}

export default function HotelWebsiteBuilderPage() {
  const seo = getHotelWebsiteBuilderPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
