import * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { cn } from "@/lib/styles"

export interface HeroContentProps {
  /** Eyebrow label content. Pass a string or a full <Eyebrow /> node to override styling. */
  eyebrow: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  actions?: React.ReactNode[]
  className?: string
}

export function HeroContent({
  eyebrow,
  title,
  description,
  actions,
  className,
}: HeroContentProps) {
  return (
    <div className={cn("flex max-w-xl flex-col justify-center", className)}>
      {/* Eyebrow — wraps string content in <Eyebrow />, or renders a passed node as-is for full control. */}
      <div className="mb-[16px] lg:mb-[12px]">
        {typeof eyebrow === "string" ? <Eyebrow>{eyebrow}</Eyebrow> : eyebrow}
      </div>

      {/* Main Title — the caller owns the heading element (e.g. <HeroTitle />). */}
      <div className="mb-[16px] lg:mb-[24px]">{title}</div>

      {/* Description */}
      <p className="typo-body1 mb-[40px] text-gray-300">{description}</p>

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
