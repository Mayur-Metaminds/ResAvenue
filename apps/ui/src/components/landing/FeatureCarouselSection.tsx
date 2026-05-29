"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

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
    linkUrl: "#",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: "channel-manager",
    eyebrow: "CHANNEL MANAGER",
    title: "Seamlessly distribute to 100+ OTAs instantly",
    linkText: "Learn More",
    linkUrl: "#",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: "property-management",
    eyebrow: "OPERATIONS",
    title: "Central nervous system for your entire property",
    linkText: "Learn More",
    linkUrl: "#",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
  },
]

export function FeatureCarouselSection() {
  const [activeCard, setActiveCard] = useState<CarouselCard | null>(null)

  // Remember which card-trigger the user opened the modal from so we can
  // restore focus to it on close (a11y).
  const openerRef = useRef<HTMLButtonElement | null>(null)

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
        <div className="lg:mb-[52px] flex flex-col items-center text-center">
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
          <p className="typo-body1 max-w-xl text-gray-500">
            Seven powerful modules designed to work together as one intelligent
            system.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Snap Carousel */}
      <div className="relative w-full">
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5%] pt-4 pb-12 ">
          {carouselData.map((card) => (
            <CarouselItem key={card.id} card={card} onOpen={openModal} />
          ))}
        </div>
      </div>

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
      {/* Preview video — muted, looped, just for ambience */}
      <video
        src={card.videoSrc}
        poster={card.posterSrc}
        autoPlay
        muted
        loop
        playsInline
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
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 flex flex-col justify-end p-8 md:p-12">
        <Eyebrow
          showDot={false}
          className="mb-3 text-[12px] font-bold tracking-widest"
          style={{ "--eyebrow-color": "#ED862E" } as React.CSSProperties}
        >
          {card.eyebrow}
        </Eyebrow>

        <h3 className="font-plus-jakarta-700 mb-4 max-w-3xl text-3xl font-bold text-white md:text-4xl">
          {card.title}
        </h3>

        <a
          href={card.linkUrl}
          className="pointer-events-auto inline-flex w-fit items-center font-medium text-white/90 hover:text-white"
        >
          {card.linkText}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
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
