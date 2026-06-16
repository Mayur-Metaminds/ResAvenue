"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useEffect, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/styles"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

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
  /** Optional Lottie JSON. When present, renders in place of the bottom
      screenshot. */
  lottieAnimation?: unknown
  /** Optional override for the modal's Lottie animation. When set, the modal
      plays this instead of `lottieAnimation` — useful when the card needs a
      compact in-bento animation but the modal warrants a fuller / more
      detailed one. Falls back to `lottieAnimation` when not provided. */
  modalLottieAnimation?: unknown
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
  return (
    <motion.div
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
        "z-40 flex flex-col overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-2xl max-w-[calc(100vw-32px)] max-h-[calc(100vh-64px)]",
        product.modalWidth || "w-[760px]",
        // stacked-vertical grows to fit its full-width animation; others keep a fixed height.
        product.modalLayout === "stacked-vertical"
          ? "h-auto"
          : product.modalHeight || "h-[824px]"
      )}
    >
      <ModalContent product={product} onClose={onClose} />
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
        className="fixed inset-0 z-40 touch-manipulation bg-black/40 backdrop-blur-sm"
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
        className="fixed inset-x-4 top-[5%] bottom-[5%] z-50 flex flex-col overflow-y-auto overflow-x-hidden rounded-[28px] bg-white shadow-2xl"
      >
        <ModalContent product={product} onClose={onClose} />
      </motion.div>
    </>
  )
}

/* ────────────────── Shared body (desktop + mobile) ────────────────── */

function ModalContent({
  product,
  onClose,
}: {
  product: BentoModalProduct
  onClose: () => void
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
        className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E]"
      >
        <CloseBtn size={40} />
      </button>

      {/* Scrollable body — on the mobile variant (<lg) the content scrolls when
          it overflows the fixed-height modal. The close button above stays put
          because it's anchored to the non-scrolling root, not this wrapper. */}
      <div className="flex w-full flex-1 flex-col gap-[24px] md:gap-[32px] overflow-y-auto lg:overflow-hidden px-[20px] pt-[72px] pb-[0px] md:px-[32px] md:pt-[88px] md:pb-[0px]">
        {/* Two-column top section (stacks on mobile via grid-cols-1) */}
        <div className="grid w-full grid-cols-1 gap-[32px] md:gap-[50px] md:grid-cols-[1fr_1.3fr]">
        {/* Left — icon + eyebrow + title + Learn More */}
        <div className="flex h-full flex-col items-start">
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
            className="font-plus-jakarta-700 mb-[40px] text-[24px] font-bold text-[#010C28]"
          >
            {product.title}
          </h3>



          {product.showLearnMore !== false && (
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
          )}
        </div>

        {/* Right — description + feature checklist */}
        <div className="flex flex-col justify-center gap-[20px]">
          {(product.modalSubtitle ?? product.subtitle) && (
            <p className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8] whitespace-pre-line">
              {product.modalSubtitle ?? product.subtitle}
            </p>
          )}

          <ul className="space-y-3 md:space-y-[12px]">
            {product.modalFeatures.map((feature) => (
              <li key={feature} className="flex items-start text-gray-700">
                <span className="mt-0.5 mr-3 flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center">
                  <CheckedIcon />
                </span>
                <span className="text-[16px] md:text-[16px] font-source-sans leading-relaxed text-[#45556C] font-medium md:whitespace-nowrap">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom visual — Lottie if provided, otherwise the imagePlaceholder
          rendered as a cover background. */}
      {(product.modalLottieAnimation ?? product.lottieAnimation) ? (
        <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-2xl">
          <Lottie
            animationData={product.modalLottieAnimation ?? product.lottieAnimation}
            loop
            className="h-full w-full"
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
          {product.lottieOverlay}
        </div>
      ) : (
        <div
          className="min-h-[200px] w-full flex-1 rounded-2xl md:min-h-[350px]"
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
      className="relative flex w-full flex-col rounded-[16px] bg-white px-[20px] pt-[72px] pb-[24px] md:flex-1 md:overflow-hidden md:px-[40px] md:pt-[88px] md:pb-[0px]"
      style={{
        boxShadow:
          "0 0 100px -3px rgba(1, 14, 56, 0.15), 0 14px 28.6px -4px rgba(1, 14, 56, 0.25)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E]"
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
          {(product.modalLottieAnimation ?? product.lottieAnimation) ? (
            <>
              <Lottie
                animationData={product.modalLottieAnimation ?? product.lottieAnimation}
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
  const animation = product.modalLottieAnimation ?? product.lottieAnimation
  const animationAspect = lottieAspectRatio(animation)

  return (
    <div
      className="relative flex w-full flex-col rounded-[16px] bg-white px-[20px] pt-[72px] pb-[24px] md:px-[40px] md:pt-[88px] md:pb-[40px]"
      style={{
        boxShadow:
          "0 0 100px -3px rgba(1, 14, 56, 0.15), 0 14px 28.6px -4px rgba(1, 14, 56, 0.25)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute cursor-pointer top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E]"
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
          {animation ? (
            <>
              <Lottie
                animationData={animation}
                loop
                className="h-full w-full"
                rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
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
