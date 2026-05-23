"use client"

import { Play, ArrowRight } from "lucide-react"
import type * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"

import { HeroTitle } from "./HeroTitle"

// Mock Data Structure
type CarouselCard = {
  id: string
  eyebrow: string
  title: string
  linkText: string
  linkUrl: string
  videoPlaceholder: string // Image placeholder for video
}

const carouselData: CarouselCard[] = [
  {
    id: "booking-engine",
    eyebrow: "DIRECT CONNECT",
    title: "Mobile-friendly booking engine with rate plans",
    linkText: "Learn More",
    linkUrl: "#",
    videoPlaceholder: "/images/placeholder-direct-connect.png",
  },
  {
    id: "channel-manager",
    eyebrow: "CHANNEL MANAGER",
    title: "Seamlessly distribute to 100+ OTAs instantly",
    linkText: "Learn More",
    linkUrl: "#",
    videoPlaceholder: "/images/placeholder-channel-connect.png",
  },
  {
    id: "property-management",
    eyebrow: "OPERATIONS",
    title: "Central nervous system for your entire property",
    linkText: "Learn More",
    linkUrl: "#",
    videoPlaceholder: "/images/placeholder-pms.png",
  },
]

export function FeatureCarouselSection() {
  return (
    <section
      data-nav-theme="light"
      className="w-full overflow-hidden bg-[#FFF] px-[16px] py-[53px] lg:px-[80px]"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Header (Reused from Bento Products) */}
        <div className="mb-16 flex flex-col items-center text-center">
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
        <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[5%] pt-4 pb-12 md:px-[calc(50%-550px)]">
          {carouselData.map((card) => (
            <div
              key={card.id}
              className="group relative h-[400px] w-[85vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-[24px] shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl md:h-[511px] md:w-[1000px] lg:w-[1100px]"
            >
              {/* Background Image / Video Placeholder */}
              <img
                src={card.videoPlaceholder}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Center Play Button Overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-8 w-8 fill-current text-[#010C28]" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute right-0 bottom-0 left-0 flex flex-col justify-end p-8 md:p-12">
                <Eyebrow
                  showDot={false}
                  className="mb-3 text-[12px] font-bold tracking-widest"
                  style={
                    { "--eyebrow-color": "#ED862E" } as React.CSSProperties
                  }
                >
                  {card.eyebrow}
                </Eyebrow>

                <h3 className="font-plus-jakarta-700 mb-4 max-w-3xl text-3xl font-bold text-white md:text-4xl">
                  {card.title}
                </h3>

                <a
                  href={card.linkUrl}
                  className="group/link inline-flex items-center font-medium text-white/90 hover:text-white"
                >
                  {card.linkText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

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
