"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/styles"

import { CheckedIcon, CloseBtn } from "../../../public/svg/commonSvg"

const DESKTOP_MQ = "(min-width: 768px)"

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
  anchor: ModalAnchor
  modalFeatures: string[]
  imagePlaceholder: string
  href?: string
  modalWidth?: string
}

const anchorToOrigin: Record<ModalAnchor, string> = {
  "top-left": "top left",
  "top-right": "top right",
  "bottom-left": "bottom left",
  "bottom-right": "bottom right",
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

  return (
    <AnimatePresence mode="wait">
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
        left: bounds.left,
        right: bounds.right,
        bottom: bounds.bottom,
      }}
      className={cn(
        "z-40 flex flex-col overflow-hidden rounded-[40px] border border-gray-100 bg-white shadow-2xl max-w-[calc(100vw-32px)] h-[824px] max-h-[calc(100vh-64px)]",
        product.modalWidth || "w-[760px]"
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
        className="fixed inset-x-4 top-[5%] bottom-[5%] z-50 flex flex-col overflow-hidden rounded-[28px] bg-white shadow-2xl"
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
  const router = useRouter()

  return (
    <div
      className="relative flex w-full flex-1 flex-col gap-[24px] md:gap-[32px] overflow-y-auto rounded-[24px] bg-white px-[20px] pt-[56px] pb-[20px] md:px-[32px] md:pt-[70px] md:pb-[24px]"
      style={{
        boxShadow:
          "0 0 100px -3px rgba(1, 14, 56, 0.15), 0 14px 28.6px -4px rgba(1, 14, 56, 0.25)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 touch-manipulation rounded-full transition-transform outline-none hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#ED862E]"
      >
        <CloseBtn size={40} />
      </button>

      {/* Two-column top section (stacks on mobile via grid-cols-1) */}
      <div className="grid w-full grid-cols-1 gap-[32px] md:gap-[62px] md:grid-cols-2">
        {/* Left — eyebrow + title + subtitle + CTA */}
        <div className="flex h-full flex-col items-start">
          {product.eyebrow && (
            <h4 className="font-plus-jakarta-700 mb-3 md:mb-4 text-[12px] md:text-[14px] leading-[17.6px] tracking-[1.5px] text-[#ED862E] uppercase">
              {product.eyebrow}
            </h4>
          )}

          <h3
            id={`product-modal-title-${product.id}`}
            className="font-plus-jakarta-700 mb-3 md:mb-4 text-3xl md:text-4xl font-bold text-[#010C28]"
          >
            {product.title}
          </h3>

          {product.subtitle && (
            <p className="mb-6 md:mb-8 max-w-2xl text-[15px] md:text-lg leading-relaxed text-gray-600">
              {product.subtitle}
            </p>
          )}

          <Button
            variant="primary"
            size="default"
            className="mt-auto w-fit gap-2 rounded-[50px] px-[32px] py-[14px] cursor-pointer font-['Plus_Jakarta_Sans'] font-semibold text-[15px] leading-[24px] shadow-[0_10px_15px_-3px_rgba(237,134,46,0.20),0_4px_6px_-4px_rgba(237,134,46,0.20)] hover:opacity-90"
            icon={<ArrowRight className="h-4 w-4" />}
            onClick={() => {
              onClose()
              router.push(product.href || `/${product.id}`)
            }}
          >
            Learn More
          </Button>
        </div>

        {/* Right — feature checklist */}
        <div className="flex flex-col justify-center">
          <ul className="space-y-3 md:space-y-4">
            {product.modalFeatures.map((feature) => (
              <li key={feature} className="flex items-start text-gray-700">
                <span className="mt-0.5 mr-3 md:mr-4 flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center">
                  <CheckedIcon />
                </span>
                <span className="text-[15px] md:text-[16px] leading-relaxed font-medium">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom screenshot */}
      <div
        className="min-h-[200px] w-full flex-1 rounded-2xl border border-gray-100 shadow-sm md:min-h-[350px]"
        style={{
          background: `url(${product.imagePlaceholder}) lightgray 50% / cover no-repeat`,
        }}
      />
    </div>
  )
}
