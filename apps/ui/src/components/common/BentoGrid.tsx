"use client"

import type * as React from "react"
import { useCallback, useRef, useState } from "react"
import { motion } from "framer-motion"

import {
  BentoProductModal,
  type ModalAnchor,
  type ModalBounds,
} from "@/components/landing/BentoProductModal"
import { cn } from "@/lib/styles"

import { PopupIcon } from "../../../public/svg/commonSvg"

export type BentoItem = {
  id: string
  title: string
  gridSpan: string
  isDark?: boolean
  anchor?: ModalAnchor
  modalFeatures?: string[]
  imagePlaceholder?: string
  href?: string
  modalWidth?: string
  modalHeight?: string
  /** Optional icon for the side-by-side modal layout (rendered top-left). */
  icon?: React.ReactNode
  /** Modal body layout — see BentoModalProduct.modalLayout. Default: "stacked". */
  modalLayout?: "stacked" | "side-by-side" | "stacked-vertical"
  /** Show the Learn More CTA in the stacked layout. Default: true. */
  showLearnMore?: boolean
  /** Optional override for the modal body's description. Falls back to the
      card's own `subtitle` when not provided. */
  modalSubtitle?: string
  /** Optional public URL of the modal's (on-demand) animation. Falls back to
      the card's own `lottieUrl` when not provided. */
  modalLottieUrl?: string
  /** Optional public URL of the card's own animation (used by the modal as a
      fallback when `modalLottieUrl` is absent). */
  lottieUrl?: string
  /** Optional sizing override for the modal animation (side-by-side layout),
      e.g. `"h-[80%] w-[80%]"` to render it smaller. Defaults to `"h-full w-full"`. */
  modalAnimationClassName?: string
  /** The ID of the bento card this modal should vertically expand to cover. */
  expandToId?: string
  /** Optional wrapper className for the bullet list in the "stacked-vertical"
      modal layout (e.g. to pull it up closer to the description). Only set
      this on the specific card(s) that need the override — it's undefined,
      and therefore a no-op, everywhere else. */
  bulletWrapperClassName?: string
  mobileModalHeight?: string
}

type BentoGridProps<T extends BentoItem> = {
  items: T[]
  renderCard: (item: T) => React.ReactNode
  header?: React.ReactNode
  /** Outer <section> className (controls padding, bg, rounding). */
  sectionClassName?: string
  /** Outer <section> inline style — use for gradient backgrounds. */
  sectionStyle?: React.CSSProperties
  /** Inner container max-width / centering — defaults to `container mx-auto max-w-6xl`. */
  containerClassName?: string
  /** Extra classes appended to every card shell (height, padding, etc.). */
  cardClassName?: string
  /** Override the grid wrapper className. Defaults to `relative grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-12`. */
  gridClassName?: string
}

function PopupTrigger({
  onClick,
  label,
}: {
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group/popup absolute top-6 right-6 z-20 touch-manipulation rounded outline-none",
        "focus-visible:ring-2  focus-visible:ring-[#ED862E] focus-visible:ring-offset-2"
      )}
    >
      <PopupIcon
        className="h-[28px] w-[28px]"
        rectClassName="transition-colors duration-300 group-hover/popup:[fill:#ED862E] cursor-pointer"
        topArrowClassName={cn(
          "transition-all duration-300",
          "group-hover/popup:[stroke:#ffffff]",
          "group-hover/popup:[transform:translate(2px,-2px)]"
        )}
        bottomArrowClassName={cn(
          "transition-all duration-300",
          "group-hover/popup:[stroke:#ffffff]",
          "group-hover/popup:[transform:translate(-2px,2px)]"
        )}
      />
    </button>
  )
}

function computeBoundsForAnchor(
  anchor: ModalAnchor,
  card: HTMLElement,
  grid: HTMLElement,
  expandToCard?: HTMLElement | null
): ModalBounds {
  const topInGrid = card.offsetTop
  const leftInGrid = card.offsetLeft
  const rightInGrid = grid.clientWidth - (card.offsetLeft + card.offsetWidth)
  const bottomInGrid = grid.clientHeight - (card.offsetTop + card.offsetHeight)

  let expandBottom: number | "auto" = "auto"
  let expandTop: number | "auto" = "auto"

  if (expandToCard) {
    expandBottom = grid.clientHeight - (expandToCard.offsetTop + expandToCard.offsetHeight)
    expandTop = expandToCard.offsetTop
  }

  switch (anchor) {
    case "top-left":
      return {
        top: topInGrid,
        left: leftInGrid,
        right: "auto",
        bottom: expandBottom
      }
    case "top-right":
      return {
        top: topInGrid,
        left: "auto",
        right: rightInGrid,
        bottom: expandBottom
      }
    case "bottom-left":
      return {
        top: expandTop,
        left: leftInGrid,
        right: "auto",
        bottom: bottomInGrid
      }
    case "bottom-right":
      return {
        top: expandTop,
        left: "auto",
        right: rightInGrid,
        bottom: bottomInGrid,
      }
  }
}

