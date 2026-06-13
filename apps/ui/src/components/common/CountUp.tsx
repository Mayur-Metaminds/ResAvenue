"use client"

import { animate, useInView, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"

/**
 * Count-up number that animates from 0 → target when it first scrolls into
 * view. `format` controls how the in-flight number is rendered each frame
 * (e.g. round to int, fixed decimals, thousands separator). By default fires
 * once. Set `loop` to true to keep restarting (0 → target → pause → repeat).
 */
export function CountUp({
  target,
  suffix = "",
  format = (n: number) => Math.round(n).toString(),
  durationSeconds = 1.6,
  loop = false,
  loopDelaySeconds = 1.5,
}: {
  target: number
  suffix?: string
  format?: (n: number) => string
  durationSeconds?: number
  /** If true, restart the count-up indefinitely after each cycle. */
  loop?: boolean
  /** Pause between loop cycles (only used when `loop` is true). */
  loopDelaySeconds?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(format(0))

  // The default `format` prop is an inline arrow created fresh on every
  // render, so its identity changes every render. We can't put it in the
  // effect's dependency array — that would cleanup() / restart the
  // animation on every re-render (each setDisplay triggers a re-render),
  // killing the `repeat: Infinity` loop almost immediately because the
  // restarted animation would start from the current motionValue (often
  // already at target). Stash format in a ref and read through it.
  const formatRef = useRef(format)
  formatRef.current = format

  useEffect(() => {
    if (!isInView) return
    // Make sure each effect run starts from 0 so the count-up is visible
    // (without this, a re-run after target has been reached would have
    // nothing to animate).
    motionValue.set(0)
    const controls = animate(motionValue, target, {
      duration: durationSeconds,
      ease: [0.16, 1, 0.3, 1], // ease-out, decelerating
      // When `loop` is true, replay from 0 indefinitely. `repeatType: "loop"`
      // resets the value to the animation's starting point on each cycle, so
      // the number snaps back to 0 and counts up again — matching the
      // "looping counter" feel rather than ping-ponging.
      ...(loop
        ? {
            repeat: Infinity,
            repeatType: "loop" as const,
            repeatDelay: loopDelaySeconds,
          }
        : null),
    })
    const unsub = motionValue.on("change", (v) =>
      setDisplay(formatRef.current(v))
    )
    return () => {
      controls.stop()
      unsub()
    }
  }, [isInView, target, motionValue, durationSeconds, loop, loopDelaySeconds])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
