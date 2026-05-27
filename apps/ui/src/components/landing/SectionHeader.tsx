import * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { cn } from "@/lib/styles"

import { HeroTitle } from "./HeroTitle"

export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** If provided and title is a string, this text within the title will be wrapped in a highlight gradient */
  titleHighlight?: string
  /** Override the title color (defaults to your standard dark blue). */
  titleColor?: string
  /** Override the highlight gradient (defaults to your standard blue-to-orange). */
  highlightGradient?: string
  /** Override the eyebrow text color (defaults to #ED862E). */
  eyebrowColor?: string
  /** Override the eyebrow dot color (defaults to #ED862E). */
  eyebrowDotColor?: string
  
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
      eyebrowColor = "#ED862E",
      eyebrowDotColor = "#ED862E",
      className,
      titleClassName,
      eyebrowClassName,
      descriptionClassName,
      titleHighlight,
      ...rest
    },
    ref
  ) => {
    const renderTitle = () => {
      if (typeof title === "string" && titleHighlight && title.includes(titleHighlight)) {
        const parts = title.split(titleHighlight)
        return (
          <>
            {parts.map((part, index) => {
              const lines = part.split("\n")
              return (
                <React.Fragment key={index}>
                  {index > 0 && <HeroTitle.Highlight>{titleHighlight}</HeroTitle.Highlight>}
                  {lines.map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < lines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            })}
          </>
        )
      }

      if (typeof title === "string" && title.includes("\n")) {
        return title.split("\n").map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </React.Fragment>
        ))
      }

      return title
    }

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
                "--eyebrow-color": eyebrowColor,
                "--eyebrow-dot-color": eyebrowDotColor,
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
          {renderTitle()}
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