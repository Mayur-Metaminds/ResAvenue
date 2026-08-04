import type { Metadata } from "next"

import ChannelConnect from "@/components/ChannelConnect/ChannelConnect"
import { StructuredData } from "@/components/seo/StructuredData"
import { getChannelConnectPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getChannelConnectPageSeo().metadata
}

export default function ChannelConnectPage() {
  const seo = getChannelConnectPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ChannelConnect />
    </>
  )
}
