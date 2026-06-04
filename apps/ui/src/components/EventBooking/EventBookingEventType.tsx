"use client"

import { Marquee } from "@/components/common/Marquee"
import { SectionHeader } from "@/components/landing/SectionHeader"

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
    return (
        <section data-nav-theme="light" className="w-full overflow-hidden bg-white px-4 py-[60px] md:px-8 lg:py-[60px]">
            <div className="mx-auto">
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

                <Marquee<EventType>
                    items={eventTypes}
                    getKey={(e) => e.id}
                    durationSeconds={70}
                    gapPx={24}
                    backgroundColor="#FFFFFF"
                    ariaLabel="Event types"
                    renderItem={(e) => (
                        <div className="w-[280px] overflow-hidden rounded-[21.795px] border-2 border-slate-200 bg-white text-left shadow-sm transition-colors duration-200 hover:border-[#ED862E] sm:w-[320px]">
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
                        </div>
                    )}
                />
            </div>
        </section>
    )
}

export default EventBookingEventType
