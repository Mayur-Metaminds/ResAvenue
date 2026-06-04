import type { Metadata } from "next"

import { siteConfig } from "@/config/site"  
import HotelWebsiteBuilder from "@/components/HotelWebsiteBuilder/HotelWebsiteBuilder"

export const metadata: Metadata = {
  title: "Hotel Website Builder",
  description: `Hotel Website builder by ${siteConfig.name}.`,
}

export default function HotelWebsiteBuilderPage() {
  return <HotelWebsiteBuilder />
}
