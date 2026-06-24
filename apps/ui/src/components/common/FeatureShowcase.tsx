import * as React from "react"

import { SectionHeader, type SectionHeaderProps } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

export interface FeatureShowcaseProps {
  /** Optional custom class for the container grid */
  className?: string
  /** Header configuration */
  header?: SectionHeaderProps
  /** The content to display below the header (usually the features list) */
  children: React.ReactNode
  /** The image or visual element to display */
  imageSlot: React.ReactNode

  imageClassName?: string
  /** Whether the image should be on the left or right on desktop (default: right) */
  imagePosition?: "left" | "right"
  /** Content alignment for the header */
  headerAlignment?: "left" | "center"
}

function FeatureShowcaseRoot({
  className,
  header,
  children,
  imageSlot,
  imageClassName,
  imagePosition = "right",
  headerAlignment = "left",
}: FeatureShowcaseProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-10 lg:grid-cols-2",
        className
      )}
    >
      {/* Content Column */}
      <div
        className={cn(
          "flex flex-col ",
          imagePosition === "left" ? "order-1 lg:order-2" : "order-1 lg:order-1"
        )}
      >
        {header && (
          <SectionHeader
            {...header}
            className={cn(
              headerAlignment === "center"
                ? "items-center text-center"
                : "items-start text-left",
              "gap-[12px]",
              header.className
            )}
          />
        )}
        <div className="flex w-full flex-col gap-4 ">{children}</div>
      </div>

      {/* Image Column */}
      <div
        className={cn(
          "relative flex w-full items-center justify-center",
          imagePosition === "left" ? "order-2 lg:order-1" : "order-2 lg:order-2", imageClassName
        )}
      >
        {imageSlot}
      </div>
    </div>
  )
}

export interface FeatureShowcaseCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  isActive?: boolean
  variant?: "default" | "compact" | "interactive" | "dark" | "light"
  as?: "div" | "button"
}

function FeatureShowcaseCard({
  icon,
  title,
  subtitle,
  isActive = false,
  variant = "default",
  as = "div",
  className,
  ...rest
}: FeatureShowcaseCardProps) {
  const Comp = as as any

  if (variant === "compact") {
    return (
      <Comp
        className={cn(
          "flex items-center gap-4 rounded-[16px] border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all",
          "hover:border-[#ED862E]/50 hover:shadow-md",
          isActive && "border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ED862E]/10 text-[#ED862E]"
          )}
        >
          {icon}
        </div>
        <h3 className="font-plus-jakarta-700 text-[16px] text-[#010C28] lg:text-[18px]">
          {title}
        </h3>
      </Comp>
    )
  }

  if (variant === "interactive") {
    const collapse = !isActive
    return (
      <Comp
        className={cn(
          "group flex w-full gap-[12px] rounded-[14px] border py-[10px] px-[16px] text-left transition-all duration-300 outline-none cursor-pointer",
          isActive
            ? "border-[#ED862E]/50 bg-gradient-to-r from-[#FFF5ED] to-white shadow-[0_2px_12px_-4px_rgba(237,134,46,0.15)] ring-1 ring-[#ED862E]/10 items-center"
            : "border-[#E2E8F0] bg-transparent hover:border-[#ED862E]/40 hover:bg-slate-50 hover:shadow-sm items-center",
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            "flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[8px] transition-all duration-300 [&>svg]:w-[18px] [&>svg]:h-[18px]",
            isActive
              ? "bg-[#ED862E]/15 text-[#ED862E] scale-105"
              : "bg-slate-100 text-[#94A3B8] group-hover:bg-slate-200/50 group-hover:text-[#64748B]"
          )}
        >
          {icon}
        </div>
        <div className="flex flex-col gap-0">
          <h3
            className={cn(
              "font-plus-jakarta-700 text-[14px] lg:text-[15px] transition-colors duration-300",
              isActive ? "text-[#010C28]" : "text-[#64748B] group-hover:text-[#475569]"
            )}
          >
            {title}
          </h3>
          {subtitle && (
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                collapse ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              )}
            >
              <div className="min-h-0">
                <p
                  className={cn(
                    // Reserve a fixed 2-line height so every card's expanded
                    // subtitle is the same height — switching the active card no
                    // longer changes the column height, so the title can't shift.
                    "font-source-sans-400 mt-[2px] min-h-[32px] text-[12px] leading-[16px] transition-colors duration-300",
                    isActive ? "text-[#475569]" : "text-[#94A3B8] group-hover:text-[#64748B]"
                  )}
                >
                  {subtitle}
                </p>
              </div>
            </div>
          )}
        </div>
      </Comp>
    )
  }

  if (variant === "dark") {
    // When `isActive` is explicitly false we collapse the subtitle (used by
    // scroll-driven sections that reveal one card's body at a time). If
    // `isActive` is undefined we leave the subtitle fully visible — preserving
    // the original static behaviour for any non-scroll callers.
    const collapse = isActive === false
    return (
      <Comp
        className={cn(
          "flex items-start gap-4 rounded-[16px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10",
          className
        )}
        {...rest}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
          {icon}
        </div>
        <div className="flex flex-col pt-2 text-left">
          <h3 className="font-plus-jakarta-700 text-[16px] text-white">
            {title}
          </h3>
          {subtitle && (
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                collapse
                  ? "grid-rows-[0fr] opacity-0"
                  : "mt-1 grid-rows-[1fr] opacity-100"
              )}
            >
              <p className="font-source-sans-400 min-h-0 text-[14px] leading-[22px] text-[#94A3B8]">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </Comp>
    )
  }

  if (variant === "light") {
    const collapse = isActive === false
    return (
      <Comp
        className={cn(
          "flex items-start gap-4 rounded-[16px] border border-slate-200 bg-white p-5 transition-all hover:bg-slate-50 shadow-sm",
          className
        )}
        {...rest}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
          {icon}
        </div>
        <div className="flex flex-col pt-2 text-left">
          <h3 className="font-plus-jakarta-700 text-[16px] text-[#010C28]">
            {title}
          </h3>
          {subtitle && (
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out",
                collapse
                  ? "grid-rows-[0fr] opacity-0"
                  : "mt-1 grid-rows-[1fr] opacity-100"
              )}
            >
              <p className="font-source-sans-400 min-h-0 text-[14px] leading-[22px] text-[#475569]">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </Comp>
    )
  }

  // default variant
  return (
    <Comp
      className={cn(
        "flex flex-col rounded-[16px] border border-slate-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] md:p-6",
        className
      )}
      {...rest}
    >
      <div className="mb-1.5 flex items-center gap-3">
        <div className="flex shrink-0 items-center justify-center">{icon}</div>
        <h4 className="font-plus-jakarta-700 text-[16px] text-[#0F172A] md:text-[17px]">
          {title}
        </h4>
      </div>
      {subtitle && (
        <p className="font-source-sans-400 pl-8 text-[14px] leading-relaxed text-[#64748B] md:text-[15px]">
          {subtitle}
        </p>
      )}
    </Comp>
  )
}

export const FeatureShowcase = Object.assign(FeatureShowcaseRoot, {
  Card: FeatureShowcaseCard,
})