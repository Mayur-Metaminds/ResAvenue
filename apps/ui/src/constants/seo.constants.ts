import { siteConfig } from "@/config/site"
import { getEnvVar } from "@/lib/env-vars"

const FALLBACK_SITE_URL = "http://localhost:3000"

/** Canonical site origin from APP_PUBLIC_URL — no trailing slash. */
export function getSiteUrl(): string {
  const url = getEnvVar("APP_PUBLIC_URL") ?? FALLBACK_SITE_URL

  return url.replace(/\/$/, "")
}

export const SITE_NAME = siteConfig.name

export function getDefaultOgImage(): string {
  return `${getSiteUrl()}${siteConfig.ogImage}`
}
