import type { Metadata } from "next"

import ResourcePageWrapper from "@/components/ResourcePage/ResourcePageWrapper"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Resources",
  description: `The operating system for modern hospitality by ${siteConfig.name}.`,
}

export default function ResourcePage() {
  return <ResourcePageWrapper />
}
