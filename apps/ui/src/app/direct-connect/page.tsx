import type { Metadata } from "next"

import DirectConnect from "@/components/DirectConnect/DirectConnect"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Direct Connect",
  description: `Booking engine and CRS by ${siteConfig.name}.`,
}

export default function DirectConnectPage() {
  return <DirectConnect />
}
