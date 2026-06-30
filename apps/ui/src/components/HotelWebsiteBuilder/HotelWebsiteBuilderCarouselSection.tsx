"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

const CAROUSEL_CARDS = [
  {
    id: "management",
    title: "Reservation & revenue management",
    description: "Easily manage every booking in one timeline.",
    image: "/images/Landing/DNAPopupImg1.png", // Replace later
  },
  {
    id: "checkin",
    title: "Guest check-in/out",
    description: "Give guests the freedom to check in and out their way.",
    image: "/images/Landing/DNAPopupImg2.png",
  },
  {
    id: "upsells",
    title: "Upsells",
    description: "Boost revenue with upsells built into the guest journey.",
    image: "/images/Landing/DNAPopupImg3.png",
  },
  {
    id: "groups",
    title: "Group bookings",
    description: "Simplify managing room blocks and rates for corporate clients.",
    image: "/images/Landing/DNAPopupImg4.png",
  },
  {
    id: "invoicing",
    title: "Automated Invoicing",
    description: "Generate and send professional invoices with a single click.",
    image: "/images/Landing/DNAPopupImg5.png",
  }
]

export function HotelWebsiteBuilderCarouselSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8 // Scroll 80% of container width

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    })
  }

  const renderArrows = (className?: string) => (
    <div className={cn("flex gap-4", className)}>
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border transition-all",
          canScrollLeft
            ? "border-[#ED862E] text-[#ED862E] hover:bg-[#ED862E] hover:text-white cursor-pointer"
            : "border-gray-200 text-gray-300 cursor-not-allowed"
        )}
        aria-label="Scroll left"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border transition-all",
          canScrollRight
            ? "border-[#ED862E] text-[#ED862E] hover:bg-[#ED862E] hover:text-white cursor-pointer"
            : "border-gray-200 text-gray-300 cursor-not-allowed"
        )}
        aria-label="Scroll right"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  )

  return (
<<<<<<< HEAD
    <section data-nav-theme="light" className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-8">
        
=======
    <section data-nav-theme="light" className="relative w-full bg-white py-[80px] md:py-24 overflow-hidden">
      <div className="container  max-w-[1200px] px-4 md:px-8">

>>>>>>> 310d5f0ad91388056276b3eea4bdc10f6faf67ea
        {/* Header & Controls */}
        <div className="mb-[50px] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionHeader
              eyebrow="Optimized for conversions"
              title="Built Around Your Business"
              titleClassName="mb-0"
              highlightGradient="linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 57.71%, #ED862E 68.44%)"
              titleHighlight="Around Your Business"
              className="md:items-start md:text-left"
            />
          </div>

          {/* Navigation Arrows (Desktop) */}
          {renderArrows("hidden md:flex")}
        </div>

      </div>

      {/* Full bleed Carousel */}
      <div className="w-full relative">
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 px-4 md:px-8 xl:px-[calc((100vw-1200px)/2+32px)] hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CAROUSEL_CARDS.map((card) => (
            <div
              key={card.id}
              className="flex flex-col shrink-0 snap-start w-[289px] h-[330px] md:h-auto md:w-[380px] lg:w-[420px] rounded-[32px] border border-[#FDE6D5] bg-white transition-shadow hover:shadow-lg overflow-hidden"
            >
              <div className="flex flex-col h-full pt-[27px] pr-[30px] pb-0 pl-[23px] md:p-10">

                {/* Text Content */}
                <div className="flex flex-col gap-3 mb-6 md:mb-8 shrink-0">
                  <h3 className="font-plus-jakarta-700 text-[17px] md:text-[21px] leading-[26px] tracking-[-0.22px] text-black">
                    {card.title}
                  </h3>
                  <p className="font-source-sans-400 text-[15px] leading-[24px] tracking-[0.16px] text-black/80">
                    {card.description}
                  </p>
                </div>

                {/* Image Area - Pushes to bottom */}
                <div className="mt-auto relative w-full flex-1 md:flex-none md:aspect-[4/3] md:rounded-2xl overflow-visible md:overflow-hidden md:bg-gray-50 md:border md:border-gray-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-contain object-bottom md:object-center md:p-2"
                  />
                </div>

              </div>
            </div>
          ))}

          {/* Spacer for the end */}
          <div className="shrink-0 w-4 md:w-8" aria-hidden="true" />
        </div>
      </div>

      {/* Navigation Arrows (Mobile) */}
      {renderArrows("flex justify-center md:hidden mt-2 relative z-10")}

      {/* Global CSS to hide webkit scrollbar in carousel */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  )
}
