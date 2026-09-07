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
import { siteConfig } from "@/config/site"
import { buildPageSeo, type PageSeo } from "@/lib/seo/build-page-seo"

// ── Home ──────────────────────────────────────────────────────────────────────

// Kept under ~60 chars for SERP display; siteConfig.tagline (used in the
// hero UI and llms.txt) is intentionally longer and untouched.
const HOME_TITLE = "ResAvenue — Revenue & Distribution Platform for Hotels"
const HOME_DESCRIPTION =
  "ResAvenue unifies booking, channel connectivity, property management, and intelligent pricing into one platform built to help hospitality brands grow."
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
  "Turn your hotel website into a conversion-first booking engine with real-time availability, dynamic pricing, secure payments, and mobile-first checkout."
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
  "Synchronize rates, inventory, and availability across OTAs in real time. One dashboard to manage every distribution channel."
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

const HOTEL_WEBSITE_BUILDER_TITLE =
  "Hotel Website Builder — Direct Booking Websites"
const HOTEL_WEBSITE_BUILDER_DESCRIPTION =
  "Launch a high-converting hotel website designed to drive direct bookings, combining beautiful design with integrated booking technology."
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

const DISTRIBUTED_TECHNOLOGY_TITLE =
  "Distribution Network — Global Hotel Connectivity"
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

// ── About Us ──────────────────────────────────────────────────────────────────

const ABOUT_US_TITLE = "About Us — ResAvenue Story & Team"
const ABOUT_US_DESCRIPTION =
  "Learn about ResAvenue's mission to empower hospitality brands with revenue, distribution, and operations technology."
const ABOUT_US_PATH = "/about-us"

