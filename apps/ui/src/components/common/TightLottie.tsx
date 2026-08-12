"use client"

import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react"

import {
  LazyLottie,
  type LazyLottieProps,
  type LottiePriority,
} from "@/components/common/LazyLottie"
import {
  cropLottieSvg,
  getCroppedAspectRatio,
  getLottieCrop,
  getLottiePreserveAspectRatio,
  type LottieCrop,
} from "@/lib/lottie-crops"
import { cn } from "@/lib/styles"

type CropAlign = "top" | "center" | "bottom"

const COVER_PRESERVE: Record<CropAlign, string> = {
  top: "xMidYMin slice",
  center: "xMidYMid slice",
  bottom: "xMidYMax slice",
}

const TRANSFORM_ORIGIN: Record<CropAlign, string> = {
  top: "top center",
  center: "center center",
  bottom: "bottom center",
}

export type TightLottieFit = "contain" | "cover" | "frame"

export type TightLottieProps = {
  /** Public Lottie JSON URL (same as LazyLottie). */
  src: string
  priority?: LottiePriority
  loop?: boolean
  active?: boolean
  /**
   * - `frame` (recommended): crops artboard padding via `lottie-crops` config so
   *   the box behaves like a normal div with predictable aspect ratio.
   * - `contain`: shows the full artboard — may include transparent padding.
   * - `cover`: fills a fixed aspect frame; may clip visible content.
   */
  fit?: TightLottieFit
  /** Override crop preset for this instance (otherwise read from `lottie-crops`). */
  crop?: LottieCrop
  /**
   * CSS aspect-ratio for the visible frame (cover mode only), e.g. `"16 / 8"`.
   * Prefer responsive Tailwind `aspect-*` classes via `className`.
   */
  aspectRatio?: string
  /**
   * Extra zoom on top of cover-fit (cover mode only).
   * Override per breakpoint with `--tight-zoom` in `className`.
   */
  zoom?: number
  /** Which edge stays anchored while cropping (cover mode only). */
  align?: CropAlign
  /** Scale visible content inside a frame (frame mode only). Default 1. */
  frameZoom?: number
  /**
   * Tailwind classes on the outer frame (e.g. `-mt-[6%] -mb-[10%] md:-mb-[8%]`).
   * Use for responsive spacing tweaks without inline styles.
   */
  frameClassName?: string
  /** Merged onto the outer frame. */
  className?: string
  /** Subtle drop shadow on the frame. */
  dropShadow?: boolean
} & Pick<LazyLottieProps, "posterSrc" | "aria-label" | "showSkeleton">

/**
 * Renders a Lottie inside a controlled frame.
 *
 * Wraps LazyLottie only — does not modify it.
 */
export function TightLottie({
  src,
  priority = "lazy",
  loop = true,
  active,
  fit = "cover",
  crop: cropOverride,
  aspectRatio,
  zoom = 1,
  align = "center",
  frameZoom = 1,
  frameClassName,
  className,
  dropShadow = false,
  posterSrc,
  showSkeleton,
  "aria-label": ariaLabel,
}: TightLottieProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const crop = cropOverride ?? getLottieCrop(src)

  const defaultFrameAspect = useMemo(() => {
    if (fit !== "frame" || !crop) return undefined
    // Known artboard for dashboard JSON — avoids layout shift before onReady.
    return getCroppedAspectRatio(src, { w: 1797, h: 1740 })
  }, [crop, fit, src])

  const [frameAspect, setFrameAspect] = useState<string | undefined>(
    defaultFrameAspect
  )

  const enforceFrameCrop = useCallback(
    (data: unknown) => {
      if (fit !== "frame" || !crop) return

      const artboard =
        data && typeof data === "object"
          ? {
              w: (data as { w?: number }).w ?? 0,
              h: (data as { h?: number }).h ?? 0,
            }
          : undefined

      if (artboard && artboard.w > 0 && artboard.h > 0) {
        const nextAspect = getCroppedAspectRatio(src, artboard)
        if (nextAspect) setFrameAspect(nextAspect)
      }

      cropLottieSvg(frameRef.current, data, crop)
      requestAnimationFrame(() => cropLottieSvg(frameRef.current, data, crop))
    },
    [crop, fit, src]
  )

  const enforceCoverCrop = useCallback(() => {
    if (fit !== "cover") return
    const svg = frameRef.current?.querySelector("svg")
    if (svg) {
      svg.setAttribute("preserveAspectRatio", COVER_PRESERVE[align])
    }
  }, [align, fit])

  const handleReady = useCallback(
    (data: unknown) => {
      if (fit === "frame") {
        enforceFrameCrop(data)
        return
      }
      enforceCoverCrop()
      requestAnimationFrame(enforceCoverCrop)
    },
    [enforceCoverCrop, enforceFrameCrop, fit]
  )

  if (fit === "contain") {
    return (
      <div
        className={cn(
          "relative w-full",
          dropShadow && "drop-shadow-2xl",
          className,
          frameClassName
        )}
      >
        <LazyLottie
          src={src}
          priority={priority}
          loop={loop}
          active={active}
          posterSrc={posterSrc}
          showSkeleton={showSkeleton}
          aria-label={ariaLabel}
          className="w-full"
          lottieClassName="h-auto w-full"
          rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        />
      </div>
    )
  }

  if (fit === "frame") {
    const preserveAspectRatio = crop
      ? getLottiePreserveAspectRatio(crop)
      : "xMidYMid meet"

    return (
      <div
        ref={frameRef}
        className={cn(
          "relative w-full",
          crop?.preserve === "slice" && "overflow-hidden",
          dropShadow && "drop-shadow-2xl",
          className,
          frameClassName
        )}
        style={
          frameAspect
            ? ({ aspectRatio: frameAspect } satisfies CSSProperties)
            : undefined
        }
      >
        <div
          className="absolute inset-0"
          style={
            frameZoom === 1
              ? undefined
              : {
                  transform: `scale(${frameZoom})`,
                  transformOrigin: "center center",
                }
          }
        >
          <LazyLottie
            src={src}
            priority={priority}
            loop={loop}
            active={active}
            posterSrc={posterSrc}
            showSkeleton={showSkeleton}
            aria-label={ariaLabel}
            className="h-full w-full"
            lottieClassName="h-full! w-full!"
            rendererSettings={{ preserveAspectRatio }}
            onReady={handleReady}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative w-full overflow-hidden",
        dropShadow && "drop-shadow-2xl",
        className,
        frameClassName
      )}
      style={
        aspectRatio ? ({ aspectRatio } satisfies CSSProperties) : undefined
      }
    >
      <div
        className="absolute inset-0"
        style={
          zoom === 1
            ? undefined
            : {
                transform: "scale(var(--tight-zoom, 1))",
                transformOrigin: TRANSFORM_ORIGIN[align],
                ["--tight-zoom" as string]: String(zoom),
              }
        }
      >
        <LazyLottie
          src={src}
          priority={priority}
          loop={loop}
          active={active}
          posterSrc={posterSrc}
          showSkeleton={showSkeleton}
          aria-label={ariaLabel}
          className="h-full w-full"
          lottieClassName="h-full! w-full!"
          rendererSettings={{ preserveAspectRatio: COVER_PRESERVE[align] }}
          onReady={handleReady}
        />
      </div>
    </div>
  )
}
