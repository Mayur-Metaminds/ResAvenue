import { siteConfig } from "@/config/site"
import { getSiteUrl } from "@/constants/seo.constants"
import { SEO_PAGE_ENTRIES } from "@/lib/seo/pages"

/**
 * llms.txt — an emerging (informal, not yet a formal web standard) convention
 * that gives LLM/AI crawlers a concise, structured summary of the site: what
 * it is, and links to its key pages. Distinct from robots.txt, which controls
 * crawling/indexing permissions rather than describing content.
 *
 * Generated from the same SEO manifest (`lib/seo/pages.ts`) used for
 * per-page metadata, so it can't drift out of sync with the real page copy.
 */
export function GET() {
  const siteUrl = getSiteUrl()

  const [home, ...rest] = SEO_PAGE_ENTRIES

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    home ? home.title : siteConfig.tagline,
    "",
    "## Products",
    "",
    ...rest.map(
      ({ path, title, description }) =>
        `- [${title}](${siteUrl}${path}): ${description}`
    ),
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
