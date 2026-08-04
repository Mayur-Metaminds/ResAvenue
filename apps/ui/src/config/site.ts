/**
 * Static site configuration. Single source for brand metadata
 * (`SITE_NAME`, descriptions, social links, contact info, OG image,
 * default keywords, schema.org data) so values aren't duplicated across
 * pages, metadata, footer, navbar, and emails.
 *
 * Anything that varies per deploy (URLs, secrets, feature flags) is pulled
 * from env vars at the boundary, not hardcoded here.
 */
export const siteConfig = {
  name: "ResAvenue",
  shortName: "ResAvenue",
  tagline:
    "The Complete Revenue & Distribution Platform for Modern Hospitality",
  description:
    "ResAvenue brings together booking technology, channel connectivity, property management, intelligent pricing, and digital commerce tools into one seamless ecosystem designed to help hospitality brands grow.",
  url: process.env.APP_PUBLIC_URL ?? "http://localhost:3000",
  ogImage: "/images/og-image.png",
  logo: "/images/logo.png",
  locale: "en_US",
  keywords: [
    "ResAvenue",
    "hotel management system",
    "channel manager",
    "booking engine",
    "revenue management software",
    "property management system",
    "PMS",
    "hospitality technology",
    "hotel software",
    "direct bookings",
    "OTA management",
    "hotel distribution platform",
  ],
  social: {
    twitter: {
      url: "https://twitter.com/resavenue",
      handle: "@resavenue",
    },
    linkedin: {
      url: "https://www.linkedin.com/company/resavenue",
    },
  },
  contact: {
    email: "hello@resavenue.com",
  },
  organization: {
    legalName: "ResAvenue",
    foundingDate: "2024",
  },
} as const

export type SiteConfig = typeof siteConfig
