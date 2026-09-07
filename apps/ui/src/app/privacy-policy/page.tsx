import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getPrivacyPolicyPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getPrivacyPolicyPageSeo().metadata
}

export default function PrivacyPolicyPage() {
  const seo = getPrivacyPolicyPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
