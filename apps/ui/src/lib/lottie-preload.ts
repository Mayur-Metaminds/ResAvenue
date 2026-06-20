import { preload } from "react-dom"

/**
 * Warm the browser cache for an above-the-fold Lottie JSON so its download
 * starts as early as possible — ideally before hydration. Emits
 * `<link rel="preload" as="fetch">` into the document head.
 *
 * No `crossOrigin` is set: the assets are same-origin (`/assets/...`) and
 * `loadLottie()` fetches them in same-origin mode, so an anonymous/CORS preload
 * key would mismatch and cause a double download. Keeping both same-origin lets
 * the browser serve the later `fetch()` straight from this preload entry.
 *
 * Safe to call during render (React dedupes by href and hoists into <head>).
 */
export function preloadLottie(href: string): void {
  preload(href, { as: "fetch" })
}
