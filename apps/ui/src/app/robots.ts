import type { MetadataRoute } from "next"

import { getEnvVar } from "@/lib/env-vars"
import { isProduction } from "@/lib/general-helpers"

/**
 * Marketing pages that are ready to be crawled/indexed. Everything else is
 * disallowed by default (see `disallow: "/"` below) until it's reviewed and
 * added here — robots.txt path matching is prefix-based, and the most
 * specific matching rule wins, so these `Allow` entries carve out exceptions
 * to the blanket `Disallow: /`.
 *
 * The homepage entry MUST be anchored with `$` (`/$`, not `/`) — an
 * unanchored `Allow: /` is a *prefix* match that matches every URL on the
 * site, which would silently allow everything and defeat the blanket
 * `Disallow: /` below entirely.
 *
 * Paths have no trailing slash to match the URLs Next.js actually serves
 * (trailingSlash defaults to false — "/path/" 308-redirects to "/path").
 *
 * Currently excludes `/distributed-technology` and `/resource-page`, which
 * aren't ready to be indexed yet.
 */
const ALLOWED_ROBOTS_PATHS = [
  "/$",
  "/channel-connect",
  "/direct-connect",
  "/contact-us",
  "/event-booking",
  "/hotel-website-builder",
  "/property-management",
  "/mobile-app",
]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getEnvVar("APP_PUBLIC_URL")

  if (!isProduction()) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: { userAgent: "*", allow: ALLOWED_ROBOTS_PATHS, disallow: "/" },
    ...(baseUrl
      ? { sitemap: new URL("./sitemap.xml", baseUrl).toString() }
      : {}),
  }
}
