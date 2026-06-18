import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import Script from "next/script"

import { Navbar } from "@/components/common/Navbar"
import { siteConfig } from "@/config/site"
import { fontRoboto } from "@/lib/fonts"
import { cn } from "@/lib/styles"

/**
 * App-wide default metadata. Per-page metadata in `app/<route>/page.tsx`
 * overrides any of these fields. Title uses a template so child pages
 * automatically get " / ResAvenue" appended.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.social.twitter.handle,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

// Runtime env vars exposed to the client via window.CSR_CONFIG.
// Keep in sync with the consumer side (getEnvVar helper).
const CSR_ENVs = [
  "NODE_ENV",
  "DEBUG_STRAPI_CLIENT_API_CALLS",
  "SHOW_NON_BLOCKING_ERRORS",
  "APP_PUBLIC_URL",
  "IMGPROXY_URL",
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id="csr-config" strategy="beforeInteractive">
          {`
            window.CSR_CONFIG = window.CSR_CONFIG || {};
            window.CSR_CONFIG = ${JSON.stringify(
              CSR_ENVs.reduce(
                (acc, curr) => {
                  acc[curr] = process.env?.[curr]

                  return acc
                },
                {} as Record<string, string | undefined>
              )
            )};
          `}
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontRoboto.variable
        )}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
