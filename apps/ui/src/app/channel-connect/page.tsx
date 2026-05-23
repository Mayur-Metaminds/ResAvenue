import type { Metadata } from "next"

import ChannelConnect from "@/components/ChannelConnect/ChannelConnect"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Channel Connect",
  description: `Channel manager by ${siteConfig.name}.`,
}

export default function ChannelConnectPage() {
  return <ChannelConnect />
}
