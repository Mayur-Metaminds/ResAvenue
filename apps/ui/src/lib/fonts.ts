import { Plus_Jakarta_Sans, Roboto, Source_Sans_3 } from "next/font/google"

export const fontRoboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-roboto",
})

/**
 * Self-hosted via `next/font` (not raw `@font-face` in globals.css). This:
 *   - Downloads + serves the font files at build time — no request to
 *     Google, no render-blocking external stylesheet.
 *   - Guarantees `font-display: swap` (Next.js sets it automatically).
 *   - Generates a size-adjusted fallback (ascent/descent/size-adjust) that
 *     matches this font's metrics, minimizing the layout shift that
 *     happens when the real font swaps in over the fallback (CLS).
 *
 * Weights below cover every `--*-weight` used in the typography scale
 * in `globals.css` (400/500/600/700 across h1/h2/body1-5).
 */
export const fontPlusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

export const fontSourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans-3",
  display: "swap",
})
