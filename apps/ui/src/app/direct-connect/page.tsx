import type { Metadata } from "next"

import DirectConnect from "@/components/DirectConnect/DirectConnect"
import { StructuredData } from "@/components/seo/StructuredData"
import { getDirectConnectPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getDirectConnectPageSeo().metadata
}

export default function DirectConnectPage() {
  const seo = getDirectConnectPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <DirectConnect />
    </>
  )
}
