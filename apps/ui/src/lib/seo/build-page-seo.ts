import type { Metadata } from "next"

import { getDefaultOgImage, getSiteUrl, SITE_NAME } from "@/constants/seo.constants"
import { siteConfig } from "@/config/site"

export type PageSeoInput = {
  title: string
  description: string
  /** Path including leading slash, e.g. `/direct-connect/` */
  path: string
  /** Label for the breadcrumb trail (second item). */
  breadcrumbName: string
  keywords?: string[]
  openGraphType?: "website" | "article"
  /** When true, title is used as-is (for the home page). */
  absoluteTitle?: boolean
}

export type PageSeo = {
  metadata: Metadata
  schema: Record<string, unknown>
}

// Next.js (trailingSlash: false, the default) 308-redirects "/path/" to
// "/path" — confirmed live. Canonical/OG/sitemap URLs must match the URL
// actually served, or they point at a redirecting (non-final) URL.
function normalizePath(path: string): string {
  if (path === "/") return "/"

  return path.endsWith("/") ? path.slice(0, -1) : path
}

function pageUrl(path: string): string {
  const siteUrl = getSiteUrl()
  const normalized = normalizePath(path)

  return normalized === "/" ? `${siteUrl}/` : `${siteUrl}${normalized}`
}

export function buildPageSeo(input: PageSeoInput): PageSeo {
  const {
    title,
    description,
    path,
    breadcrumbName,
    keywords,
    openGraphType = "website",
    absoluteTitle = false,
  } = input

  const url = pageUrl(path)
  const ogImage = getDefaultOgImage()

  const metadata: Metadata = {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: siteConfig.locale,
      type: openGraphType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: siteConfig.social.twitter.handle,
    },
  }

  const schema = buildPageSchema({ title, path, breadcrumbName, url })

  return { metadata, schema }
}

type PageSchemaInput = {
  title: string
  path: string
  breadcrumbName: string
  url: string
}

function buildPageSchema({
  title,
  path,
  breadcrumbName,
  url,
}: PageSchemaInput): Record<string, unknown> {
  const siteUrl = getSiteUrl()
  const isHome = normalizePath(path) === "/"

  const breadcrumbItems = isHome
    ? [{ "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` }]
    : [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: breadcrumbName,
        },
      ]

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: title,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      breadcrumb: {
        "@id": `${url}#breadcrumb`,
      },
      inLanguage: "en-US",
      potentialAction: [
        {
          "@type": "ReadAction",
          target: [url],
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbItems,
    },
  ]

  if (isHome) {
    graph.push(
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: SITE_NAME,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteConfig.organization.legalName,
        url: siteUrl,
        logo: `${siteUrl}${siteConfig.logo}`,
        foundingDate: siteConfig.organization.foundingDate,
        contactPoint: {
          "@type": "ContactPoint",
          email: siteConfig.contact.email,
          contactType: "customer support",
        },
        sameAs: [
          siteConfig.social.twitter.url,
          siteConfig.social.linkedin.url,
        ],
      }
    )
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  }
}

/**
 * Static marketing routes included in sitemap.xml.
 *
 * Kept in sync with `DISALLOWED_ROBOTS_PATHS` in `apps/ui/src/app/robots.ts`
 * — only pages allowed to be crawled should be advertised here. Currently
 * excludes `/distributed-technology` and `/resource-page`, which aren't
 * ready to be indexed yet.
 */
export const STATIC_SEO_ROUTES: Array<{
  path: string
  changeFrequency: "weekly" | "monthly"
  priority: number
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/direct-connect", changeFrequency: "monthly", priority: 0.9 },
  { path: "/channel-connect", changeFrequency: "monthly", priority: 0.9 },
  { path: "/property-management", changeFrequency: "monthly", priority: 0.9 },
  { path: "/hotel-website-builder", changeFrequency: "monthly", priority: 0.9 },
  { path: "/mobile-app", changeFrequency: "monthly", priority: 0.8 },
  { path: "/event-booking", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.7 },
]
