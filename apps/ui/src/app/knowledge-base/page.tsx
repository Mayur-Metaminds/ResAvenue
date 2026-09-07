import type { Metadata } from "next"

import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getKnowledgeBasePageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getKnowledgeBasePageSeo().metadata
}

export default function KnowledgeBasePage() {
  const seo = getKnowledgeBasePageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ComingSoonPage />
    </>
  )
}
