import type { Metadata } from "next"

import MobileAppWrapper from "@/components/MobileApp/MobileAppWrapper"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Mobile App",
  description: `Cloud-based hotel management on the go by ${siteConfig.name}.`,
}

export default function MobileAppPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <MobileAppWrapper />
    </main>
  )
}
