import type { Metadata } from "next"

import HotelWebsiteBuilder from "@/components/HotelWebsiteBuilder/HotelWebsiteBuilder"
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
      <HotelWebsiteBuilder />
    </>
  )
}
