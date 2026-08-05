import type { MetadataRoute } from "next"

import { getEnvVar } from "@/lib/env-vars"
import { isProduction } from "@/lib/general-helpers"

/**
 * Pages that aren't ready to be indexed yet — everything else is crawlable
 * by default. This is a denylist (explicit `Disallow` per path) rather than
 * an allowlist with a blanket `Disallow: /` + `Allow` overrides, because
 * some crawlers/SEO tools don't implement the "most specific rule wins"
 * precedence algorithm (or the `$` end-anchor) correctly — they see a bare
 * `Disallow: /` line anywhere in the file and treat the entire site as
 * blocked, regardless of any `Allow` exceptions. A pure denylist has no such
 * line, so it can't be misread that way by any parser.
 *
 * Paths have no trailing slash to match the URLs Next.js actually serves
 * (trailingSlash defaults to false — "/path/" 308-redirects to "/path").
 */
const DISALLOWED_ROBOTS_PATHS = ["/distributed-technology", "/resource-page"]

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getEnvVar("APP_PUBLIC_URL")

  if (!isProduction()) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: { userAgent: "*", disallow: DISALLOWED_ROBOTS_PATHS },
    ...(baseUrl
      ? { sitemap: new URL("./sitemap.xml", baseUrl).toString() }
      : {}),
  }
}
