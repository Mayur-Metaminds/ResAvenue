"use client"

import { animate, useInView, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"

/**
 * Count-up number that animates from 0 → target when it first scrolls into
 * view. `format` controls how the in-flight number is rendered each frame
 * (e.g. round to int, fixed decimals, thousands separator). Only fires once.
 */
export function CountUp({
  target,
  suffix = "",
  format = (n: number) => Math.round(n).toString(),
  durationSeconds = 1.6,
}: {
  target: number
  suffix?: string
  format?: (n: number) => string
  durationSeconds?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(format(0))

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, target, {
      duration: durationSeconds,
      ease: [0.16, 1, 0.3, 1], // ease-out, decelerating
    })
    const unsub = motionValue.on("change", (v) => setDisplay(format(v)))
    return () => {
      controls.stop()
      unsub()
    }
  }, [isInView, target, motionValue, format, durationSeconds])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
