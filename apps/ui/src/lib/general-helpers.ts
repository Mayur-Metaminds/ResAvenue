import { getEnvVar } from "@/lib/env-vars"

import { setupDayJs } from "./dates"

// Determines whether this deployment should be treated as "production" for
// SEO purposes (indexing, sitemap, robots.txt). Checked in priority order:
//
// 1. APP_ENV — explicit manual override, wins if set.
// 2. VERCEL_ENV — Vercel sets NODE_ENV=production for EVERY build, including
//    preview/branch deployments, so NODE_ENV alone can't tell a preview URL
//    apart from the real production domain on Vercel. VERCEL_ENV is the
//    correct signal there ("production" | "preview" | "development").
// 3. NODE_ENV — fallback for non-Vercel deployments (e.g. the Docker image),
//    where a real production build/start reliably sets NODE_ENV=production
//    with no extra configuration needed.
export const isProduction = () => {
  const appEnv = getEnvVar("APP_ENV")

  if (appEnv) return appEnv === "production"

  const vercelEnv = getEnvVar("VERCEL_ENV")

  if (vercelEnv) return vercelEnv === "production"

  return getEnvVar("NODE_ENV") === "production"
}

export const isTesting = () => getEnvVar("APP_ENV") === "testing"

export const isDevelopment = () => getEnvVar("NODE_ENV") === "development"

export const setupLibraries = () => {
  setupDayJs()
}

export const removeThisWhenYouNeedMe = (functionName: string) => {
  if (
    !isDevelopment() ||
    getEnvVar("NEXT_PUBLIC_PREVENT_UNUSED_FUNCTIONS_ERROR_LOGS")
  ) {
    return
  }

  console.warn(
    `TODO: Delete 'removeThisWhenYouNeedMe' call from '${functionName}' and confirm the usage.`
  )
}

export const safeJSONParse = <T>(json: string): T => {
  try {
    return JSON.parse(json) as T
  } catch (e) {
    console.error("Error parsing JSON", e)

    return {} as T
  }
}
