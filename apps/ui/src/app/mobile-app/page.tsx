import type { Metadata } from "next"

import MobileAppWrapper from "@/components/MobileApp/MobileAppWrapper"
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
      <main className="flex min-h-screen items-center justify-center">
        <MobileAppWrapper />
      </main>
    </>
  )
}
