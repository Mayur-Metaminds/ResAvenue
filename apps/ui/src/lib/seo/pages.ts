/**
 * Per-page SEO copy (title, description, path, keywords).
 *
 * Shared metadata is added automatically by buildPageSeo() for every page:
 *   robots: { index: true, follow: true }
 *   alternates.canonical → APP_PUBLIC_URL + path
 *   openGraph: title, description, url, siteName, locale, type, images
 *   twitter: card, title, description, images, creator
 *   JSON-LD schema: WebPage + BreadcrumbList (+ WebSite/Organization on home)
 *
 * @see lib/seo/build-page-seo.ts
 */
import { buildPageSeo, type PageSeo } from "@/lib/seo/build-page-seo"
import { siteConfig } from "@/config/site"

// ── Home ──────────────────────────────────────────────────────────────────────

const HOME_TITLE = `${siteConfig.name} | ${siteConfig.tagline}`
const HOME_DESCRIPTION = siteConfig.description
const HOME_PATH = "/"

export function getHomePageSeo(): PageSeo {
  return buildPageSeo({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: HOME_PATH,
    breadcrumbName: "Home",
    absoluteTitle: true,
    keywords: [...siteConfig.keywords],
  })
}

// ── Direct Connect ──────────────────────────────────────────────────────────

const DIRECT_CONNECT_TITLE = "Direct Connect — Booking Engine & CRS"
const DIRECT_CONNECT_DESCRIPTION =
  "Turn your hotel website into a conversion-first booking engine. ResAvenue Direct Connect delivers real-time availability, dynamic pricing, secure payments, and mobile-first checkout to maximize direct bookings."
const DIRECT_CONNECT_PATH = "/direct-connect"

export function getDirectConnectPageSeo(): PageSeo {
  return buildPageSeo({
    title: DIRECT_CONNECT_TITLE,
    description: DIRECT_CONNECT_DESCRIPTION,
    path: DIRECT_CONNECT_PATH,
    breadcrumbName: "Direct Connect",
    keywords: [
      "hotel booking engine",
      "direct bookings",
      "CRS",
      "central reservation system",
      "hotel checkout",
      "conversion-first booking",
    ],
  })
}

// ── Channel Connect ───────────────────────────────────────────────────────────

const CHANNEL_CONNECT_TITLE = "Channel Connect — Hotel Channel Manager"
const CHANNEL_CONNECT_DESCRIPTION =
  "Synchronize rates, inventory, and availability across OTAs and distribution channels in real time. ResAvenue Channel Connect gives hotels one dashboard to manage every channel."
const CHANNEL_CONNECT_PATH = "/channel-connect"

export function getChannelConnectPageSeo(): PageSeo {
  return buildPageSeo({
    title: CHANNEL_CONNECT_TITLE,
    description: CHANNEL_CONNECT_DESCRIPTION,
    path: CHANNEL_CONNECT_PATH,
    breadcrumbName: "Channel Connect",
    keywords: [
      "hotel channel manager",
      "OTA management",
      "rate parity",
      "distribution channels",
      "channel connectivity",
    ],
  })
}

// ── Property Management ───────────────────────────────────────────────────────

const PROPERTY_MANAGEMENT_TITLE = "Property Management — Cloud PMS"
const PROPERTY_MANAGEMENT_DESCRIPTION =
  "Run front desk, housekeeping, billing, and daily operations from one cloud-based property management system built for modern hospitality teams."
const PROPERTY_MANAGEMENT_PATH = "/property-management"

export function getPropertyManagementPageSeo(): PageSeo {
  return buildPageSeo({
    title: PROPERTY_MANAGEMENT_TITLE,
    description: PROPERTY_MANAGEMENT_DESCRIPTION,
    path: PROPERTY_MANAGEMENT_PATH,
    breadcrumbName: "Property Management",
    keywords: [
      "property management system",
      "hotel PMS",
      "cloud PMS",
      "front desk software",
      "hotel operations",
    ],
  })
}

// ── Hotel Website Builder ─────────────────────────────────────────────────────

const HOTEL_WEBSITE_BUILDER_TITLE = "Hotel Website Builder — Direct Booking Websites"
const HOTEL_WEBSITE_BUILDER_DESCRIPTION =
  "Launch a high-converting hotel website designed to drive direct bookings. ResAvenue Hotel Website Builder combines beautiful design with integrated booking technology."
const HOTEL_WEBSITE_BUILDER_PATH = "/hotel-website-builder"

export function getHotelWebsiteBuilderPageSeo(): PageSeo {
  return buildPageSeo({
    title: HOTEL_WEBSITE_BUILDER_TITLE,
    description: HOTEL_WEBSITE_BUILDER_DESCRIPTION,
    path: HOTEL_WEBSITE_BUILDER_PATH,
    breadcrumbName: "Hotel Website Builder",
    keywords: [
      "hotel website builder",
      "hotel website design",
      "direct booking website",
      "hospitality web design",
    ],
  })
}

// ── Mobile App ────────────────────────────────────────────────────────────────

const MOBILE_APP_TITLE = "Mobile App — Hotel Management On the Go"
const MOBILE_APP_DESCRIPTION =
  "Manage reservations, inventory, and guest operations from anywhere with the ResAvenue mobile app for hospitality teams."
const MOBILE_APP_PATH = "/mobile-app"

export function getMobileAppPageSeo(): PageSeo {
  return buildPageSeo({
    title: MOBILE_APP_TITLE,
    description: MOBILE_APP_DESCRIPTION,
    path: MOBILE_APP_PATH,
    breadcrumbName: "Mobile App",
    keywords: [
      "hotel mobile app",
      "hospitality mobile management",
      "hotel operations app",
    ],
  })
}

