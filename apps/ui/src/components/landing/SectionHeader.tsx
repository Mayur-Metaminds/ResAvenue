import type * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { cn } from "@/lib/styles"

import { HeroTitle } from "./HeroTitle"

export interface SectionHeaderProps
  // Omit the HTML `title` attribute (string) so we can redeclare it as a ReactNode.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Eyebrow label. Pass a string (auto-wrapped in <Eyebrow>) or a custom <Eyebrow> node. */
  eyebrow: React.ReactNode
  /** Main title. Use {@link SectionHeader.Highlight} inline to gradient-clip a span. */
  title: React.ReactNode
  /** Optional supporting copy below the title. */
  description?: React.ReactNode
  /**
   * Light = dark text on a light bg (default — for BentoProducts, WhoWeServe, etc.).
   * Dark = light text on a dark bg (for ExploreModules and other dark sections).
   */
  theme?: "light" | "dark"
  /** Override the title color (otherwise derived from `theme`). */
  titleColor?: string
  /** Override the highlight gradient (otherwise derived from `theme`). */
  highlightGradient?: string
}

const DEFAULTS = {
  light: {
    eyebrow: "#ED862E",
    title: "#010C28",
    gradient: "linear-gradient(90deg, #010C28 0%, #ED862E 100%)",
    descriptionClass: "text-gray-500",
  },
  dark: {
    eyebrow: "#FFFFFF",
    title: "#FFFFFF",
    gradient: "linear-gradient(90deg, #ED862E 0%, #D97726 100%)",
    descriptionClass: "text-[#8b949e]",
  },
} as const

/**
 * Centered section header — eyebrow, gradient-highlighted title, and
 * optional description, in one component.
 *
 * Replaces the repeated `<Eyebrow> + <HeroTitle> + <p>` pattern used by
 * BentoProducts, ExploreModules, WhoWeServe, etc. Theme-aware so light
 * and dark sections share the same JSX.
 *
 * @example
 * <SectionHeader
 *   eyebrow="WHO WE SERVE"
 *   title={<>Who We <SectionHeader.Highlight>Serve</SectionHeader.Highlight></>}
 *   description="..."
 * />
 *
 * @example
 * // Dark section (white text on navy bg)
 * <SectionHeader
 *   theme="dark"
 *   eyebrow="CORE FEATURES"
 *   title={<>Explore <SectionHeader.Highlight>Every Module</SectionHeader.Highlight></>}
 *   description="..."
 * />
 */
function SectionHeaderRoot({
  eyebrow,
  title,
  description,
  theme = "light",
  titleColor,
  highlightGradient,
  className,
  ...rest
}: SectionHeaderProps) {
  const defaults = DEFAULTS[theme]

  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      {...rest}
    >
      {typeof eyebrow === "string" ? (
        <Eyebrow
          className="mb-4"
          showDot
          style={
            {
              "--eyebrow-color": defaults.eyebrow,
              "--eyebrow-dot-color": defaults.eyebrow,
            } as React.CSSProperties
          }
        >
          {eyebrow}
        </Eyebrow>
      ) : (
        <div className="mb-4">{eyebrow}</div>
      )}

      <HeroTitle
        className="mb-4"
        style={
          {
            "--hero-title-color": titleColor ?? defaults.title,
            "--hero-title-gradient": highlightGradient ?? defaults.gradient,
            letterSpacing: "-0.5px",
          } as React.CSSProperties
        }
      >
        {title}
      </HeroTitle>

      {description != null && (
        <p className={cn("typo-body1 max-w-2xl", defaults.descriptionClass)}>
          {description}
        </p>
      )}
    </div>
  )
}

/**
 * Compound export so callers don't need a second import for the highlight.
 *
 * `<SectionHeader.Highlight>` is just a re-export of `HeroTitle.Highlight` —
 * the gradient comes from the `--hero-title-gradient` CSS variable that
 * `SectionHeader` sets on its parent `<HeroTitle>`.
 */
export const SectionHeader = Object.assign(SectionHeaderRoot, {
  Highlight: HeroTitle.Highlight,
})