export function getAboutUsPageSeo(): PageSeo {
  return buildPageSeo({
    title: ABOUT_US_TITLE,
    description: ABOUT_US_DESCRIPTION,
    path: ABOUT_US_PATH,
    breadcrumbName: "About Us",
    keywords: ["about ResAvenue", "hospitality technology", "hotel platform"],
  })
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const PRICING_TITLE = "Pricing — Plans for Every Hospitality Business"
const PRICING_DESCRIPTION =
  "Explore ResAvenue pricing plans designed for hotels of every size — from independent properties to large hospitality groups."
const PRICING_PATH = "/pricing"

export function getPricingPageSeo(): PageSeo {
  return buildPageSeo({
    title: PRICING_TITLE,
    description: PRICING_DESCRIPTION,
    path: PRICING_PATH,
    breadcrumbName: "Pricing",
    keywords: [
      "ResAvenue pricing",
      "hotel software pricing",
      "hospitality plans",
    ],
  })
}

// ── Knowledge Base ────────────────────────────────────────────────────────────

const KNOWLEDGE_BASE_TITLE =
  "Knowledge Base & Tutorials — ResAvenue Help Center"
const KNOWLEDGE_BASE_DESCRIPTION =
  "Browse ResAvenue tutorials, guides, and documentation to get the most out of your hospitality platform."
const KNOWLEDGE_BASE_PATH = "/knowledge-base"

export function getKnowledgeBasePageSeo(): PageSeo {
  return buildPageSeo({
    title: KNOWLEDGE_BASE_TITLE,
    description: KNOWLEDGE_BASE_DESCRIPTION,
    path: KNOWLEDGE_BASE_PATH,
    breadcrumbName: "Knowledge Base",
    keywords: ["ResAvenue help", "tutorials", "knowledge base", "hotel guides"],
  })
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

const FAQS_TITLE = "FAQs — Frequently Asked Questions"
const FAQS_DESCRIPTION =
  "Find answers to frequently asked questions about ResAvenue's hospitality platform and services."
const FAQS_PATH = "/faqs"

export function getFaqsPageSeo(): PageSeo {
  return buildPageSeo({
    title: FAQS_TITLE,
    description: FAQS_DESCRIPTION,
    path: FAQS_PATH,
    breadcrumbName: "FAQs",
    keywords: ["ResAvenue FAQ", "hospitality FAQ", "hotel software questions"],
  })
}

// ── Partners ──────────────────────────────────────────────────────────────────

const PARTNERS_TITLE = "Partners & Resellers — Join the ResAvenue Network"
const PARTNERS_DESCRIPTION =
  "Partner with ResAvenue to bring hospitality technology to hotels worldwide — explore reseller and partnership opportunities."
const PARTNERS_PATH = "/partners"

export function getPartnersPageSeo(): PageSeo {
  return buildPageSeo({
    title: PARTNERS_TITLE,
    description: PARTNERS_DESCRIPTION,
    path: PARTNERS_PATH,
    breadcrumbName: "Partners",
    keywords: ["ResAvenue partners", "resellers", "hospitality partnerships"],
  })
}

// ── Careers ───────────────────────────────────────────────────────────────────

const CAREERS_TITLE = "Careers — Join ResAvenue"
const CAREERS_DESCRIPTION =
  "Join the ResAvenue team and help shape the future of hospitality technology. Explore open roles and opportunities."
const CAREERS_PATH = "/careers"

export function getCareersPageSeo(): PageSeo {
  return buildPageSeo({
    title: CAREERS_TITLE,
    description: CAREERS_DESCRIPTION,
    path: CAREERS_PATH,
    breadcrumbName: "Careers",
    keywords: ["ResAvenue careers", "hospitality jobs", "join team"],
  })
}

// ── Privacy Policy ────────────────────────────────────────────────────────────

const PRIVACY_POLICY_TITLE = "Privacy Policy — ResAvenue"
const PRIVACY_POLICY_DESCRIPTION =
  "Read ResAvenue's privacy policy to understand how we collect, use, and protect your personal information."
const PRIVACY_POLICY_PATH = "/privacy-policy"

export function getPrivacyPolicyPageSeo(): PageSeo {
  return buildPageSeo({
    title: PRIVACY_POLICY_TITLE,
    description: PRIVACY_POLICY_DESCRIPTION,
    path: PRIVACY_POLICY_PATH,
    breadcrumbName: "Privacy Policy",
    keywords: ["privacy policy", "ResAvenue privacy", "data protection"],
  })
}

// ── Terms of Service ──────────────────────────────────────────────────────────

const TERMS_OF_SERVICE_TITLE = "Terms of Service — ResAvenue"
const TERMS_OF_SERVICE_DESCRIPTION =
  "Review ResAvenue's terms of service governing the use of our platform and services."
const TERMS_OF_SERVICE_PATH = "/terms-of-service"

export function getTermsOfServicePageSeo(): PageSeo {
  return buildPageSeo({
    title: TERMS_OF_SERVICE_TITLE,
    description: TERMS_OF_SERVICE_DESCRIPTION,
    path: TERMS_OF_SERVICE_PATH,
    breadcrumbName: "Terms of Service",
    keywords: ["terms of service", "ResAvenue terms", "hotel platform terms"],
  })
}

// ── Cookie Policy ─────────────────────────────────────────────────────────────

const COOKIE_POLICY_TITLE = "Cookie Policy — ResAvenue"
const COOKIE_POLICY_DESCRIPTION =
  "Learn how ResAvenue uses cookies and similar technologies to improve your browsing experience."
const COOKIE_POLICY_PATH = "/cookie-policy"

export function getCookiePolicyPageSeo(): PageSeo {
  return buildPageSeo({
    title: COOKIE_POLICY_TITLE,
    description: COOKIE_POLICY_DESCRIPTION,
    path: COOKIE_POLICY_PATH,
    breadcrumbName: "Cookie Policy",
    keywords: ["cookie policy", "ResAvenue cookies", "tracking policy"],
  })
}

// ── Revenue Management ────────────────────────────────────────────────────────

const REVENUE_MANAGEMENT_TITLE =
  "Revenue Management — Intelligent Pricing for Hotels"
const REVENUE_MANAGEMENT_DESCRIPTION =
  "Maximize hotel revenue with AI-driven pricing, demand forecasting, and rate optimization from ResAvenue."
const REVENUE_MANAGEMENT_PATH = "/revenue-management"

export function getRevenueManagementPageSeo(): PageSeo {
  return buildPageSeo({
    title: REVENUE_MANAGEMENT_TITLE,
    description: REVENUE_MANAGEMENT_DESCRIPTION,
    path: REVENUE_MANAGEMENT_PATH,
    breadcrumbName: "Revenue Management",
    keywords: [
      "revenue management",
      "hotel pricing",
      "dynamic pricing",
      "hotel revenue optimization",
    ],
  })
}

// ── Tours & Packages ──────────────────────────────────────────────────────────

const TOURS_PACKAGES_TITLE = "Tours & Packages Engine — Hotel Experiences"
const TOURS_PACKAGES_DESCRIPTION =
  "Create and sell tours, packages, and guest experiences seamlessly with ResAvenue's Tours & Packages Engine."
const TOURS_PACKAGES_PATH = "/tours-packages"

export function getToursPackagesPageSeo(): PageSeo {
  return buildPageSeo({
    title: TOURS_PACKAGES_TITLE,
    description: TOURS_PACKAGES_DESCRIPTION,
    path: TOURS_PACKAGES_PATH,
    breadcrumbName: "Tours & Packages",
    keywords: [
      "tours and packages",
      "hotel packages",
      "guest experiences",
      "hospitality tours",
    ],
  })
}

// ── Analytics & Reporting ─────────────────────────────────────────────────────

const ANALYTICS_REPORTING_TITLE = "Analytics & Reporting — Hotel Insights"
const ANALYTICS_REPORTING_DESCRIPTION =
  "Turn hospitality data into actionable insights with ResAvenue analytics and reporting tools."
const ANALYTICS_REPORTING_PATH = "/analytics-reporting"

export function getAnalyticsReportingPageSeo(): PageSeo {
  return buildPageSeo({
    title: ANALYTICS_REPORTING_TITLE,
    description: ANALYTICS_REPORTING_DESCRIPTION,
    path: ANALYTICS_REPORTING_PATH,
    breadcrumbName: "Analytics & Reporting",
    keywords: [
      "hotel analytics",
      "hospitality reporting",
      "hotel insights",
      "performance analytics",
    ],
  })
}

// ── Guest CRM ─────────────────────────────────────────────────────────────────

const GUEST_CRM_TITLE = "Guest CRM & Loyalty — Hospitality Customer Platform"
const GUEST_CRM_DESCRIPTION =
  "Build guest loyalty and manage customer relationships with ResAvenue Guest CRM & Loyalty tools."
const GUEST_CRM_PATH = "/guest-crm"

export function getGuestCrmPageSeo(): PageSeo {
  return buildPageSeo({
    title: GUEST_CRM_TITLE,
    description: GUEST_CRM_DESCRIPTION,
    path: GUEST_CRM_PATH,
    breadcrumbName: "Guest CRM",
    keywords: [
      "guest CRM",
      "hotel loyalty",
      "hospitality CRM",
      "guest management",
    ],
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
  {
    path: ABOUT_US_PATH,
    title: ABOUT_US_TITLE,
    description: ABOUT_US_DESCRIPTION,
  },
  {
    path: PRICING_PATH,
    title: PRICING_TITLE,
    description: PRICING_DESCRIPTION,
  },
  {
    path: KNOWLEDGE_BASE_PATH,
    title: KNOWLEDGE_BASE_TITLE,
    description: KNOWLEDGE_BASE_DESCRIPTION,
  },
  { path: FAQS_PATH, title: FAQS_TITLE, description: FAQS_DESCRIPTION },
  {
    path: PARTNERS_PATH,
    title: PARTNERS_TITLE,
    description: PARTNERS_DESCRIPTION,
  },
  {
    path: CAREERS_PATH,
    title: CAREERS_TITLE,
    description: CAREERS_DESCRIPTION,
  },
  {
    path: PRIVACY_POLICY_PATH,
    title: PRIVACY_POLICY_TITLE,
    description: PRIVACY_POLICY_DESCRIPTION,
  },
  {
    path: TERMS_OF_SERVICE_PATH,
    title: TERMS_OF_SERVICE_TITLE,
    description: TERMS_OF_SERVICE_DESCRIPTION,
  },
  {
    path: COOKIE_POLICY_PATH,
    title: COOKIE_POLICY_TITLE,
    description: COOKIE_POLICY_DESCRIPTION,
  },
  {
    path: REVENUE_MANAGEMENT_PATH,
    title: REVENUE_MANAGEMENT_TITLE,
    description: REVENUE_MANAGEMENT_DESCRIPTION,
  },
  {
    path: TOURS_PACKAGES_PATH,
    title: TOURS_PACKAGES_TITLE,
    description: TOURS_PACKAGES_DESCRIPTION,
  },
  {
    path: ANALYTICS_REPORTING_PATH,
    title: ANALYTICS_REPORTING_TITLE,
    description: ANALYTICS_REPORTING_DESCRIPTION,
  },
  {
    path: GUEST_CRM_PATH,
    title: GUEST_CRM_TITLE,
    description: GUEST_CRM_DESCRIPTION,
  },
  // NOTE: /distributed-technology/ and /resource-page/ are intentionally
  // excluded here — they're disallowed in apps/ui/src/app/robots.ts and
  // dropped from STATIC_SEO_ROUTES until ready to be indexed. Re-add them
  // in all three places together once they're ready.
]
