type StructuredDataProps = {
  data: Record<string, unknown>
}

/** Renders JSON-LD structured data for a page. */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
