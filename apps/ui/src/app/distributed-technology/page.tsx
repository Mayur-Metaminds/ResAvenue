import type { Metadata } from "next"

import DistributedTechnologyWrapper from "@/components/DistributedTechnology/DistributedTechnologyWrapper"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Distribution Network",
  description: `Global distribution network by ${siteConfig.name}.`,
}

export default function DistributionNetworkPage() {
  return <DistributedTechnologyWrapper />
}
