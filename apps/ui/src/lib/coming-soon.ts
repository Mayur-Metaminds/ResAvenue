/**
 * Routes that remain fully live. Every other marketing page route
 * renders the shared Coming Soon experience.
 */
export const LIVE_ROUTES = [
  "/",
  "/channel-connect",
  "/direct-connect",
  "/contact-us",
] as const

export type ComingSoonRouteKey =
  | "mobile-app"
  | "property-management"
  | "hotel-website-builder"
  | "event-booking"
  | "distributed-technology"
  | "resource-page"
  | "about-us"
  | "pricing"
  | "knowledge-base"
  | "faqs"
  | "partners"
  | "careers"
  | "privacy-policy"
  | "terms-of-service"
  | "cookie-policy"
  | "revenue-management"
  | "tours-packages"
  | "analytics-reporting"
  | "guest-crm"
