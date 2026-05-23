import type * as React from "react"

import { cn } from "@/lib/styles"

export interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

/**
 * Hero section title. Uses the responsive `typo-h1` utility from the design
 * system (Plus Jakarta Sans / 500 / 32px mobile → 48px desktop).
 *
 * Color is themable via the `--hero-title-color` CSS variable
 * (default #F1F5F9). Set it on any ancestor or pass `style` to override.
 *
 * Use {@link HeroTitle.Highlight} for inline gradient text inside the title.
 */
function HeroTitleRoot({
  children,
  className,
  style,
  ...rest
}: HeroTitleProps) {
  return (
    <h1
      className={cn("typo-h1", className)}
      style={{
        color: "var(--hero-title-color, #F1F5F9)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </h1>
  )
}

export interface HeroTitleHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

/**
 * Inline gradient-text span for use inside {@link HeroTitle}. Themable via
 * the `--hero-title-gradient` CSS variable (default: orange brand gradient).
 *
 * @example
 * <HeroTitle>
 *   The Complete Platform for{" "}
 *   <HeroTitle.Highlight>Modern Hospitality</HeroTitle.Highlight>
 * </HeroTitle>
 */
function HeroTitleHighlight({
  children,
  className,
  style,
  ...rest
}: HeroTitleHighlightProps) {
  return (
    <span
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage:
          "var(--hero-title-gradient, linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%))",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

export const HeroTitle = Object.assign(HeroTitleRoot, {
  Highlight: HeroTitleHighlight,
})
