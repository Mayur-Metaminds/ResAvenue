import type { Metadata } from "next"

import LandingPage from "@/components/landing/LandingPage"
import { StructuredData } from "@/components/seo/StructuredData"
import { getHomePageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getHomePageSeo().metadata
}

export default function Page() {
  const seo = getHomePageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <LandingPage />
    </>
  )
}
