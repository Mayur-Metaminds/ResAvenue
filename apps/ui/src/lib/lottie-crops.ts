import { INTELLIGENT_ANALYTICS_INNER } from "@/lib/lottie-urls"

/**
 * Fractional crop from each artboard edge (0–1).
 * Used to trim transparent padding baked into exported Lottie JSON so the
 * visible frame behaves like a normal HTML box.
 */
export type LottieCrop = {
  top: number
  right: number
  bottom: number
  left: number
  /** How the cropped viewBox fills its frame. `slice` = cover (full width). */
  preserve?: "meet" | "slice"
  /**
   * Taller frame aspect (>1) with `slice` zooms in and clips side padding
   * without CSS scale blur.
   */
  displayHeightScale?: number
}

/** Per-URL crop presets. Add an entry when a Lottie has large artboard padding. */
export const LOTTIE_CROPS: Partial<Record<string, LottieCrop>> = {
  [INTELLIGENT_ANALYTICS_INNER]: {
    // `slice` + taller frame zooms to full width without CSS scale blur.
    top: 0.19,
    right: 0.04,
    bottom: 0.21,
    left: 0.04,
    preserve: "slice",
    displayHeightScale: 1.14,
  },
}

export function getLottieCrop(src: string): LottieCrop | undefined {
  return LOTTIE_CROPS[src]
}

/** CSS aspect-ratio string for a cropped artboard (e.g. `"1581 / 1148"`). */
export function getCroppedAspectRatio(
  src: string,
  artboard: { w: number; h: number }
): string | undefined {
  const crop = getLottieCrop(src)
  if (!crop) return undefined

  const vw = artboard.w * (1 - crop.left - crop.right)
  const vh =
    artboard.h * (1 - crop.top - crop.bottom) * (crop.displayHeightScale ?? 1)
  if (vw <= 0 || vh <= 0) return undefined

  return `${vw} / ${vh}`
}

export function getLottiePreserveAspectRatio(crop: LottieCrop): string {
  return (crop.preserve ?? "meet") === "slice"
    ? "xMidYMid slice"
    : "xMidYMid meet"
}

/** Apply a crop preset to the rendered SVG viewBox. */
export function applyLottieViewBoxCrop(
  svg: SVGSVGElement,
  artboard: { w: number; h: number },
  crop: LottieCrop
) {
  const x = artboard.w * crop.left
  const y = artboard.h * crop.top
  const width = artboard.w * (1 - crop.left - crop.right)
  const height = artboard.h * (1 - crop.top - crop.bottom)

  const preserveAspect = getLottiePreserveAspectRatio(crop)

  svg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`)
  svg.setAttribute("preserveAspectRatio", preserveAspect)
  svg.setAttribute("width", "100%")
  svg.setAttribute("height", "100%")
  svg.style.shapeRendering = "geometricPrecision"
  svg.style.transform = ""
}

function readArtboardSize(data: unknown): { w: number; h: number } | undefined {
  if (!data || typeof data !== "object") return undefined
  const { w, h } = data as { w?: number; h?: number }
  if (typeof w === "number" && typeof h === "number" && w > 0 && h > 0) {
    return { w, h }
  }
  return undefined
}

export function cropLottieSvg(
  root: HTMLElement | null,
  data: unknown,
  crop: LottieCrop
) {
  const artboard = readArtboardSize(data)
  const svg = root?.querySelector("svg")
  if (!artboard || !svg) return

  applyLottieViewBoxCrop(svg, artboard, crop)
}