/** Narrowed shape: a card that carries every field the modal needs. */
type ModalCapable<T extends BentoItem> = T & {
  anchor: ModalAnchor
  modalFeatures: string[]
  imagePlaceholder: string
  modalWidth?: string
}

/** A card is modal-capable only if it carries every field the modal needs. */
function hasModal<T extends BentoItem>(item: T): item is ModalCapable<T> {
  return (
    item.anchor != null &&
    item.imagePlaceholder != null &&
    Array.isArray(item.modalFeatures) &&
    item.modalFeatures.length > 0
  )
}

export function BentoGrid<T extends BentoItem>({
  items,
  renderCard,
  header,
  sectionClassName,
  sectionStyle,
  containerClassName,
  cardClassName,
  gridClassName,
}: BentoGridProps<T>) {
  const [selected, setSelected] = useState<ModalCapable<T> | null>(null)
  const [bounds, setBounds] = useState<ModalBounds | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const gridRef = useRef<HTMLDivElement | null>(null)
  const activeIdClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openModal = useCallback((item: T) => {
    if (!hasModal(item)) return
    const card = cardRefs.current[item.id]
    const grid = gridRef.current
    if (!card || !grid) return
    if (activeIdClearTimer.current) {
      clearTimeout(activeIdClearTimer.current)
      activeIdClearTimer.current = null
    }
    setBounds(
      computeBoundsForAnchor(
        item.anchor,
        card,
        grid,
        item.expandToId ? cardRefs.current[item.expandToId] : undefined
      )
    )
    setActiveId(item.id)
    setSelected(item)
  }, [])

  const closeModal = useCallback(() => {
    setSelected(null)
    // Hold the source card's z-index until the modal's exit animation
    // (0.4s in BentoProductModal) has actually finished.
    if (activeIdClearTimer.current) clearTimeout(activeIdClearTimer.current)
    activeIdClearTimer.current = setTimeout(() => {
      setActiveId(null)
      activeIdClearTimer.current = null
    }, 500)
  }, [])

  const anyModal = items.some(hasModal)

  return (
    <section className={sectionClassName} style={sectionStyle}>
      <div className={containerClassName ?? "container mx-auto max-w-6xl"}>
        {header}
        <div
          ref={gridRef}
          className={
            gridClassName ??
            "relative grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-12"
          }
        >
          {items?.map((item) => (
            <motion.div
              layout
              layoutId={`bento-card-${item.id}`}
              key={item.id}
              whileHover={{ y: -4 }}
              ref={(el) => {
                cardRefs.current[item.id] = el
              }}
              onClick={() => openModal(item)}
              className={cn(
                "group relative cursor-pointer flex flex-col overflow-hidden rounded-[20px] shadow-sm transition-shadow hover:shadow-[0_24px_30px_-18px_rgba(237,134,46,0.25)]",
                item.gridSpan,
                item.isDark
                  ? "border-0 bg-cover bg-center text-white"
                  : "border border-gray-100 bg-white text-[#010C28]",
                cardClassName
              )}
              style={{
                ...(item.isDark
                  ? { backgroundImage: `url('/images/gradient-image.png')` }
                  : null),
                // While the modal is open OR contracting, the source card sits
                // under the modal at an elevated z-index so the morph never
                // slips behind sibling cards.
                ...(activeId === item.id ? { zIndex: 40 } : null),
                // Only HIDE the source card while the modal is fully open. The
                // moment the user clicks close (`selected` becomes null) we
                // restore it, so the still-contracting modal overlays a
                // visible source card — no flash at exit-end.
                ...(selected?.id === item.id ? { opacity: 0 } : null),
              }}
            >
              {hasModal(item) && (
                <PopupTrigger
                  onClick={() => openModal(item)}
                  label={`View details for ${item.title}`}
                />
              )}
              {renderCard(item)}
            </motion.div>
          ))}

          {anyModal && (
            <BentoProductModal
              product={selected}
              bounds={bounds}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </section>
  )
}