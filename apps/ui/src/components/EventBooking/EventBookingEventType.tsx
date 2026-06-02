"use client"

import React, { useEffect, useRef, useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

type EventType = {
    id: string
    title: string
    description: string
    image: string
}

const eventTypes: EventType[] = [
    {
        id: "conferences",
        title: "Conferences",
        description:
            "Multi-day scheduling, speaker management, and networking tools.",
        image: "/images/Event-Booking/conferences.jpg",
    },
    {
        id: "festivals-concerts",
        title: "Festivals & Concerts",
        description:
            "High-volume ticketing, wristband integration, and access control.",
        image: "/images/Event-Booking/festivals-concerts.jpg",
    },
    {
        id: "corporate-events",
        title: "Corporate Events",
        description:
            "Private invitations, precise ROI tracking, and brandable microsites.",
        image: "/images/Event-Booking/corporate-events.jpg",
    },
    {
        id: "weddings",
        title: "Weddings",
        description:
            "Custom RSVP flows, guest management, and seating chart tools.",
        image: "/images/Event-Booking/weddings.jpg",
    },
    {
        id: "workshops-trainings",
        title: "Workshops & Trainings",
        description:
            "Capacity limits, materials distribution, and attendance tracking.",
        image: "/images/Event-Booking/workshops-trainings.jpg",
    },
    {
        id: "trade-shows",
        title: "Trade Shows",
        description:
            "Booth booking, exhibitor management, and on-site lead capture.",
        image: "/images/Event-Booking/trade-shows.jpg",
    },
]

const EventBookingEventType = () => {
    const [activeIndex, setActiveIndex] = useState(1)
    const scrollRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

    const goTo = (idx: number) => {
        setActiveIndex(idx)
        const card = cardRefs.current[idx]
        const container = scrollRef.current
        if (!card || !container) return
        const target =
            card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2
        container.scrollTo({ left: target, behavior: "smooth" })
    }

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return

        let frame = 0
        const updateActive = () => {
            const visibleCenter = container.scrollLeft + container.offsetWidth / 2
            let closestIdx = 0
            let closestDist = Infinity
            cardRefs.current.forEach((card, i) => {
                if (!card) return
                const cardCenter = card.offsetLeft + card.offsetWidth / 2
                const dist = Math.abs(cardCenter - visibleCenter)
                if (dist < closestDist) {
                    closestDist = dist
                    closestIdx = i
                }
            })
            setActiveIndex(closestIdx)
        }

        const onScroll = () => {
            cancelAnimationFrame(frame)
            frame = requestAnimationFrame(updateActive)
        }

        container.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            cancelAnimationFrame(frame)
            container.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <section className="w-full overflow-hidden bg-white px-4 py-[60px] md:px-8 lg:py-[100px]">
            <div className="mx-auto max-w-7xl">
                <SectionHeader
                    className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
                    descriptionClassName="typo-body1 text-center text-[#64748B]"
                    titleClassName="xl:leading-[56.5px] xl:tracking-normal"
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
                            Built for Every Type of Event
                        </SectionHeader.Highlight>
                    }
                    description="Scalable solutions whether you're hosting 50 or 50,000 attendees."
                />

                <div
                    ref={scrollRef}
                    className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {eventTypes.map((e, i) => {
                        const isActive = activeIndex === i
                        return (
                            <button
                                key={e.id}
                                type="button"
                                ref={(el) => {
                                    cardRefs.current[i] = el
                                }}
                                onClick={() => goTo(i)}
                                className={cn(
                                    "group w-[280px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[21.795px] border-2 bg-white text-left shadow-sm transition-all duration-200 sm:w-[320px]",
                                    isActive
                                        ? "border-[#ED862E] shadow-lg"
                                        : "border-slate-200 hover:border-slate-300"
                                )}
                            >
                                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={e.image}
                                        alt={e.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="p-4 md:p-5">
                                    <h3 className="font-plus-jakarta-700 text-[20px] leading-[22.4px] text-black xl:text-[21.795px] xl:leading-normal">
                                        {e.title}
                                    </h3>
                                    <p className="font-source-sans-400 mt-2 text-[16px] leading-[22.4px] text-[#666] xl:text-[16.35px] xl:leading-[26.16px]">
                                        {e.description}
                                    </p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2">
                    {eventTypes.map((e, i) => {
                        const isActive = activeIndex === i
                        return (
                            <button
                                key={e.id}
                                type="button"
                                onClick={() => goTo(i)}
                                aria-label={`Go to ${e.title}`}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-200",
                                    isActive
                                        ? "w-6 bg-[#ED862E]"
                                        : "w-2 bg-slate-300 hover:bg-slate-400"
                                )}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default EventBookingEventType
