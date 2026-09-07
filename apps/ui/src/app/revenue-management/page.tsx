import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getRevenueManagementPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getRevenueManagementPageSeo().metadata
}

export default function RevenueManagementPage() {
  const seo = getRevenueManagementPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
