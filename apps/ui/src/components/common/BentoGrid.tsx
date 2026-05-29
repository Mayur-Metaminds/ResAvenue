"use client"

import type * as React from "react"
import { useCallback, useRef, useState } from "react"

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
        "focus-visible:ring-2 focus-visible:ring-[#ED862E] focus-visible:ring-offset-2"
      )}
    >
      <PopupIcon
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
  card: DOMRect,
  grid: DOMRect
): ModalBounds {
  const topInGrid = card.top - grid.top
  const leftInGrid = card.left - grid.left
  const rightInGrid = grid.right - card.right
  const bottomInGrid = grid.bottom - card.bottom

  switch (anchor) {
    case "top-left":
      return { top: topInGrid, left: leftInGrid, right: "auto", bottom: "auto" }
    case "top-right":
      return {
        top: topInGrid,
        left: "auto",
        right: rightInGrid,
        bottom: "auto",
      }
    case "bottom-left":
      return { top: "auto", left: leftInGrid, right: "auto", bottom: bottomInGrid }
    case "bottom-right":
      return {
        top: "auto",
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
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const gridRef = useRef<HTMLDivElement | null>(null)

  const openModal = useCallback((item: T) => {
    if (!hasModal(item)) return
    const card = cardRefs.current[item.id]
    const grid = gridRef.current
    if (!card || !grid) return
    setBounds(
      computeBoundsForAnchor(
        item.anchor,
        card.getBoundingClientRect(),
        grid.getBoundingClientRect()
      )
    )
    setSelected(item)
  }, [])

  const closeModal = useCallback(() => setSelected(null), [])

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
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[item.id] = el
              }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[40px] shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg",
                item.gridSpan,
                item.isDark
                  ? "border-0 bg-cover bg-center text-white"
                  : "border border-gray-100 bg-white text-[#010C28]",
                cardClassName
              )}
              style={
                item.isDark
                  ? { backgroundImage: `url('/images/gradient-image.png')` }
                  : undefined
              }
            >
              {hasModal(item) && (
                <PopupTrigger
                  onClick={() => openModal(item)}
                  label={`View details for ${item.title}`}
                />
              )}
              {renderCard(item)}
            </div>
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
