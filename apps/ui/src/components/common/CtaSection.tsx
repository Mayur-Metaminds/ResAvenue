"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/styles"

interface CtaSectionProps {
  eyebrow?: string
  eyebrowClassName?: string
  title?: string
  titleClassName?: string
  description?: string
  descriptionClassName?: string
  // pass null to hide the button
  primaryButtonLabel?: string | null
  primaryButtonHref?: string
  primaryButtonClassName?: string
  // pass null to hide the button
  secondaryButtonLabel?: string | null
  secondaryButtonHref?: string
  secondaryButtonClassName?: string
  // CSS backgroundImage value — URL or gradient. Defaults to the standard dark bg image.
  backgroundImage?: string
  // Set false to remove the dark overlay (useful when using a gradient background)
  showOverlay?: boolean
  className?: string
}

export function CtaSection({
  eyebrow,
  eyebrowClassName,
  title = "Transform the Way Your Hotel Operates",
  titleClassName,
  description = "Join thousands of hotels that have increased direct bookings, reduced OTA dependency, and streamlined operations.",
  descriptionClassName,
  primaryButtonLabel = "Request a Demo",
  primaryButtonHref = "/contact-us",
  primaryButtonClassName,
  secondaryButtonLabel = "Explore Solutions",
  secondaryButtonHref,
  secondaryButtonClassName,
  backgroundImage = "url('/images/demo-section-bg-img.png')",
  showOverlay = true,
  className,
}: CtaSectionProps) {
  const showPrimary = primaryButtonLabel !== null
  const showSecondary = secondaryButtonLabel !== null

  return (
    <section
      data-nav-theme="dark"
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#010C28] py-32 lg:py-40",
        className
      )}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay */}
      {showOverlay && <div className="absolute inset-0 z-0 bg-[#010C28]/20 mix-blend-multiply" />}

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        {eyebrow && (
          <p
            className={cn(
              "mb-4 text-sm font-medium uppercase tracking-widest text-white/60",
              eyebrowClassName
            )}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className={cn(
            "mb-6 text-4xl leading-[1.15] font-medium tracking-tight text-white md:text-5xl lg:text-6xl",
            titleClassName
          )}
        >
          {title}
        </h2>

        <p
          className={cn(
            "mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light text-gray-200 opacity-90 md:text-lg",
            descriptionClassName
          )}
        >
          {description}
        </p>

        {(showPrimary || showSecondary) && (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {showPrimary && (
              <Link
                href={primaryButtonHref ?? "/contact-us"}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-gray-900 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100",
                  primaryButtonClassName
                )}
              >
                {primaryButtonLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            {showSecondary &&
              (secondaryButtonHref ? (
                <Link
                  href={secondaryButtonHref}
                  className={cn(
                    "rounded-full border border-white/10 bg-[#1C2C47]/60 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#1C2C47]/80",
                    secondaryButtonClassName
                  )}
                >
                  {secondaryButtonLabel}
                </Link>
              ) : (
                <button
                  className={cn(
                    "rounded-full border border-white/10 bg-[#1C2C47]/60 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#1C2C47]/80",
                    secondaryButtonClassName
                  )}
                >
                  {secondaryButtonLabel}
                </button>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}
