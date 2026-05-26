import * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { cn } from "@/lib/styles"

import { HeroTitle } from "./HeroTitle"

export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Override the title color (defaults to your standard dark blue). */
  titleColor?: string
  /** Override the highlight gradient (defaults to your standard blue-to-orange). */
  highlightGradient?: string
  
  /** Optional class overrides for internal elements */
  titleClassName?: string
  eyebrowClassName?: string
  descriptionClassName?: string
}

const SectionHeaderRoot = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      description,
      // Default to your standard brand colors directly in the props
      titleColor = "#010C28",
      highlightGradient = "linear-gradient(90deg, #010C28 0%, #ED862E 100%)",
      className,
      titleClassName,
      eyebrowClassName,
      descriptionClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center text-center", className)}
        {...rest}
      >
        {/* Eyebrow */}
        {typeof eyebrow === "string" ? (
          <Eyebrow
            className={cn("mb-4", eyebrowClassName)}
            showDot
            style={
              {
                // Hardcoded to your brand orange since there is no theme switching
                "--eyebrow-color": "#ED862E",
                "--eyebrow-dot-color": "#ED862E",
              } as React.CSSProperties
            }
          >
            {eyebrow}
          </Eyebrow>
        ) : (
          <div className={cn("mb-4", eyebrowClassName)}>{eyebrow}</div>
        )}

        {/* Title */}
        <HeroTitle
          className={cn("mb-4", titleClassName)}
          style={
            {
              "--hero-title-color": titleColor,
              "--hero-title-gradient": highlightGradient,
              letterSpacing: "-0.5px",
            } as React.CSSProperties
          }
        >
          {title}
        </HeroTitle>

        {/* Description */}
        {description != null && (
          <p
            className={cn(
              "typo-body1 max-w-2xl text-gray-500",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </div>
    )
  }
)
SectionHeaderRoot.displayName = "SectionHeader"

export const SectionHeader = Object.assign(SectionHeaderRoot, {
  Highlight: HeroTitle.Highlight,
})