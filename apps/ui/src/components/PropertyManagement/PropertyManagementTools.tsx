
"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  ReceiptText,
  ShoppingCart,
  UserCog,
  UserRound,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/landing/SectionHeader"

type ToolCard = {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  image: string
  learnMore?: boolean
}

const toolCards: ToolCard[] = [
  {
    id: "reservation-revenue",
    icon: <CalendarRange className="h-5 w-5" />,
    title: "Reservation & revenue management",
    description: "Manage every booking from a single timeline.",
    image: "/images/Property-Management/1st.png",
  },
  {
    id: "guest-checkin",
    icon: <UserRound className="h-5 w-5" />,
    title: "Guest Check-in/Check-out",
    description: "Offer fast, flexible check-in experiences.",
    image: "/images/Property-Management/2nd.png",
  },
  {
    id: "upsells-addons",
    icon: <ShoppingCart className="h-5 w-5" />,
    title: "Upsells & Add-ons",
    description: "Increase revenue at every touchpoint.",
    image: "/images/Property-Management/3rd.png",
  },
  {
    id: "groups-events",
    icon: <Users className="h-5 w-5" />,
    title: "Groups & events",
    description: "Simplify bulk bookings and event management.",
    image: "/images/Property-Management/4th.png",
    learnMore: true,
  },
  {
    id: "guest-intelligence",
    icon: <UserCog className="h-5 w-5" />,
    title: "Guest intelligence",
    description: "Deliver personalized guest experiences.",
    image: "/images/Property-Management/5th.png",
    learnMore: true,
  },
  {
    id: "accounting-billing",
    icon: <ReceiptText className="h-5 w-5" />,
    title: "Accounting & billing",
    description: "Automate reconciliation and reduce errors.",
    image: "/images/Property-Management/6th.png",
    learnMore: true,
  },
]

const PropertyManagementTools = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollButtons = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    // Checks if we're at the absolute start or end using total container dimensions
    const isAtStart = container.scrollLeft <= 1
    const isAtEnd =
      Math.ceil(container.scrollLeft + container.clientWidth) >=
      container.scrollWidth - 1

    setCanScrollPrev(!isAtStart)
    setCanScrollNext(!isAtEnd)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => updateScrollButtons()
    const handleResize = () => {
      requestAnimationFrame(() => updateScrollButtons())
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    // Initial calculation check on mount
    updateScrollButtons()

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [updateScrollButtons])

  // Step the carousel by one card-width. scrollBy is relative, so it stays in
  // sync with manual drag/scroll and fixes the first click being a no-op.
  const goTo = (dir: 1 | -1) => {
    const container = scrollRef.current
    if (!container) return
    const firstCard = container.firstElementChild as HTMLElement | null
    const step = firstCard
      ? firstCard.offsetWidth + 24
      : container.clientWidth * 0.8 // 24 = gap-6
    container.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  // Click-and-drag to scroll (mouse). Touch devices scroll natively.
  // Snap is disabled during drag so it doesn't fight the pointer movement,
  // then restored on release so arrow buttons still snap to card boundaries.
  const onMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container) return
    container.style.scrollSnapType = "none"
    drag.current = {
      active: true,
      startX: e.pageX,
      startScroll: container.scrollLeft,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container || !drag.current.active) return
    e.preventDefault()
    container.scrollLeft =
      drag.current.startScroll - (e.pageX - drag.current.startX)
  }

  const stopDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    const container = scrollRef.current
    if (!container) return
    container.style.scrollSnapType = ""
    // Ensure button states update accurately right after dragging stops
    updateScrollButtons()
  }

  return (
    <section
      data-nav-theme="light"
      className="w-full overflow-hidden bg-white py-[60px] lg:py-[80px]"
    >
      <SectionHeader
        eyebrow="CONVERSION-DRIVEN DESIGN"
        eyebrowColor="#ED862E"
        className="mx-auto mb-10 max-w-3xl px-4 text-center lg:mb-15"
        descriptionClassName="typo-body1 text-center text-[#64748B]"
        title={
          <SectionHeader.Highlight
            style={{
              background:
                "var(--cta-gradient, linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            More tools. Even bigger impact.
          </SectionHeader.Highlight>
        }
        description="Connect every part of your property operations to save time, boost revenue and delight guests."
      />

      {/* Cards carousel wrapper */}
      <div className="relative w-full">
        {/* Cards carousel */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pt-6 select-none [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 sm:px-4 lg:px-20 [&::-webkit-scrollbar]:hidden"
        >
          {toolCards.map((card) => (
            <div
              key={card.id}
              className="group flex h-[365px] w-[calc(100vw-80px)] shrink-0 cursor-pointer snap-center flex-col gap-5 rounded-2xl border border-[#ED862E80] bg-white p-5 first:ml-10 last:mr-10 sm:h-118 sm:w-102.5 sm:first:ml-0 sm:last:mr-0"
            >
              <div className="flex items-start gap-3 lg:pt-[20px]">
                <span className="inline-flex shrink-0 items-center justify-center rounded-[12px] bg-[#FEF3E2] p-2.5 text-[#ED862E]">
                  {card.icon}
                </span>
                <div className="min-w-0 flex-1 min-h-[94px] sm:min-h-[90px]">
                  <h3 className="[font-family:var(--font-source-sans)] text-[16px] leading-[22.4px] font-bold text-[#000] xl:[font-family:var(--font-plus-jakarta)] xl:text-[20.3px] xl:leading-[26.4px] xl:tracking-[-0.22px]">
                    {card.title}
                  </h3>
                  <p className="font-source-sans-400 mt-1 text-[14px] leading-[22.4px] text-black/50 xl:text-[15px] xl:leading-6 xl:tracking-[0.16px]">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Illustration */}
              <div className="relative -mt-1 flex-1 overflow-hidden rounded-b-xl rounded-t-none bg-[#F8FAFC]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  draggable={false}
                  sizes="(max-width: 640px) 310px, 410px"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nav arrows */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(-1)}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ED862E] text-[#ED862E] transition-all duration-200 hover:bg-[#ED862E] hover:text-white disabled:cursor-not-allowed disabled:border-[#CBD5E1] disabled:text-[#64748B] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#64748B]"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          disabled={!canScrollNext}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ED862E] text-[#ED862E] transition-all duration-200 hover:bg-[#ED862E] hover:text-white disabled:cursor-not-allowed disabled:border-[#CBD5E1] disabled:text-[#64748B] disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#64748B]"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

export default PropertyManagementTools