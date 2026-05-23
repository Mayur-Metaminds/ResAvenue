import type { Metadata } from "next"

import LandingPage from "@/components/landing/LandingPage"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | ${siteConfig.tagline}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function Page() {
  return <LandingPage />
}
