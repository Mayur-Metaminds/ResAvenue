import {
  Agoda,
  AirBnB,
  Amadeus,
  BookingDotCom,
  ClearTrip,
  DEdge,
  Expedia,
  Galileo,
  GoMMt,
  HotelBeds,
  HRS,
  Sabre,
  Trip,
  WorldSpan,
} from "../../public/svg/MarqueeSvg"

/**
 * Shared "trusted by" logo set. Used by the landing hero and the contact-us
 * footer — both render the marquee with the same logos, so the data lives in
 * one place to keep them in sync.
 */
export const trustedLogos = [
  { name: "Expedia", Component: Expedia },
  { name: "Booking.com", Component: BookingDotCom },
  { name: "Agoda", Component: Agoda },
  { name: "Airbnb", Component: AirBnB },
  { name: "Amadeus", Component: Amadeus },
  { name: "Sabre", Component: Sabre },
  { name: "Galileo", Component: Galileo },
  { name: "WorldSpan", Component: WorldSpan },
  { name: "HotelBeds", Component: HotelBeds },
  { name: "HRS", Component: HRS },
  { name: "ClearTrip", Component: ClearTrip },
  { name: "Trip.com", Component: Trip },
  { name: "Goibibo / MakeMyTrip", Component: GoMMt },
  { name: "D-EDGE", Component: DEdge },
] as const

export type TrustedLogo = (typeof trustedLogos)[number]
