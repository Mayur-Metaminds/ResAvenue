import * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { cn } from "@/lib/styles"

export interface HeroContentProps {
  /** Eyebrow label content. Pass a string or a full <Eyebrow /> node to override styling. */
  eyebrow: React.ReactNode
  title: React.ReactNode
  titleClassName?: React.ReactNode
  description: React.ReactNode
  descriptionClassName?: string
  actions?: React.ReactNode[]
  className?: string
  eyebrowClassName?: string
  /** Optional color for the eyebrow text. Defaults to white if not provided. */
  eyebrowColor?: string
}

export function HeroContent({
  eyebrow,
  title,
  titleClassName,
  description,
  descriptionClassName,
  actions,
  className,
  eyebrowClassName,
  eyebrowColor,
}: HeroContentProps) {
  return (
    <div className={cn("flex max-w-xl flex-col justify-center", className)}>
      {/* Eyebrow — wraps string content in <Eyebrow />, or renders a passed node as-is for full control. */}
      <div className={cn("mb-[16px] lg:mb-[12px]", eyebrowClassName)}>
        {typeof eyebrow === "string" ? (
          <Eyebrow eyebrowColor={eyebrowColor}>{eyebrow}</Eyebrow>
        ) : (
          eyebrow
        )}
      </div>

      {/* Main Title — the caller owns the heading element (e.g. <HeroTitle />). */}
      <div className={cn("mb-[16px] lg:mb-[24px]",titleClassName)}>{title}</div>

      {/* Description */}
      <p className={cn("typo-body1 mb-[40px] text-white opacity-55", descriptionClassName)}>{description}</p>

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-4">
          {actions.map((action, index) => (
            <React.Fragment key={index}>{action}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