// ── Event Booking ─────────────────────────────────────────────────────────────

const EVENT_BOOKING_TITLE = "Event Booking — Events & Ticketing Platform"
const EVENT_BOOKING_DESCRIPTION =
  "Sell event tickets, manage venues, and handle registrations alongside room stays with ResAvenue Event Booking for hotels and hospitality venues."
const EVENT_BOOKING_PATH = "/event-booking"

export function getEventBookingPageSeo(): PageSeo {
  return buildPageSeo({
    title: EVENT_BOOKING_TITLE,
    description: EVENT_BOOKING_DESCRIPTION,
    path: EVENT_BOOKING_PATH,
    breadcrumbName: "Event Booking",
    keywords: [
      "event booking software",
      "hotel event management",
      "ticketing platform",
      "venue management",
    ],
  })
}

// ── Distribution Network ──────────────────────────────────────────────────────

const DISTRIBUTED_TECHNOLOGY_TITLE = "Distribution Network — Global Hotel Connectivity"
const DISTRIBUTED_TECHNOLOGY_DESCRIPTION =
  "Connect to global distribution networks and reach travelers across every major channel with ResAvenue distributed technology infrastructure."
const DISTRIBUTED_TECHNOLOGY_PATH = "/distributed-technology"

export function getDistributedTechnologyPageSeo(): PageSeo {
  return buildPageSeo({
    title: DISTRIBUTED_TECHNOLOGY_TITLE,
    description: DISTRIBUTED_TECHNOLOGY_DESCRIPTION,
    path: DISTRIBUTED_TECHNOLOGY_PATH,
    breadcrumbName: "Distribution Network",
    keywords: [
      "hotel distribution network",
      "global distribution",
      "hospitality connectivity",
      "GDS integration",
    ],
  })
}

// ── Resources ─────────────────────────────────────────────────────────────────

const RESOURCE_PAGE_TITLE = "Resources — Hospitality Insights & Guides"
const RESOURCE_PAGE_DESCRIPTION =
  "Explore resources, guides, and insights from ResAvenue to help hospitality brands grow revenue, streamline operations, and improve guest experiences."
const RESOURCE_PAGE_PATH = "/resource-page"

export function getResourcePageSeo(): PageSeo {
  return buildPageSeo({
    title: RESOURCE_PAGE_TITLE,
    description: RESOURCE_PAGE_DESCRIPTION,
    path: RESOURCE_PAGE_PATH,
    breadcrumbName: "Resources",
    keywords: [
      "hospitality resources",
      "hotel industry insights",
      "Revenue management guides",
    ],
  })
}

// ── Contact Us ────────────────────────────────────────────────────────────────

const CONTACT_US_TITLE = "Contact Us — Talk to the ResAvenue Team"
const CONTACT_US_DESCRIPTION =
  "Get in touch with ResAvenue to request a demo, ask questions, or learn how our platform can help your hospitality business grow."
const CONTACT_US_PATH = "/contact-us"

export function getContactUsPageSeo(): PageSeo {
  return buildPageSeo({
    title: CONTACT_US_TITLE,
    description: CONTACT_US_DESCRIPTION,
    path: CONTACT_US_PATH,
    breadcrumbName: "Contact Us",
    keywords: ["contact ResAvenue", "request a demo", "hotel software demo"],
  })
}

// ── Shared page manifest ─────────────────────────────────────────────────────
// Reused by llms.txt (see app/llms.txt/route.ts) so it stays in sync with the
// per-page titles/descriptions above without re-parsing Metadata objects.

export type SeoPageEntry = {
  path: string
  title: string
  description: string
}

export const SEO_PAGE_ENTRIES: SeoPageEntry[] = [
  { path: HOME_PATH, title: siteConfig.tagline, description: HOME_DESCRIPTION },
  {
    path: DIRECT_CONNECT_PATH,
    title: DIRECT_CONNECT_TITLE,
    description: DIRECT_CONNECT_DESCRIPTION,
  },
  {
    path: CHANNEL_CONNECT_PATH,
    title: CHANNEL_CONNECT_TITLE,
    description: CHANNEL_CONNECT_DESCRIPTION,
  },
  {
    path: PROPERTY_MANAGEMENT_PATH,
    title: PROPERTY_MANAGEMENT_TITLE,
    description: PROPERTY_MANAGEMENT_DESCRIPTION,
  },
  {
    path: HOTEL_WEBSITE_BUILDER_PATH,
    title: HOTEL_WEBSITE_BUILDER_TITLE,
    description: HOTEL_WEBSITE_BUILDER_DESCRIPTION,
  },
  {
    path: MOBILE_APP_PATH,
    title: MOBILE_APP_TITLE,
    description: MOBILE_APP_DESCRIPTION,
  },
  {
    path: EVENT_BOOKING_PATH,
    title: EVENT_BOOKING_TITLE,
    description: EVENT_BOOKING_DESCRIPTION,
  },
  {
    path: CONTACT_US_PATH,
    title: CONTACT_US_TITLE,
    description: CONTACT_US_DESCRIPTION,
  },
  // NOTE: /distributed-technology/ and /resource-page/ are intentionally
  // excluded here — they're disallowed in apps/ui/src/app/robots.ts and
  // dropped from STATIC_SEO_ROUTES until ready to be indexed. Re-add them
  // in all three places together once they're ready.
]
