import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/styles"

const buttonVariants = cva(
  // Typography is intentionally NOT baked in — consumers pass a typo-* utility (or explicit
  // font/size/weight classes) so call sites stay in control without fighting the cascade.
  "inline-flex items-center justify-center whitespace-nowrap rounded-[50px] text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Exact gradients, shadows, borders, and backdrop blurs from Figma
        primary:
          "bg-[linear-gradient(105deg,#ED862E_0%,#E07020_100%)] shadow-[0_4px_20px_0_rgba(237,134,46,0.35)] hover:opacity-90",
        secondary:
          "border border-white/15 bg-white/[0.08] backdrop-blur-[4px] hover:bg-white/10",
      },
      size: {
        // Cleared out the default heights/paddings so we can pass exact pixel padding via className
        default: "",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-full px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, children, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {/* Removed 'ml-2' so we can control exact spacing using 'gap' on the parent button */}
        {icon && (
          <span className="flex items-center justify-center">{icon}</span>
        )}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
