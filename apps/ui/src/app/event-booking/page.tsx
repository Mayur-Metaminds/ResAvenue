import type { Metadata } from "next"

import EventBookingWrapper from "@/components/EventBooking/EventBookingWrapper"
import { StructuredData } from "@/components/seo/StructuredData"
import { getEventBookingPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getEventBookingPageSeo().metadata
}

export default function EventBookingPage() {
  const seo = getEventBookingPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <main className="flex min-h-screen items-center justify-center">
        <EventBookingWrapper />
      </main>
    </>
  )
}
