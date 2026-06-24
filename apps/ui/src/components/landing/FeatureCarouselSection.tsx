"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import type * as React from "react"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import { Eyebrow } from "@/components/common/Eyebrow"

import { CloseBtn, PlayButton } from "../../../public/svg/commonSvg"

import { HeroTitle } from "./HeroTitle"

// Mock Data Structure
type CarouselCard = {
  id: string
  eyebrow: string
  title: string
  linkText: string
  linkUrl: string
  /** Direct URL to the video shown in the modal (MP4 / WebM). */
  videoSrc: string
  /** Optional poster image shown before the video loads. */
  posterSrc?: string
}

const carouselData: CarouselCard[] = [
  {
    id: "booking-engine",
    eyebrow: "DIRECT CONNECT",
    title: "Mobile-friendly booking engine with rate plans",
    linkText: "Learn More",
    linkUrl: "/direct-connect",
    videoSrc: "/assets/videos/booking-engine.mp4",
  },
  {
    id: "channel-manager",
    eyebrow: "CHANNEL MANAGER",
    title: "Seamlessly distribute to 100+ OTAs instantly",
    linkText: "Learn More",
    linkUrl: "/channel-connect",
    videoSrc: "/assets/videos/agilysys.mp4",
  },
  {
    id: "property-management",
    eyebrow: "OPERATIONS",
    title: "Central nervous system for your entire property",
    linkText: "Learn More",
    linkUrl: "/property-management",
    videoSrc: "/assets/videos/one-platform.mp4",
  },
   {
    id: "propertyu-management",
    eyebrow: "OPERATIONS",
    title: "Central nervous system for your entire property",
    linkText: "Learn More",
    linkUrl: "/property-management",
    videoSrc: "/assets/videos/one-platform.mp4",
  },
   {
    id: "bookingu-engine",
    eyebrow: "DIRECT CONNECT",
    title: "Mobile-friendly booking engine with rate plans",
    linkText: "Learn More",
    linkUrl: "/direct-connect",
    videoSrc: "/assets/videos/booking-engine.mp4",
  },
]

