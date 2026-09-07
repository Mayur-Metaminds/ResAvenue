import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getGuestCrmPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getGuestCrmPageSeo().metadata
}

export default function GuestCrmPage() {
  const seo = getGuestCrmPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
