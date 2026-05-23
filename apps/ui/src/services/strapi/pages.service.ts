import { strapiFetch } from "./client"
import type {
  StrapiCollectionResponse,
  StrapiEntity,
  StrapiMedia,
} from "./types"

/**
 * Example content type. Adapt fields to match your Strapi `Page` schema.
 *
 * If you're on Strapi v4, wrap content fields under an `attributes` object:
 *   `id`, `documentId`, …base… + `attributes: { title, slug, … }`.
 */
export interface Page extends StrapiEntity {
  title: string
  slug: string
  description?: string
  seoImage?: StrapiMedia
}

/** Fetch all pages. Tagged for global + per-collection revalidation. */
export function getPages() {
  return strapiFetch<StrapiCollectionResponse<Page>>("/pages", {
    query: { populate: "*" },
    tags: ["strapi", "pages"],
  })
}

/** Fetch one page by slug. Returns `null` when not found. */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const res = await strapiFetch<StrapiCollectionResponse<Page>>("/pages", {
    query: {
      filters: { slug: { $eq: slug } },
      populate: "*",
      pagination: { limit: 1 },
    },
    tags: ["strapi", "pages", `pages:${slug}`],
  })

  return res.data[0] ?? null
}
