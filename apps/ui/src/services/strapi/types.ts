/**
 * Generic Strapi v5 response envelope and shared content-type primitives.
 *
 * Strapi v5 dropped the `attributes` wrapper from v4 — entity fields are now
 * flat on the object alongside `id` / `documentId`. If your Strapi is still v4,
 * wrap fields under `attributes` in the per-entity types.
 */

export interface StrapiPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface StrapiMeta {
  pagination?: StrapiPagination
}

/** Response shape for a single-entity endpoint (e.g. `/api/global`). */
export interface StrapiResponse<T> {
  data: T
  meta: StrapiMeta
}

/** Response shape for a collection endpoint (e.g. `/api/pages`). */
export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: StrapiMeta
}

/** Base fields present on every Strapi content type. Extend this per entity. */
export interface StrapiEntity {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface StrapiMediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

/** Strapi media (uploaded file) shape. */
export interface StrapiMedia extends StrapiEntity {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: Record<string, StrapiMediaFormat> | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
}

/** Strapi error envelope (`{ data: null, error: { ... } }`). */
export interface StrapiError {
  status: number
  name: string
  message: string
  details?: Record<string, unknown>
}
