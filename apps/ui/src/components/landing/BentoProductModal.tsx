"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/styles"

import { CheckedIcon, CloseBtn } from "../../../public/svg/commonSvg"

const DESKTOP_MQ = "(min-width: 1024px)"

function subscribeToDesktop(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_MQ)
  mq.addEventListener("change", callback)

  return () => mq.removeEventListener("change", callback)
}

const getDesktopSnapshot = () => window.matchMedia(DESKTOP_MQ).matches
const getServerSnapshot = () => false

/** Which corner of the source card the desktop modal anchors to. */
export type ModalAnchor =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"

/** Absolute bounds (offsets from the bento grid container's edges). */
export type ModalBounds = {
  top: number | "auto"
  left: number | "auto"
  right: number | "auto"
  bottom: number | "auto"
}

/** Minimal product shape the modal needs. BentoProductsSection's ProductData
 *  is structurally compatible — no need to re-export it. */
export interface BentoModalProduct {
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
  /** Optional override for the modal body's description. When set, the modal
      displays this instead of `subtitle` — useful when the card needs a short
      one-liner but the modal warrants a longer explanation. Falls back to
      `subtitle` when not provided. */
  modalSubtitle?: string
  anchor: ModalAnchor
  modalFeatures: string[]
  imagePlaceholder: string
  href?: string
  modalWidth?: string
  modalHeight?: string
  /** Optional public URL of the card's animation. When present, renders in
      place of the bottom screenshot. */
  lottieUrl?: string
  /** Optional public URL override for the modal's animation. When set, the
      modal plays this instead of `lottieUrl` — useful when the card needs a
      compact in-bento animation but the modal warrants a fuller / more
      detailed one. Falls back to `lottieUrl` when not provided. */
  modalLottieUrl?: string
  /** Optional overlay to render on top of the Lottie animation */
  lottieOverlay?: React.ReactNode
  /** Optional sizing override for the modal's animation element (side-by-side
      layout). Defaults to `"h-full w-full"`. Use e.g. `"h-[80%] w-[80%]"` to
      render a smaller, centered animation. */
  modalAnimationClassName?: string
  /** Optional icon displayed at the top of the left column in the
      "side-by-side" layout (e.g., UnifiedPlatformIcon1). Ignored in the
      default "stacked" layout. */
  icon?: React.ReactNode
  /** Modal body arrangement.
      - "stacked"          (default): title+bullets on top in a 2-column split,
                                       animation full-width below. Used on the
                                       home page bento.
      - "side-by-side":              icon+title+description+bullets on the left,
                                       animation filling the right column. Used
                                       on per-product detail modals.
      - "stacked-vertical":          everything full-width, vertically stacked —
                                       icon → title → description → 2-column
                                       bullet grid → animation. Used on the
                                       Direct Connect solution cards' modals so
                                       the layout matches Figma. */
  modalLayout?: "stacked" | "side-by-side" | "stacked-vertical"
  /** Show the "Learn More" CTA button in the stacked layout (default `true`).
      Set to `false` on the Direct Connect page modals where the user is
      already on a detail page and a deeper navigation isn't relevant. */
  showLearnMore?: boolean
}



interface Props {
  /** Currently selected product, or null when closed. */
  product: BentoModalProduct | null
  /** Required for the desktop variant. Ignored on mobile. */
  bounds: ModalBounds | null
  onClose: () => void
}

/**
 * Bento-card product modal.
 *
 *  • Desktop (≥md): animated anchored expansion — modal scales out from the
 *    source card's anchor corner toward the opposite corner of the bento grid.
 *    Positioned absolutely inside the parent grid via `bounds`.
 *
 *  • Mobile (<md): plain centered overlay with a backdrop and fade+scale
 *    animation. The anchored expansion looks busy and awkward on small
 *    screens, so we drop it.
 */
