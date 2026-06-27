"use client"

import type React from "react"
import { useRef } from "react"

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

  // Step the carousel by one card-width. scrollBy is relative, so it stays in
  // sync with manual drag/scroll and fixes the first click being a no-op.
  const goTo = (dir: 1 | -1) => {
    const container = scrollRef.current
    if (!container) return
    const firstCard = container.firstElementChild as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 24 : container.clientWidth * 0.8 // 24 = gap-6
    container.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  // Click-and-drag to scroll (mouse). Touch devices scroll natively.
  // Snap is disabled during drag so it doesn't fight the pointer movement,
  // then restored on release so arrow buttons still snap to card boundaries.
  const onMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container) return
    container.style.scrollSnapType = "none"
    drag.current = { active: true, startX: e.pageX, startScroll: container.scrollLeft }
  }
  const onMouseMove = (e: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container || !drag.current.active) return
    e.preventDefault()
    container.scrollLeft = drag.current.startScroll - (e.pageX - drag.current.startX)
  }
  const stopDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    const container = scrollRef.current
    if (!container) return
    container.style.scrollSnapType = ""
  }

  return (
    <section
      data-nav-theme="light"
      className="w-full overflow-hidden bg-white py-[60px] lg:py-[80px]"
    >
      <SectionHeader
        eyebrow="CONVERSION-DRIVEN DESIGN"
        eyebrowColor="#ED862E"
        className="mx-auto mb-10 px-4 max-w-3xl text-center lg:mb-15"
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

      {/* Cards carousel */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="flex gap-4 overflow-x-auto pt-6 select-none snap-x snap-mandatory sm:gap-6 sm:px-4 lg:px-20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {toolCards.map((card) => (
          <div
            key={card.id}
            className="group cursor-pointer flex h-[365px] w-[calc(100vw-80px)] shrink-0 snap-center flex-col rounded-2xl border border-[#ED862E80] bg-white p-5 first:ml-10 last:mr-10 sm:h-118 sm:w-102.5 sm:first:ml-0 sm:last:mr-0"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex shrink-0 items-center justify-center rounded-[12px] bg-[#FEF3E2] p-2.5 text-[#ED862E]">
                {card.icon}
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-[16px] leading-[22.4px] text-[#000] [font-family:var(--font-source-sans)] xl:text-[20.3px] xl:leading-[26.4px] xl:tracking-[-0.22px] xl:[font-family:var(--font-plus-jakarta)]">
                  {card.title}
                </h3>
                <p className="font-source-sans-400 mt-1 text-[14px] leading-[22.4px] text-black/50 xl:text-[15px] xl:leading-6 xl:tracking-[0.16px]">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Button is hidden by default (image gets the extra space) and
                reveals on hover for every card, collapsing the image to make room. */}
            <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
              <div className="overflow-hidden">
                <Button
                  type="button"
                  variant="secondary"
                  className="hover:cursor-pointer mt-4 self-start rounded-full border border-black/20 bg-transparent px-5 py-[11.25px] text-[12.7px] font-bold uppercase leading-[19.5px] tracking-[0.39px] text-[#000] [font-family:'Inter',sans-serif] hover:border-[#ED862E] hover:text-[#ED862E]"
                >
                  LEARN MORE
                </Button>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative mt-5 w-full flex-1 overflow-hidden rounded-xl">
              <Image
                src={card.image}
                alt={card.title}
                fill
                draggable={false}
                sizes="(max-width: 640px) 310px, 410px"
                className="object-fit"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ED862E] text-[#ED862E] transition-colors hover:bg-[#ED862E] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ED862E] text-[#ED862E] transition-colors hover:bg-[#ED862E] hover:text-white"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}

export default PropertyManagementTools
