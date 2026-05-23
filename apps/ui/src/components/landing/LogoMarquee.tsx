"use client"

import type * as React from "react"

import { cn } from "@/lib/styles"

import {
  BullLogo,
  Expedia,
  MickinsleyAndCompany,
  Vercel,
} from "../../../public/svg/MarqueeSvg"

const logos = [
  { name: "Expedia", Component: Expedia },
  { name: "Texas Longhorns", Component: BullLogo },
  { name: "McKinsey & Company", Component: MickinsleyAndCompany },
  { name: "Vercel", Component: Vercel },
] as const

export interface LogoMarqueeProps {
  className?: string
  /** Seconds for one full loop of the marquee. Default 35. */
  durationSeconds?: number
  /** Heading text above the logos. Pass `null` to hide. */
  heading?: React.ReactNode
}

/**
 * Trusted-by logo marquee. Renders the available logos from
 * `public/svg/MarqueeSvg.tsx`, duplicated for a seamless infinite scroll.
 *
 * Continues the dark hero background so the section feels like one
 * uninterrupted slab. Logos use their default slate fill (#64748B) for the
 * muted look from the Figma comp.
 */
export function LogoMarquee({
  className,
  durationSeconds = 35,
  heading = "",
}: LogoMarqueeProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-[#FFF] py-[30px] lg:px-[70px]",
        className
      )}
    >
      {heading != null && (
        <div className="container mx-auto mb-10 px-4">
          <p className="ont-plus-jakarta-500 text-center text-[16px] leading-[22.4px] tracking-[-0.28px] text-[#414E62] underline">
            {heading}
          </p>
        </div>
      )}

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        }}
      >
        {/* Render the logo set 6 times in a single flat row (3 + 3 identical halves). */}
        {/* Trailing pr-* equal to the gap makes the row width exactly N × (logo + gap), */}
        {/* which means translateX(-50%) lands precisely on the start of the second half — */}
        {/* no rounding mismatch, no jitter at the loop boundary. */}
        <div
          className="flex w-max items-center gap-16 pr-16 md:gap-24 md:pr-24"
          style={{
            animation: `logo-marquee ${durationSeconds}s linear infinite`,
          }}
        >
          {Array.from({ length: 6 }).flatMap((_, repeat) =>
            logos.map(({ name, Component }) => (
              <div
                key={`${repeat}-${name}`}
                aria-hidden={repeat === 0 ? undefined : true}
                aria-label={repeat === 0 ? name : undefined}
                className="shrink-0 opacity-80 transition-opacity hover:opacity-100"
              >
                <Component />
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes logo-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