export function BentoProductModal({ product, bounds, onClose }: Props) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktop,
    getDesktopSnapshot,
    getServerSnapshot
  )

  // Escape closes the modal (both variants).
  useEffect(() => {
    if (!product) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)

    return () => window.removeEventListener("keydown", onKey)
  }, [product, onClose])

  // Lock background scroll only for the mobile/tablet overlay variant (which
  // appears over the page). The desktop modal expands inline from its card, so
  // the page should keep scrolling there.
  useEffect(() => {
    if (!product || isDesktop) return
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = ""
    }
  }, [product, isDesktop])

  return (
    <AnimatePresence>
      {product &&
        (isDesktop ? (
          bounds && (
            <DesktopAnchoredModal
              key={`d-${product.id}`}
              product={product}
              bounds={bounds}
              onClose={onClose}
            />
          )
        ) : (
          <MobileSimpleModal
            key={`m-${product.id}`}
            product={product}
            onClose={onClose}
          />
        ))}
    </AnimatePresence>
  )
}

/* ────────────────── Desktop variant ────────────────── */

function DesktopAnchoredModal({
  product,
  bounds,
  onClose,
}: {
  product: BentoModalProduct
  bounds: ModalBounds
  onClose: () => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Use mousedown so it fires before React's onClick (allowing smooth transitions
    // if the user clicks another bento card).
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <motion.div
      ref={modalRef}
      layoutId={`bento-card-${product.id}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`product-modal-title-${product.id}`}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        top: bounds.top,
        // Clamp left/right so a 760px wide modal never spills outside the grid container on smaller desktop screens
        left: bounds.left !== "auto" ? `calc(min(${bounds.left}px, 100% - 760px))` : "auto",
        right: bounds.right !== "auto" ? `calc(min(${bounds.right}px, 100% - 760px))` : "auto",
        bottom: bounds.bottom,
      }}
      className={cn(
        // Grows to fit its content (h-auto) up to the viewport (max-h); anything
        // past that is cropped, not scrolled — the visible portion is enough.
        "z-[110] flex flex-col overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-2xl max-w-[calc(100vw-32px)] max-h-[calc(100vh-64px)]",
        product.modalWidth || "w-[760px]",
        // A product can opt into a fixed height (e.g. to cover the cards behind
        // it); otherwise stacked / stacked-vertical grow to fit their animation,
        // and side-by-side falls back to a fixed default for its 2-column grid.
        product.modalHeight
          ? product.modalHeight
          : product.modalLayout === "side-by-side"
            ? "h-[824px]"
            : "h-auto"
      )}
    >
      <ModalContent product={product} onClose={onClose} isDesktop />
    </motion.div>
  )
}

/* ────────────────── Mobile variant ────────────────── */

function MobileSimpleModal({
  product,
  onClose,
}: {
  product: BentoModalProduct
  onClose: () => void
}) {
  return (
    <>
      {/* Backdrop — tap outside to close */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] touch-manipulation bg-black/40 backdrop-blur-sm"
        aria-hidden
      />

      {/* Modal — viewport-fixed, centered with margin, simple fade + scale */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`product-modal-title-${product.id}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-x-4 top-[5%] bottom-[5%] z-[110] flex flex-col overflow-y-auto overflow-x-hidden rounded-[28px] bg-white shadow-2xl"
      >
        <ModalContent product={product} onClose={onClose} isDesktop={false} />
      </motion.div>
    </>
  )
}

/* ────────────────── Shared body (desktop + mobile) ────────────────── */

function ModalContent({
  product,
  onClose,
  isDesktop = true,
}: {
  product: BentoModalProduct
  onClose: () => void
  isDesktop?: boolean
}) {
  // Side-by-side variant: icon + title + description + bullets on the left,
  // animation filling the right column. Used on per-product detail modals
  // (e.g., the Conversion-First Booking Engine card on /direct-connect).
  if (product.modalLayout === "side-by-side") {
    return <SideBySideModalContent product={product} onClose={onClose} />
  }

  if (product.modalLayout === "stacked-vertical") {
    return <StackedVerticalModalContent product={product} onClose={onClose} />
  }

  const router = useRouter()
  // When the product sets a fixed modalHeight, the modal keeps that height (e.g.
  // to cover the cards behind it) and the animation fills the leftover space.
  // Otherwise the modal grows to fit a 90%-wide, aspect-ratio-sized animation.
  const hasFixedHeight = Boolean(product.modalHeight) && isDesktop
  const [animationAspect, setAnimationAspect] = useState<string | undefined>(
    undefined
  )

  // Learn More CTA — rendered once at the bottom of the text content (below the
  // title/description/bullets, above the animation), on both desktop and mobile.
  const learnMore =
    product.showLearnMore !== false ? (
      <Button
        variant="primary"
        size="default"
        className="w-fit gap-2 rounded-[16px] px-[32px] py-[14px] cursor-pointer font-['Plus_Jakarta_Sans'] font-semibold text-[15px] leading-[24px] shadow-[0_10px_15px_-3px_rgba(237,134,46,0.20),0_4px_6px_-4px_rgba(237,134,46,0.20)] hover:opacity-90"
        icon={<ArrowRight className="h-4 w-4" />}
        onClick={() => {
          onClose()
          router.push(product.href || `/${product.id}`)
        }}
      >
        Learn More
      </Button>
    ) : null

  return (
    <div
      className="relative flex w-full flex-1 flex-col overflow-hidden rounded-[16px] bg-white"
      style={{
        boxShadow:
          "0 0 100px -3px rgba(1, 14, 56, 0.15), 0 14px 28.6px -4px rgba(1, 14, 56, 0.25)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E] [&_svg]:h-8 [&_svg]:w-8"
      >
        <CloseBtn size={40} />
      </button>

      {/* Scrollable body — on the mobile variant (<lg) the content scrolls when
          it overflows the fixed-height modal. On desktop, it also scrolls if
          the content exceeds the viewport height constraint. */}
      <div className="flex w-full flex-col gap-[15px] px-[20px] pt-[12px] md:px-[32px] md:pt-[22px] ">
        {/* Two-column top section (stacks on mobile via grid-cols-1) */}
        <div className="grid w-full grid-cols-1   ">
          {/* Left — icon + eyebrow + title + description + Learn More.
            h-full only on desktop: it stretches the column to match the bullets
            column's height there, but on mobile (single column) that stretch
            just creates dead space between the description and the bullets. */}
          <div className="flex flex-col items-start md:h-full">
            {product.icon && (
              <div className="mb-[16px] flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#FDFAEE]">
                {product.icon}
              </div>
            )}

            {product.eyebrow && (
              <h4 className="font-plus-jakarta-700 mb-[6px] text-[12px] leading-[17.6px] tracking-[1.5px] text-[#ED862E] uppercase">
                {product.eyebrow}
              </h4>
            )}

            <h3
              id={`product-modal-title-${product.id}`}
              className="font-plus-jakarta-700 mb-[16px] text-[24px] font-bold text-[#010C28]"
            >
              {product.title}
            </h3>

            {(product.modalSubtitle ?? product.subtitle) && (
              <p className="font-source-sans-400 mb-[32px] w-full text-[16px] leading-[26px] text-[#94A3B8] whitespace-pre-line">
                {product.modalSubtitle ?? product.subtitle}
              </p>
            )}
          </div>

          {/* Right — feature checklist (two columns on desktop, one on mobile). */}
          <div className="flex flex-col justify-start gap-[20px]">
            <ul className="grid grid-cols-1 gap-x-[15px] gap-y-[12px] md:grid-cols-2">
              {product.modalFeatures.map((feature) => (
                <li key={feature} className="flex items-start text-gray-700">
                  <span className="mt-0.5 mr-3 flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center">
                    <CheckedIcon />
                  </span>
                  <span className="text-[14px] font-source-sans leading-relaxed text-[#45556C] font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learn More — at the bottom of the text content, above the visual. */}
        {learnMore && <div>{learnMore}</div>}

        {/* Bottom visual — Lottie if provided, otherwise the imagePlaceholder
          rendered as a cover background. */}
        {(product.modalLottieUrl ?? product.lottieUrl) ? (
          hasFixedHeight ? (
            // Fixed-height modal: the animation fills the leftover space so the
            // taller modal has no empty gap.
            <div className="relative min-h-[300px] w-full  flex-1 overflow-hidden rounded-2xl md:min-h-[400px]">
              <LazyLottie
                src={(product.modalLottieUrl ?? product.lottieUrl) as string}
                priority="on-demand"
                loop
                className="h-full w-full"
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
              {product.lottieOverlay}
            </div>
          ) : (
            // Auto-height modal: a 90%-wide box sized to the animation's aspect
            // ratio. flex-1 lets it grow into the freed space (e.g. on the fixed-
            // height mobile modal) with the animation centered.
            <div className="flex w-full items-start justify-start">
              <div
                className="relative w-[90%] overflow-hidden rounded-2xl"
                style={
                  animationAspect ? { aspectRatio: animationAspect } : undefined
                }
              >
                <LazyLottie
                  src={(product.modalLottieUrl ?? product.lottieUrl) as string}
                  priority="on-demand"
                  loop
                  className="h-full w-full scale-95"
                  rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                  onReady={(data) => setAnimationAspect(lottieAspectRatio(data))}
                />
                {product.lottieOverlay}
              </div>
            </div>
          )
        ) : (
          <div
            className="mx-auto min-h-[200px] w-[90%] flex-1 rounded-2xl md:min-h-[350px]"
            style={{
              background: `url(${product.imagePlaceholder}) lightgray 50% / cover no-repeat`,
            }}
          />
        )}
      </div>
    </div>
  )
}

/* ─────────── Side-by-side variant (used on /direct-connect cards) ───────────
   icon + title + description + bullets stacked on the LEFT,
   animation/image filling the RIGHT column. No Learn More CTA — the user
   is already on the detail page so a deeper navigation isn't relevant. */

function SideBySideModalContent({
  product,
  onClose,
}: {
  product: BentoModalProduct
  onClose: () => void
}) {
  return (
    <div
      className="relative flex w-full flex-col rounded-[16px] bg-white px-[20px] pt-[72px] pb-[24px] md:flex-1 md:overflow-y-auto md:px-[40px] md:pt-[88px] md:pb-[0px]"
      style={{
        boxShadow:
          "0 0 100px -3px rgba(1, 14, 56, 0.15), 0 14px 28.6px -4px rgba(1, 14, 56, 0.25)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E] [&_svg]:h-8 [&_svg]:w-8"
      >
        <CloseBtn size={40} />
      </button>

      <div className="grid min-h-0 w-full grid-cols-1 gap-[32px] md:h-full md:gap-[40px] md:grid-cols-2 md:grid-rows-[minmax(0,1fr)]">
        {/* Left — icon + title + description + bullets */}
        <div className="flex min-h-0 flex-col items-start">
          {product.icon && (
            <div className="mb-[20px] flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#FDFAEE]">
              {product.icon}
            </div>
          )}

          <h3
            id={`product-modal-title-${product.id}`}
            className="font-plus-jakarta-700 mb-[12px] text-[22px] font-bold text-[#010C28] md:text-[24px]"
          >
            {product.title}
          </h3>

          {(product.modalSubtitle ?? product.subtitle) && (
            <p className="mb-[24px] font-source-sans-400 text-[14px] leading-[22px] text-[#64748B] md:text-[15px] md:leading-[24px] whitespace-pre-line">
              {product.modalSubtitle ?? product.subtitle}
            </p>
          )}

          {/* Bullets — stacked below the description in the same column */}
          {product.modalFeatures.length > 0 && (
            <ul className="space-y-[12px]">
              {product.modalFeatures.map((feature) => (
                <li key={feature} className="flex items-start text-gray-700">
                  <span className="mt-0.5 mr-3 flex h-5 w-5 shrink-0 items-center justify-center md:h-6 md:w-6">
                    <CheckedIcon />
                  </span>
                  <span className="font-source-sans-400 text-[14px] leading-[22px] text-[#45556C] font-medium md:text-[15px] md:leading-[24px]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="relative flex h-[320px] min-h-0 w-full items-center justify-center overflow-hidden md:h-full">
          {(product.modalLottieUrl ?? product.lottieUrl) ? (
            <>
              <LazyLottie
                src={(product.modalLottieUrl ?? product.lottieUrl) as string}
                priority="on-demand"
                loop
                className={product.modalAnimationClassName ?? "h-full w-full"}
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
              />
              {product.lottieOverlay}
            </>
          ) : (
            <div
              className="h-full w-full rounded-2xl"
              style={{
                background: `url(${product.imagePlaceholder}) lightgray 50% / contain no-repeat`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────── Stacked vertical variant (used on /direct-connect cards) ─────── */
/*  Everything is full-width, vertically stacked:                            */
/*    icon → title → description → 2-column bullet grid → animation/image    */
/*  No Learn More CTA — these are detail-page modals.                        */

/** Derives a CSS `aspect-ratio` string from a Lottie JSON's native w/h, so the
    animation box can match the animation exactly and render edge-to-edge at full
    width with no letterboxing. Returns undefined for non-Lottie inputs. */
function lottieAspectRatio(animationData: unknown): string | undefined {
  if (animationData && typeof animationData === "object") {
    const { w, h } = animationData as { w?: number; h?: number }
    if (typeof w === "number" && typeof h === "number" && h > 0) {
      return `${w} / ${h}`
    }
  }

  return undefined
}

function StackedVerticalModalContent({
  product,
  onClose,
}: {
  product: BentoModalProduct
  onClose: () => void
}) {
  const animationUrl = product.modalLottieUrl ?? product.lottieUrl
  // The box matches the animation's native aspect ratio (read from the JSON
  // once it loads) so it renders edge-to-edge with no letterboxing.
  const [animationAspect, setAnimationAspect] = useState<string | undefined>(
    undefined
  )

  return (
    <div
      className="relative flex w-full flex-col rounded-[16px] bg-white px-[20px] pt-[72px] pb-[24px] md:px-[40px] md:pt-[88px] md:pb-[40px] overflow-y-auto"
      style={{
        boxShadow:
          "0 0 100px -3px rgba(1, 14, 56, 0.15), 0 14px 28.6px -4px rgba(1, 14, 56, 0.25)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E] [&_svg]:h-8 [&_svg]:w-8"
      >
        <CloseBtn size={40} />
      </button>

      <div className="flex w-full flex-col ">
        {/* Icon (chip) */}
        {product.icon && (
          <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] mb-[16px] bg-[#FDFAEE]">
            {product.icon}
          </div>
        )}

        {/* Title */}
        <h3
          id={`product-modal-title-${product.id}`}
          className="font-plus-jakarta-700 text-[22px] font-bold text-[#010C28] md:text-[24px] mb-[16px]"
        >
          {product.title}
        </h3>

        {/* Description */}
        {(product.modalSubtitle ?? product.subtitle) && (
          <p className="font-source-sans-400 text-[14px] leading-[22px] text-[#64748B] mb-[20px] md:text-[16px] md:leading-[26px] whitespace-pre-line">
            {product.modalSubtitle ?? product.subtitle}
          </p>
        )}

        {/* Bullets — 2-column grid (single column on mobile) */}
        {product.modalFeatures.length > 0 && (
          <ul className="grid grid-cols-1 gap-x-[24px] gap-y-[16px] md:w-fit md:grid-cols-2 md:gap-x-[60px]">
            {product.modalFeatures.map((feature) => (
              <li key={feature} className="flex items-start text-gray-700">
                <span className="mt-0.5 mr-3 flex h-5 w-5 shrink-0 items-center justify-center md:h-6 md:w-6">
                  <CheckedIcon />
                </span>
                <span className="font-source-sans-400 text-[14px] leading-[22px] text-[#45556C] font-medium md:text-[16px] md:leading-[24px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Animation / image — full width, edge to edge. The box takes the
            animation's native aspect ratio so it always spans the full content
            width with no side letterboxing; the modal grows to fit its height. */}
        <div
          className="relative mt-[8px] w-full overflow-hidden rounded-2xl"
          style={animationAspect ? { aspectRatio: animationAspect } : undefined}
        >
          {animationUrl ? (
            <>
              <LazyLottie
                src={animationUrl}
                priority="on-demand"
                loop
                className="h-full w-full scale-200"
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                onReady={(data) => setAnimationAspect(lottieAspectRatio(data))}
              />
              {product.lottieOverlay}
            </>
          ) : (
            <div
              className="aspect-[16/10] h-full w-full"
              style={{
                background: `url(${product.imagePlaceholder}) lightgray 50% / cover no-repeat`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