export function FeatureCarouselSection() {
  const [activeCard, setActiveCard] = useState<CarouselCard | null>(null)

  // Remember which card-trigger the user opened the modal from so we can
  // restore focus to it on close (a11y).
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const hasCenteredInitially = useRef(false)

  // Center the second card on initial load
  useLayoutEffect(() => {
    if (hasCenteredInitially.current || !carouselRef.current) return
    const el = carouselRef.current
    const cards = Array.from(el.children) as HTMLElement[]
    if (cards.length > 1) {
      const target = cards[1]!
      el.scrollLeft = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2
      hasCenteredInitially.current = true
    }
  }, [])

  const scrollPrev = useCallback(() => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 0
    carouselRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" })
  }, [])

  const scrollNext = useCallback(() => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 0
    carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" })
  }, [])

  // Mouse drag-to-scroll with snap. Touch swipes snap natively via CSS
  // scroll-snap (snap-x snap-mandatory + snap-center on each card). For mouse
  // we free-follow the cursor during the drag, then on release glide to the
  // card nearest the scrollport centre — so dragging a card past ~50% lands on
  // the next card, and anything less settles back into place.
  //
  // We capture the pointer LAZILY: pointerdown only records the start, and we
  // only call setPointerCapture once the pointer has moved past a small
  // threshold. Below the threshold the event sequence reaches child elements
  // normally — so a click on the play button still opens the modal.
  const DRAG_THRESHOLD = 4
  const drag = useRef({
    armed: false, // pointer is down but we haven't decided drag-vs-click yet
    dragging: false, // movement exceeded threshold; we're actively dragging
    startX: 0,
    startScrollLeft: 0,
  })
  const restoreSnapTimer = useRef<number | null>(null)

  // Glide to the card whose centre is closest to the scrollport centre. Because
  // "closest" flips at the half-way point, dragging past ~50% of a card width
  // advances to the next card.
  const snapToNearest = (el: HTMLDivElement) => {
    const cards = Array.from(el.children) as HTMLElement[]
    if (cards.length === 0) return
    const viewportCenter = el.scrollLeft + el.clientWidth / 2
    let target = cards[0]!
    let min = Infinity
    for (const card of cards) {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(cardCenter - viewportCenter)
      if (dist < min) {
        min = dist
        target = card
      }
    }
    el.scrollTo({
      left: target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2,
      behavior: "smooth",
    })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return
    if (restoreSnapTimer.current != null) {
      clearTimeout(restoreSnapTimer.current)
      restoreSnapTimer.current = null
    }
    drag.current = {
      armed: true,
      dragging: false,
      startX: e.clientX,
      startScrollLeft: e.currentTarget.scrollLeft,
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.armed) return
    const dx = e.clientX - drag.current.startX

    // Promote to active drag once we've crossed the threshold.
    if (!drag.current.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      drag.current.dragging = true
      e.currentTarget.setPointerCapture(e.pointerId)
      // Free-follow the cursor during the drag; CSS snap would fight it.
      e.currentTarget.style.scrollSnapType = "none"
    }

    e.currentTarget.scrollLeft = drag.current.startScrollLeft - dx
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const wasDragging = drag.current.dragging
    drag.current.armed = false
    drag.current.dragging = false

    if (!wasDragging) return // pure click — let it propagate to children

    const el = e.currentTarget
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId)
    }
    // Swallow the trailing click so a drag doesn't open the play-button modal.
    const swallow = (ev: MouseEvent) => {
      ev.stopPropagation()
      ev.preventDefault()
      window.removeEventListener("click", swallow, true)
    }
    window.addEventListener("click", swallow, true)

    // Glide to the nearest card, then hand snapping back to CSS once the glide
    // has settled so the resting state stays snap-aligned for touch.
    snapToNearest(el)
    restoreSnapTimer.current = window.setTimeout(() => {
      el.style.scrollSnapType = ""
      restoreSnapTimer.current = null
    }, 450)
  }

  useEffect(() => {
    return () => {
      if (restoreSnapTimer.current != null) {
        clearTimeout(restoreSnapTimer.current)
      }
    }
  }, [])

  const openModal = useCallback(
    (card: CarouselCard, trigger: HTMLButtonElement) => {
      openerRef.current = trigger
      setActiveCard(card)
    },
    []
  )

  const closeModal = useCallback(() => {
    setActiveCard(null)
  }, [])

  return (
    <section
      data-nav-theme="light"
      className="w-full overflow-hidden bg-[#FFF] py-[53px] "
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 lg:mb-[52px] flex flex-col items-center text-center">
          <Eyebrow
            className="mb-4"
            showDot
            style={
              {
                "--eyebrow-color": "#ED862E",
                "--eyebrow-dot-color": "#ED862E",
              } as React.CSSProperties
            }
          >
            PRODUCTS
          </Eyebrow>
          <HeroTitle
            className="mb-4"
            style={
              {
                "--hero-title-color": "#010C28",
                letterSpacing: "-0.5px",
              } as React.CSSProperties
            }
          >
            Everything Your Hotel Needs.
            <br />
            <HeroTitle.Highlight
              style={
                {
                  "--hero-title-gradient":
                    "linear-gradient(90deg, #010C28 0%, #ED862E 100%)",
                } as React.CSSProperties
              }
            >
              Nothing It Doesn&apos;t.
            </HeroTitle.Highlight>
          </HeroTitle>
          <p className="typo-body1 max-w-xl text-[#64748B]">
            Seven powerful modules designed to work together as one intelligent
            system.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Snap Carousel */}
      <div className="relative w-full">
        {/* Navigation Controls */}
        <div className="container mx-auto flex max-w-6xl justify-end gap-4 px-4 pb-4 md:px-8">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-all hover:border-[#ED862E] hover:text-[#ED862E] active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-all hover:border-[#ED862E] hover:shadow-md hover:text-[#ED862E] active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div
          ref={carouselRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5%] pt-4 pb-12 cursor-grab active:cursor-grabbing select-none"
        >
          {carouselData.map((card) => (
            <CarouselItem key={card.id} card={card} onOpen={openModal} />
          ))}
        </div>
      </div>

      {/* Navigation Controls were moved to the top right of the header */}

      <VideoModal card={activeCard} onClose={closeModal} openerRef={openerRef} />

      {/* Hide Scrollbar Style Hack */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  )
}

