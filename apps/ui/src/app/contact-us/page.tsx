import type { Metadata } from "next"

import ContactUsWrapper from "@/components/ContactUs/ContactUsWrapper"
import { StructuredData } from "@/components/seo/StructuredData"
import { getContactUsPageSeo } from "@/lib/seo/pages"

export function generateMetadata(): Metadata {
  return getContactUsPageSeo().metadata
}

export default function ContactUsPage() {
  const seo = getContactUsPageSeo()

  return (
    <>
      <StructuredData data={seo.schema} />
      <ContactUsWrapper />
    </>
  )
}
