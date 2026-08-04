import type { Metadata } from "next"

import DistributedTechnologyWrapper from "@/components/DistributedTechnology/DistributedTechnologyWrapper"
import { StructuredData } from "@/components/seo/StructuredData"
import { getDistributedTechnologyPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getDistributedTechnologyPageSeo().metadata
}

export default function DistributionNetworkPage() {
  const seo = getDistributedTechnologyPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <DistributedTechnologyWrapper />
    </>
  )
}
