import type * as React from "react"

import { cn } from "@/lib/styles"

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Show the leading dot. Defaults to true. */
  showDot?: boolean
  /** Override the dot color directly (otherwise uses --eyebrow-dot-color). */
  dotColor?: string
  eyebrowColor?: string
}

/**
 * Section eyebrow — a small uppercase label with a leading colored dot,
 * used above headings to label a section ("CLOUD BASED HOTEL MANAGEMENT").
 *
 * Themable via CSS variables:
 *  - `--eyebrow-color` (default #FFFFFF) — label text color
 *  - `--eyebrow-dot-color` (default #ED862E) — leading dot color
 *
 * Set them on any ancestor (or via the `style` prop) to override locally;
 * lift them into globals.css `:root` to override globally.
 *
 * @example
 * <Eyebrow>Cloud Based Hotel Management</Eyebrow>
 *
 * @example
 * // No dot
 * <Eyebrow showDot={false}>Trusted Globally</Eyebrow>
 *
 * @example
 * // Per-instance dot override
 * <Eyebrow dotColor="#6a3cff">Now in Beta</Eyebrow>
 */
export function Eyebrow({
  children,
  showDot = true,
  dotColor,
  className,
  style,
  eyebrowColor,
  ...rest
}: EyebrowProps) {

  return (
    <div
      className={cn("flex items-center gap-3", className)}
      style={style}
      {...rest}
    >
      {showDot && (
        <span
          aria-hidden
          className="inline-block h-2 w-2 shrink-0 rounded-full"
          style={{
            backgroundColor: dotColor ?? "var(--eyebrow-dot-color, #ED862E)",
          }}
        />
      )}
      <span
        className="text-[12px] typo-body2 uppercase"
        style={{ color: eyebrowColor ?? "var(--eyebrow-color, #FFFFFF)" }}
      >
        {children}
      </span>
    </div>
  )
}
