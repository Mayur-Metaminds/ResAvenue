import type { Metadata } from "next"

import ContactUsWrapper from "@/components/ContactUs/ContactUsWrapper"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Us by ${siteConfig.name}.`,
}

export default function ContactUsPage() {
  return <ContactUsWrapper />
}
