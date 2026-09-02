"use client"

import dynamic from "next/dynamic"
import type { CSSProperties, ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

import { loadLottie, peekLottie } from "@/lib/lottie-cache"
import { cn } from "@/lib/styles"

// lottie-react touches the DOM, so it stays client-only and code-split exactly
// as every call site did before this component existed.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type LottieJson = Record<string, unknown>

type RendererSettings = {
  preserveAspectRatio?: string
  [key: string]: unknown
}

export type LottiePriority = "eager" | "lazy" | "on-demand"

export interface LazyLottieProps {
  /** Public URL under /assets, e.g. "/assets/landing/graph.json". */
  src: string
  /**
   * - "eager": fetch on mount (above-the-fold heroes).
   * - "lazy": fetch when the element nears the viewport (below-the-fold cards).
   * - "on-demand": fetch only while `active` is true (modals, which mount on open).
   */
  priority: LottiePriority
  /** For "on-demand": fetching starts when this is true. Defaults to true so a
      modal that only mounts when open fetches as soon as it appears. */
  active?: boolean
  loop?: boolean
  autoplay?: boolean
  /** Merged onto the wrapper; the inner Lottie is always h-full w-full. */
  className?: string
  /** Merged onto the inner Lottie element (defaults to `h-full w-full`). Use to
      transform just the animation, e.g. `scale-110`, without affecting the
      wrapper box. */
  lottieClassName?: string
  rendererSettings?: RendererSettings
  /** IntersectionObserver margin for "lazy". Default "600px" (load before visible). */
  rootMargin?: string
  /** Rendered until the animation data is ready (skeleton/placeholder). */
  fallback?: ReactNode
  /** Honour prefers-reduced-motion by showing a static first frame. Default true. */
  respectReducedMotion?: boolean
  /** Static image shown while loading AND if loading ultimately fails — graceful
      degradation on slow/flaky networks. Pass a card's `imagePlaceholder`. */
  posterSrc?: string
  /** Subtle pulsing skeleton while loading (when no `posterSrc`). Default true. */
  showSkeleton?: boolean
  /** Called once with the parsed JSON when it loads (e.g. to read native w/h). */
  onReady?: (data: LottieJson) => void
  style?: CSSProperties
  "aria-label"?: string
}

export function LazyLottie({
  src,
  priority,
  active = true,
  loop = true,
  autoplay = true,
  className,
  lottieClassName,
  rendererSettings,
  rootMargin = "600px",
  fallback = null,
  respectReducedMotion = true,
  posterSrc,
  showSkeleton = true,
  onReady,
  style,
  "aria-label": ariaLabel,
}: LazyLottieProps) {
  // Start from cache when available so a remount (reopened modal, scrolled-back
  // card) paints instantly with no flash and no refetch.
  const [data, setData] = useState<LottieJson | null>(() => peekLottie(src) ?? null)
  const [errored, setErrored] = useState(false)
  const retriedRef = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  // Fire onReady for data already present from the cache on first render.
  useEffect(() => {
    if (data) onReadyRef.current?.(data)
    // Only on mount / when data first becomes available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const shouldFetchNow =
    priority === "eager" || (priority === "on-demand" && active)

  // eager + on-demand: fetch as soon as allowed.
  useEffect(() => {
    if (data || !shouldFetchNow) return
    let alive = true
    loadLottie(src)
      .then((d) => {
        if (alive) setData(d)
      })
      .catch(() => {
        if (alive) setErrored(true)
      })

    return () => {
      alive = false
    }
  }, [src, shouldFetchNow, data])

  // lazy: gate the fetch on the element approaching the viewport.
  useEffect(() => {
    if (data || priority !== "lazy") return
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          loadLottie(src)
            .then(setData)
            .catch(() => setErrored(true))
        }
      },
      { rootMargin }
    )
    io.observe(el)

    return () => io.disconnect()
  }, [src, priority, rootMargin, data])

  // One delayed retry if loading failed while mounted. loadLottie already
  // retried 3× with backoff, so this rides out a longer network outage that
  // recovers after the component is already on screen.
  useEffect(() => {
    if (!errored || retriedRef.current) return
    retriedRef.current = true
    const t = setTimeout(() => {
      loadLottie(src)
        .then((d) => {
          setData(d)
          setErrored(false)
        })
        .catch(() => { })
    }, 4000)

    return () => clearTimeout(t)
  }, [errored, src])

  const reduceMotion =
    respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)} style={style}>
      {data ? (
        <Lottie

          animationData={data}
          loop={reduceMotion ? false : loop}
          autoplay={reduceMotion ? false : autoplay}
          className={cn("h-full w-full", lottieClassName)}
          rendererSettings={rendererSettings}
          aria-label={ariaLabel}
          role={ariaLabel ? "img" : undefined}
        />
      ) : posterSrc ? (
        // Static poster — covers both the loading window and a terminal failure.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt={ariaLabel ?? ""}
          aria-hidden={ariaLabel ? undefined : true}
          className="h-full w-full object-contain"
        />
      ) : errored ? (
        // Terminal failure with no poster: show the static fallback, never a
        // skeleton that would pulse forever as if still loading.
        fallback
      ) : showSkeleton ? (
        <div
          aria-hidden
          className="h-full w-full animate-pulse rounded-[inherit] bg-linear-to-br from-white/5 to-black/5"
        />
      ) : (
        fallback
      )}
    </div>
  )
}
