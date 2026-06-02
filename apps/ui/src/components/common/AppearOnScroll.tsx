"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type AppearOnScrollProps = {
  children: ReactNode
  className?: string
  /** Initial vertical offset in px (slides up into place). Default 40. */
  y?: number
  /** Initial horizontal offset in px. Default 0. */
  x?: number
  /** Animation duration in seconds. Default 0.7. */
  duration?: number
  /** Delay before the animation starts, in seconds. Default 0. */
  delay?: number
}

/**
 * Reveals its children once they scroll into view: fade + slide + slight
 * scale-in. The animation runs on this wrapper, so any transform on the child
 * (e.g. a rotated image) is preserved.
 */
export function AppearOnScroll({
  children,
  className,
  y = 40,
  x = 0,
  duration = 0.7,
  delay = 0,
}: AppearOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