/**
 * One carousel card. The whole card is a `<button>` so it's reachable by
 * keyboard and assistive tech; the play SVG is just visual affordance.
 */
function CarouselItem({
  card,
  onOpen,
}: {
  card: CarouselCard
  onOpen: (card: CarouselCard, trigger: HTMLButtonElement) => void
}) {
  return (
    <div
      className="group relative h-[400px] w-[85vw] shrink-0 snap-center overflow-hidden rounded-[24px] shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:h-[511px] md:w-[1000px] lg:w-[1100px]"
    >
      {/* Thumbnail — a still frame from the video (no autoplay). `#t=0.1` seeks
          to ~0.1s so a representative frame paints instead of a black one; the
          full video only plays in the modal after the play button is clicked.
          Provide `posterSrc` for a hand-picked thumbnail when you want one. */}
      <video
        src={`${card.videoSrc}#t=0.1`}
        poster={card.posterSrc}
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Play button — the actual click target. Sits in the centre, leaves
          the rest of the card non-interactive so the carousel can be dragged
          or swipe-scrolled without accidentally opening the modal. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={(e) => onOpen(card, e.currentTarget)}
          aria-label={`Play video: ${card.title}`}
          className="rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED862E] focus-visible:ring-offset-2"
        >
          <PlayButton className="h-20 w-20 drop-shadow-lg" />
        </button>
      </div>

      {/* Bottom content — non-interactive aside from the Learn More link */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex flex-col justify-end p-4 md:p-12">
        <Eyebrow
          showDot={false}
          className="typo-body2 mb-0"
          style={{ "--eyebrow-color": "#ED862E" } as React.CSSProperties}
        >
          {card.eyebrow}
        </Eyebrow>

        <h3 className="text-[20px] md:text-[24px] lg:text-[40px] font-plus-jakarta-500 text-[#FFF] mb-[9px] lg:mb-[20px]">
          {card.title}
        </h3>

        <Link
          href={card.linkUrl}
          className="pointer-events-auto typo-body2 md:text-[16px] text-[14px] inline-flex w-fit items-center text-white/90 hover:text-white"
        >
          {card.linkText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

/**
 * Video modal. Native dialog-style behavior built by hand because we want
 * Framer animations + custom styling:
 *   - ESC closes
 *   - Backdrop click closes
 *   - Body scroll locks while open
 *   - Focus moves into the modal on open, returns to the opener on close
 *   - Video unmounts on close so playback stops
 */
function VideoModal({
  card,
  onClose,
  openerRef,
}: {
  card: CarouselCard | null
  onClose: () => void
  openerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const isOpen = card !== null

  // ESC to close.
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [isOpen, onClose])

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Move focus into the dialog on open; restore to opener on close.
  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => closeButtonRef.current?.focus(), 0)
      return () => window.clearTimeout(id)
    }
    openerRef.current?.focus()
  }, [isOpen, openerRef])

  return (
    <AnimatePresence>
      {card && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={card.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => {
            // Only close when the backdrop itself is clicked, not the dialog.
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative mx-4 w-full max-w-[1100px]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute -top-12 right-0 z-10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ED862E] focus-visible:ring-offset-2 md:-top-14"
            >
              <CloseBtn size={44} />
            </button>

            <div className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-black shadow-2xl">
              <video
                src={card.videoSrc}
                poster={card.posterSrc}
                controls
                autoPlay
                playsInline
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
