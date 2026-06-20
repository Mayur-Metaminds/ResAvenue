// Module-level cache for Lottie JSON loaded by public URL.
//
// Why: the animation JSON files (41.8 MB total) used to be statically imported,
// which bundled their full payload into the JS chunks. Instead we serve them
// from /public/assets and fetch on demand. This cache guarantees one network
// fetch + one parse per URL, shared across every LazyLottie instance and across
// mount/unmount cycles for the page's lifetime.

type LottieJson = Record<string, unknown>

const promises = new Map<string, Promise<LottieJson>>()
const resolved = new Map<string, LottieJson>()

const MAX_ATTEMPTS = 3
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * Fetch + parse one Lottie JSON, retrying transient failures with exponential
 * backoff (400ms, 800ms). Rides out flaky-network blips on live connections so
 * an animation isn't permanently blank after a single dropped request.
 */
async function fetchLottie(url: string): Promise<LottieJson> {
  let lastError: unknown
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Lottie fetch failed (${res.status}): ${url}`)
      }

      return (await res.json()) as LottieJson
    } catch (err) {
      lastError = err
      if (attempt < MAX_ATTEMPTS - 1) await delay(400 * 2 ** attempt)
    }
  }

  throw lastError
}

/**
 * Fetch (and parse) a Lottie JSON by public URL exactly once. Subsequent calls
 * for the same URL return the in-flight or settled promise. A matching
 * `preloadLottie()` warms the HTTP cache so this fetch is served from it.
 */
export function loadLottie(url: string): Promise<LottieJson> {
  const existing = promises.get(url)
  if (existing) return existing

  const p = fetchLottie(url)
    .then((json) => {
      resolved.set(url, json)

      return json
    })
    .catch((err) => {
      // Evict on failure so a later mount/retry re-fetches instead of caching a reject.
      promises.delete(url)
      throw err
    })

  promises.set(url, p)

  return p
}

/** Synchronous peek — lets a remount render instantly if already loaded (no flash). */
export function peekLottie(url: string): LottieJson | undefined {
  return resolved.get(url)
}

/** Imperatively warm the cache (e.g. on hover-intent before a modal opens). */
export function prefetchLottie(url: string): void {
  void loadLottie(url)
}
