import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import EventBookingWrapper from "@/components/EventBooking/EventBookingWrapper"

export const metadata: Metadata = {
  title: "Event Booking",
  description: `Event management and ticketing by ${siteConfig.name}.`,
}

export default function EventBookingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <EventBookingWrapper/>
    </main>
  )
}
