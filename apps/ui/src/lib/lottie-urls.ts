// Public URLs for every Lottie animation. All JSON is served statically from
// /public/assets, so we fetch by URL at runtime instead of static-importing —
// this keeps ~42 MB of animation data out of the JS bundles.
//
// `encodeURI` is applied to the two filenames that contain spaces. A literal
// "+" is valid inside a path segment and is left as-is by encodeURI.

const LANDING = "/assets/landing"
const ROOT = "/assets"

/* ── Above-the-fold heroes (eager + preloaded) ───────────────────────────── */
export const HERO_LAPTOP_URL = `${LANDING}/home_page_direct_connect_v3.json`
export const DC_HERO_OVERLAY_URL = `${ROOT}/direct-connect/hero_section.json`
export const CHANNEL_CONNECT_HERO_URL = `${ROOT}/channel-connect/hero_section.json`
export const DISTRIBUTED_TECH_GLOBE_URL = `${LANDING}/distribution-network.json`
export const RESOURCE_SYSTEM_MGMT_URL = `${LANDING}/system-management.json`

/* ── Landing bento — card "outer" animations (lazy, below the fold) ───────── */
export const DIRECT_CONNECT_OUTER_URL = `${LANDING}/direct_connect_outer.json`
export const CHANNEL_CONNECT_OUTER_URL = `${LANDING}/channel_connect_outer.json`
export const PROPERTY_MANAGEMENT_OUTER_URL = `${LANDING}/property-management.json`
export const GRAPH_URL = `${LANDING}/graph.json`
export const DISTRIBUTION_NETWORK_URL = `${LANDING}/distribution-network.json`
export const EVENT_OUTER_URL = `${LANDING}/event_and_ticketing_outer.json`
export const HOTEL_WEBSITE_OUTER_URL = `${LANDING}/hotel_website_builder_outer.json`

/* ── Landing bento — modal "inner" animations (on-demand, modal open only) ── */
export const DIRECT_CONNECT_INNER_URL = `${LANDING}/direct_connect_inner.json`
export const CHANNEL_CONNECT_INNER_URL = `${LANDING}/channel_connect_inner.json`
export const PROPERTY_MANAGEMENT_INNER_URL = `${LANDING}/property_management_inner.json`
export const DISTRIBUTION_NETWORK_INNER_URL = `${LANDING}/distribution_network_inner.json`
export const EVENT_INNER_URL = `${LANDING}/event_management_new.json`
export const HOTEL_WEBSITE_INNER_URL = `${LANDING}/hotel_website_builder_inner.json`
export const REVENUE_MANAGEMENT_INNER = `${LANDING}/revenue_management_inner.json`

/* ── Landing solution section (lazy) ─────────────────────────────────────── */
export const PILLES_URL = `${LANDING}/pills_animation.json`

/* ── /direct-connect route sections (lazy) ───────────────────────────────── */
export const DC_TRAFFIC_REPORT_URL = `${ROOT}/traffic_report_work.json`
export const CONVERSION_FIRST_INNER = `${ROOT}/direct-connect/conversion_first_booking_inner.json`
export const CONVERSION_FIRST_OUTER = `${ROOT}/direct-connect/conversion_first_booking_outer.json`
export const DISCOUNT_INNER = `${ROOT}/direct-connect/discount_promotion_inner.json`
export const DISCOUNT_OUTER = `${ROOT}/direct-connect/discount_promotion_outer.json`
export const GOOGLE_HOTEL_ADS_OUTER = `${ROOT}/direct-connect/google_hotel_ads_outer.json`
export const INTELLIGENT_ANALYTICS_OUTER = `${ROOT}/direct-connect/intelligence_analytics_outer.json`
export const INTELLIGENT_ANALYTICS_INNER = `${ROOT}/direct-connect/intelligence_analytics_inner.json`
export const UNLOCK_REVENUE_OUTER = `${ROOT}/direct-connect/unlock_new_revenue_outer.json`
export const UNLOCK_REVENUE_INNER = `${ROOT}/direct-connect/unlock_new_revenue_inner.json`
export const PAYMENT_OUTER = `${ROOT}/direct-connect/payment_security_outer.json`
export const PAYMENT_INNER = `${ROOT}/direct-connect/payment_security_inner.json`
export const AGENT = `${ROOT}/direct-connect/agent.json`

/* ── /channel-connect route sections (lazy) ──────────────────────────────── */
export const CHANNEL_CONNECT_RESERVATION_URL = `${ROOT}/channel-connect/central_reservation.json`
export const CHANNEL_CONNECT_DATA_DRIVEN_URL = `${ROOT}/channel-connect/date_driven_decisions.json`
export const CONTROL_YOUR_PORTFOLIO_URL = `${ROOT}/channel-connect/control_your_portfolio.json`
