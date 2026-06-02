"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

import { ArrowRightLeft, CalendarCog, ClipboardList } from "lucide-react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

// Dark rounded icon badge with an orange glyph.
function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 min-w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/5 text-[#ED862E] lg:h-14 lg:w-14">
      {children}
    </span>
  )
}

const PropertyManagementFrontDesk = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const bulletRefs = useRef<Array<HTMLDivElement | null>>([])

  // Scrollspy: the bullet crossing the vertical center band becomes "in focus".
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index)
            setActiveIndex(idx)
          }
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    bulletRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // In focus → full opacity; otherwise dimmed to 50% (#FFFFFF80).
  const bulletOpacity = (i: number) =>
    cn("transition-opacity duration-500", activeIndex === i ? "opacity-100" : "opacity-50")

  return (
    <section
      data-nav-theme="dark"
      className="w-full bg-[#010C28] flex flex-col gap-10 px-[16px] py-[60px] sm:px-[80px] lg:flex-row lg:py-[100px]"
    >
      {/* Left: visual (dummy placeholder — swap with the real asset) */}
      <div className="flex min-w-0 items-center justify-center lg:flex-1">
        <div className="aspect-square w-full max-w-[480px] rounded-3xl bg-white/5" />
      </div>

      {/* Right: content */}
      <div className="flex min-w-0 flex-col justify-center text-left lg:flex-1">
        <SectionHeader
          eyebrow="SMARTER FRONT DESK. FASTER CHECK-INS. HAPPIER GUESTS."
          eyebrowColor="#FFFFFF"
          className="items-start text-left"
          descriptionClassName="typo-body1 text-left text-[#FFFFFF80]"
          title="Front Desk Operations ."
          titleHighlight="Operations ."
          titleColor="#FFFFFF"
          highlightGradient="linear-gradient(90deg, #ED862E 0%, #ED862E 100%)"
          description={
            <>
              Empower your front desk team with everything they need in one place.
              <br />
              Manage reservations, walk-ins, and guest interactions with speed and
              precision.
            </>
          }
        />

        {/* 3 bullets — their own block below the description */}
        <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:gap-8">
          <div
            ref={(el) => {
              bulletRefs.current[0] = el
            }}
            data-index={0}
            className={cn("flex items-center gap-4", bulletOpacity(0))}
          >
            <IconBadge>
              <CalendarCog className="h-5 w-5 lg:h-6 lg:w-6" />
            </IconBadge>
            <p className="typo-body1 text-white xl:text-[24px]">
              Real-time reservation <span className="text-[#ED862E]">updates</span>
            </p>
          </div>

          <div
            ref={(el) => {
              bulletRefs.current[1] = el
            }}
            data-index={1}
            className={cn("flex items-start gap-4", bulletOpacity(1))}
          >
            <IconBadge>
              <ArrowRightLeft className="h-5 w-5 lg:h-6 lg:w-6" />
            </IconBadge>
            <div>
              <h3 className="font-plus-jakarta-700 text-[20px] leading-[28px] text-white xl:text-[24px]">
                Quick Check-in<span className="text-[#ED862E]">/Check-out</span>
              </h3>
              <p className="typo-body1 mt-2 text-[#FFFFFF80]">
                Manage rates, inventory, and bookings across OTAs, GDS, and direct
                channels in real time.
              </p>
            </div>
          </div>

          <div
            ref={(el) => {
              bulletRefs.current[2] = el
            }}
            data-index={2}
            className={cn("flex items-center gap-4", bulletOpacity(2))}
          >
            <IconBadge>
              <ClipboardList className="h-5 w-5 lg:h-6 lg:w-6" />
            </IconBadge>
            <p className="typo-body1 text-white xl:text-[24px]">
              Automated room <span className="text-[#ED862E]">assignment</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyManagementFrontDesk
