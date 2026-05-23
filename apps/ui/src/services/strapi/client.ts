import qs from "qs"

import type { StrapiError } from "./types"

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  process.env.STRAPI_URL ??
  "http://localhost:1337"

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export interface StrapiFetchOptions extends Omit<RequestInit, "body"> {
  /** Query params — serialized with `qs` so Strapi's filters/populate/sort syntax works. */
  query?: Record<string, unknown>
  /** Request body (POST/PUT). Will be JSON-stringified. */
  body?: unknown
  /**
   * Next.js cache tags for this request. Defaults to `["strapi"]` so the
   * global Strapi revalidation webhook can purge it. Add more specific tags
   * (e.g. `["strapi", "pages", "pages:about"]`) to enable narrower purges.
   */
  tags?: string[]
  /**
   * ISR interval in seconds. Default 3600 (1 hour).
   * Pass `false` to opt out of caching (useful for authenticated calls).
   */
  revalidate?: number | false
}

export class StrapiHttpError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: StrapiError
  ) {
    super(message)
    this.name = "StrapiHttpError"
  }
}

/**
 * Single Strapi fetch wrapper. Handles base URL, auth token, query
 * serialization, error normalization, and Next.js fetch caching so the
 * revalidation webhook (`/api/revalidate`) can purge tagged responses.
 *
 * Always returns the parsed JSON. Always throws `StrapiHttpError` on non-2xx.
 *
 * @example
 * const pages = await strapiFetch<StrapiCollectionResponse<Page>>("/pages", {
 *   query: { filters: { slug: { $eq: "home" } }, populate: "*" },
 *   tags: ["strapi", "pages"],
 * })
 */
export async function strapiFetch<T>(
  path: string,
  {
    query,
    body,
    tags = ["strapi"],
    revalidate = 3600,
    headers,
    ...init
  }: StrapiFetchOptions = {}
): Promise<T> {
  const url = new URL(
    `/api${path.startsWith("/") ? path : `/${path}`}`,
    STRAPI_URL
  )
  if (query) {
    url.search = qs.stringify(query, { encodeValuesOnly: true })
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : null),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    next: {
      tags,
      ...(revalidate !== false ? { revalidate } : null),
    },
  })

  if (!response.ok) {
    let details: StrapiError | undefined
    try {
      const json = (await response.json()) as { error?: StrapiError }
      details = json?.error
    } catch {
      // Body wasn't JSON — swallow and fall back to status text.
    }
    throw new StrapiHttpError(
      `Strapi ${init.method ?? "GET"} ${path} → ${response.status} ${response.statusText}`,
      response.status,
      details
    )
  }

  return (await response.json()) as T
}
