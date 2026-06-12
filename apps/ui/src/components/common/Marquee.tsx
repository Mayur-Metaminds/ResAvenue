"use client"

import type * as React from "react"
import { useId } from "react"

import { cn } from "@/lib/styles"

export type MarqueeProps<T> = {
  /** Items to render in the marquee. The list is duplicated under the hood for seamless looping. */
  items: T[]
  /** Render function for a single item. Don't set `key` on the returned node — the wrapper does that. */
  renderItem: (item: T, index: number) => React.ReactNode
  /** Stable key per item. Falls back to its index. */
  getKey?: (item: T, index: number) => React.Key
  /** Seconds for one full loop. Default 40. */
  durationSeconds?: number
  /** Pause the marquee while the user hovers over any item. Default true. */
  pauseOnHover?: boolean
  /** Apply a horizontal gradient mask so items fade at the edges. Default true. */
  edgeFade?: boolean
  /** Gap (in px) between items. Also used as trailing padding so the loop joins seamlessly. */
  gapPx?: number
  /** Optional gap (in px) used at the `md` breakpoint (>=768px) and above. Falls back to `gapPx` when omitted. */
  mdGapPx?: number
  /**
   * How many times to render the item list back-to-back in the track. Must be
   * even so `translateX(-50%)` lands exactly on a copy boundary. Increase if
   * the track ever ends up narrower than the viewport (empty gap before
   * looping). Default 6 — matches a wide-monitor viewport for typical content.
   */
  repetitions?: number
  /** Background color applied to the outer wrapper (any CSS color string). */
  backgroundColor?: string
  /** Outer wrapper className. */
  className?: string
  /** Optional aria-label on the outer wrapper. Adds `role="region"` when provided. */
  ariaLabel?: string
}

/**
 * Generic horizontal marquee. The item list is rendered twice in a row and the
 * track is animated `translateX(0 → -50%)` so the loop point is invisible.
 *
 * Each instance gets its own keyframe name (derived from `useId`) so multiple
 * marquees on the same page don't share animation state.
 */
export function Marquee<T>({
  items,
  renderItem,
  getKey,
  durationSeconds = 40,
  pauseOnHover = true,
  edgeFade = true,
  gapPx = 24,
  mdGapPx,
  repetitions = 6,
  backgroundColor,
  className,
  ariaLabel,
}: MarqueeProps<T>) {
  // `repetitions` must be even so the `translateX(-50%)` keyframe lands
  // exactly on a copy boundary — odd counts leave the loop mid-content.
  const repeats = Math.max(2, repetitions % 2 === 0 ? repetitions : repetitions + 1)
  const safeId = useId().replace(/:/g, "")
  const animationName = `marquee-${safeId}`
  const trackClass = `marquee-track-${safeId}`

  return (
    <div
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden", className)}
      style={{
        ...(backgroundColor ? { backgroundColor } : null),
        ...(edgeFade
          ? {
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }
          : null),
      }}
    >
      <div
        className={cn(
          trackClass,
          "flex w-max",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          gap: "var(--marquee-gap)",
          paddingRight: "var(--marquee-gap)",
          // Set individual animation-* properties (not the `animation`
          // shorthand) so the `hover:[animation-play-state:paused]` class can
          // actually override the play-state without the shorthand re-asserting
          // `running` at higher specificity.
          animationName,
          animationDuration: `${durationSeconds}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {Array.from({ length: repeats }).flatMap((_, repeat) =>
          items.map((item, idx) => {
            const key = getKey ? getKey(item, idx) : idx
            return (
              <div
                key={`${repeat}-${String(key)}`}
                aria-hidden={repeat === 0 ? undefined : true}
                className="shrink-0"
              >
                {renderItem(item, idx)}
              </div>
            )
          })
        )}
      </div>

      <style>{`
        @keyframes ${animationName} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .${trackClass} { --marquee-gap: ${gapPx}px; }
        ${mdGapPx != null
          ? `@media (min-width: 768px) { .${trackClass} { --marquee-gap: ${mdGapPx}px; } }`
          : ""}
      `}</style>
    </div>
  )
}
