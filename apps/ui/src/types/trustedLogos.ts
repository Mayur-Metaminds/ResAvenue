import {
  BullLogo,
  Expedia,
  MickinsleyAndCompany,
  Vercel,
} from "../../public/svg/MarqueeSvg"

/**
 * Shared "trusted by" logo set. Used by the landing hero and the contact-us
 * footer — both render the marquee with the same logos, so the data lives in
 * one place to keep them in sync.
 */
export const trustedLogos = [
  { name: "Expedia", Component: Expedia },
  { name: "Texas Longhorns", Component: BullLogo },
  { name: "McKinsey & Company", Component: MickinsleyAndCompany },
  { name: "Vercel", Component: Vercel },
] as const

export type TrustedLogo = (typeof trustedLogos)[number]
