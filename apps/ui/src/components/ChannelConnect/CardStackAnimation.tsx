"use client"

import { motion, type Transition } from "framer-motion"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/styles"

export const DEFAULT_CHANNEL_CONNECT_CARD_IMAGES = [
  "/assets/channel-connect/cards/Booking engine1.png",
  "/assets/channel-connect/cards/Booking engine.png",
  "/assets/channel-connect/cards/Internet Booking engine.png",
  "/assets/channel-connect/cards/Property Management.png",
]

// Everything below is measured from the 3D card animation stage (1440x1080)
// and scaled by 1024/1440, so the numbers describe the composition on a
// 1024x600 design stage. That stage is then scaled to fit the real container,
// which keeps the animation identical on every screen size.
const STAGE_W = 1024
const STAGE_H = 600
const STAGE_MARGIN_X = 40
const STAGE_MARGIN_Y = 28

const CARD_W = 373
const CARD_H = 264
const PERSPECTIVE = 3556

// Shared plane orientation of the isometric fan (frames 40-72 of the source video).
const FAN_ROTATE_X = -4.25
const FAN_ROTATE_Y = -43.3
const FAN_ROTATE_Z = -11.75
const FAN_SCALE = 1.4

// Centre of the fan, and the right / up / forward step between neighbours.
const FAN_CENTER = { x: 32, y: 11, z: 212 }
const FAN_STEP = { x: 212, y: -65, z: -276 }

// Timing scale for smooth cinematic playback
const TIME_SCALE = 1.7

// Each card starts below the stage and further from the camera, then rises.
const ENTRANCE_DROP = 560
const ENTRANCE_DEPTH = -1200
const ENTRANCE_DURATION = 1.5 * TIME_SCALE
const ENTRANCE_STAGGER = 0.18 * TIME_SCALE
const ENTRANCE_LEAD = 0.06 * TIME_SCALE
const EASE_OUT = [0.16, 1, 0.3, 1] as const

// Centred stack: cards recede straight back and up.
// Visual scale boost makes cards prominent and readable in the hero section.
const STACK_Y0 = 10
const STACK_Y_STEP = -85
const STACK_Z_STEP = -503
const STACK_VISUAL_SCALE = 2

const FAN_HOLD_MS = 2470 * TIME_SCALE
const SHUFFLE_START_MS = 3600 * TIME_SCALE
const SHUFFLE_INTERVAL_MS = 1170 * TIME_SCALE
const SHUFFLE_DURATION = 0.47 * TIME_SCALE

const RAD = Math.PI / 180

type Pose = { x: number; y: number; z: number }

// Perspective projection calculation to measure room for a fan of N cards.
function projectCorner(u: number, v: number, pose: Pose) {
  const x = u * FAN_SCALE
  const y = v * FAN_SCALE

  const cz = Math.cos(FAN_ROTATE_Z * RAD)
  const sz = Math.sin(FAN_ROTATE_Z * RAD)
  const x1 = x * cz - y * sz
  const y1 = x * sz + y * cz

  const cy = Math.cos(FAN_ROTATE_Y * RAD)
  const sy = Math.sin(FAN_ROTATE_Y * RAD)
  const x2 = x1 * cy
  const z2 = -x1 * sy

  const cx = Math.cos(FAN_ROTATE_X * RAD)
  const sx = Math.sin(FAN_ROTATE_X * RAD)
  const y3 = y1 * cx - z2 * sx
  const z3 = y1 * sx + z2 * cx

  const f = PERSPECTIVE / (PERSPECTIVE - (z3 + pose.z))

  return { x: (x2 + pose.x) * f, y: (y3 + pose.y) * f }
}

function fanPoses(count: number, spread: number): Pose[] {
  const mid = (count - 1) / 2

  return Array.from({ length: count }, (_, i) => ({
    x: FAN_CENTER.x + FAN_STEP.x * spread * (i - mid),
    y: FAN_CENTER.y + FAN_STEP.y * spread * (i - mid),
    z: FAN_CENTER.z + FAN_STEP.z * spread * (i - mid),
  }))
}

function fanFits(poses: Pose[]) {
  const minAllowedX = -STAGE_W / 2 + STAGE_MARGIN_X
  const maxAllowedX = STAGE_W / 2 - STAGE_MARGIN_X
  const minAllowedY = -STAGE_H / 2 + STAGE_MARGIN_Y
  const maxAllowedY = STAGE_H / 2 - STAGE_MARGIN_Y

  for (const pose of poses) {
    for (const [u, v] of [
      [-CARD_W / 2, -CARD_H / 2],
      [CARD_W / 2, -CARD_H / 2],
      [CARD_W / 2, CARD_H / 2],
      [-CARD_W / 2, CARD_H / 2],
    ] as const) {
      const p = projectCorner(u, v, pose)
      if (
        p.x < minAllowedX ||
        p.x > maxAllowedX ||
        p.y < minAllowedY ||
        p.y > maxAllowedY
      ) {
        return false
      }
    }
  }

  return true
}

function buildFanPoses(count: number): Pose[] {
  if (count <= 1) return [{ ...FAN_CENTER }]
  if (fanFits(fanPoses(count, 1))) return fanPoses(count, 1)
  let lo = 0
  let hi = 1
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2
    if (fanFits(fanPoses(count, mid))) lo = mid
    else hi = mid
  }

  return fanPoses(count, lo)
}

function buildEntranceOrder(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i)
}

type AnimateState = Record<string, number | number[]>

function stackedPose(stackPos: number): AnimateState {
  return {
    x: 0,
    y: STACK_Y0 + STACK_Y_STEP * stackPos,
    z: STACK_Z_STEP * stackPos,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: STACK_VISUAL_SCALE,
    opacity: 1,
  }
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

function useStageScale() {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      if (!width || !height) return
      setScale(Math.min(width / STAGE_W, height / STAGE_H, 1))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return { ref, scale }
}

type AnimationPhase = "hidden" | "isometric" | "stacked" | "shuffling"

interface CardMotionConfig {
  phase: AnimationPhase
  i: number
  numCards: number
  stackPos: number
  isGoingToBack: boolean
  isShuffleOutgoing: boolean
  pose: Pose
  entranceDelay: number
  isOutgoingBehind: boolean
}

function computeCardMotion({
  phase,
  i,
  numCards,
  stackPos,
  isGoingToBack,
  isShuffleOutgoing,
  pose,
  entranceDelay,
  isOutgoingBehind,
}: CardMotionConfig): {
  animateState: AnimateState
  transition: Transition
  zIndex: number
} {
  switch (phase) {
    case "hidden":
      return {
        animateState: {
          x: pose.x,
          y: pose.y + ENTRANCE_DROP,
          z: pose.z + ENTRANCE_DEPTH,
          rotateX: FAN_ROTATE_X,
          rotateY: FAN_ROTATE_Y,
          rotateZ: FAN_ROTATE_Z,
          scale: FAN_SCALE,
          opacity: 0,
        },
        transition: { duration: 1, ease: EASE_OUT },
        zIndex: numCards - i,
      }

    case "isometric":
      return {
        animateState: {
          x: pose.x,
          y: pose.y,
          z: pose.z,
          rotateX: FAN_ROTATE_X,
          rotateY: FAN_ROTATE_Y,
          rotateZ: FAN_ROTATE_Z,
          scale: FAN_SCALE,
          opacity: 1,
        },
        transition: {
          duration: ENTRANCE_DURATION,
          ease: EASE_OUT,
          delay: entranceDelay,
          opacity: { duration: 0.001, delay: entranceDelay },
        },
        zIndex: numCards - i,
      }

    case "stacked":
    case "shuffling":
      if (isGoingToBack) {
        const back = stackedPose(numCards - 1)

        return {
          animateState: {
            x: 0,
            y: [STACK_Y0, STACK_Y0 + 210, STACK_Y0 + 210, back.y as number],
            z: [0, 210, 210, back.z as number],
            scale: STACK_VISUAL_SCALE,
            opacity: 1,
            rotateX: [0, 82, 82, 0],
            rotateY: 0,
            rotateZ: 0,
          },
          transition: {
            duration: SHUFFLE_DURATION,
            ease: "easeInOut",
            times: [0, 0.5, 0.501, 1],
          },
          zIndex: isOutgoingBehind ? 1 : 999,
        }
      }

      if (isShuffleOutgoing) {
        return {
          animateState: stackedPose(stackPos),
          transition: { duration: SHUFFLE_DURATION, ease: "easeInOut" },
          zIndex: numCards - stackPos,
        }
      }

      return {
        animateState: stackedPose(stackPos),
        transition:
          phase === "shuffling"
            ? { duration: 0.001, ease: EASE_OUT }
            : { duration: SHUFFLE_DURATION, ease: EASE_OUT },
        zIndex: numCards - stackPos,
      }
  }
}

export interface CardStackAnimationProps {
  images?: string[]
  className?: string
}

export function CardStackAnimation({
  images = DEFAULT_CHANNEL_CONNECT_CARD_IMAGES,
  className,
}: CardStackAnimationProps) {
  const numCards = images.length
  const { ref: stageRef, scale } = useStageScale()

  const { poses, delays, fanHoldMs, shuffleStartMs } = useMemo(() => {
    const order = buildEntranceOrder(numCards)
    const byIndex = Array.from({ length: numCards }, () => 0)
    order.forEach((cardIndex, step) => {
      byIndex[cardIndex] = ENTRANCE_LEAD + step * ENTRANCE_STAGGER
    })
    const entranceEndsMs =
      (ENTRANCE_LEAD + (numCards - 1) * ENTRANCE_STAGGER + ENTRANCE_DURATION) *
      1000
    const hold = Math.max(FAN_HOLD_MS, entranceEndsMs + 600)

    return {
      poses: buildFanPoses(numCards),
      delays: byIndex,
      fanHoldMs: hold,
      shuffleStartMs: hold + (SHUFFLE_START_MS - FAN_HOLD_MS),
    }
  }, [numCards])

  const [phase, setPhase] = useState<AnimationPhase>("hidden")
  const [activeIndex, setActiveIndex] = useState(0)
  const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null)
  const [isOutgoingBehind, setIsOutgoingBehind] = useState(false)
  const activeIndexRef = useRef(0)

  // Adjust activeIndex during render if card count changes
  const [prevNumCards, setPrevNumCards] = useState(numCards)
  if (prevNumCards !== numCards) {
    setPrevNumCards(numCards)
    setActiveIndex(0)
  }

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("isometric"), 60)
    const t2 = setTimeout(() => setPhase("stacked"), fanHoldMs)
    const t3 = setTimeout(() => setPhase("shuffling"), shuffleStartMs)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [fanHoldMs, shuffleStartMs])

  useEffect(() => {
    if (phase !== "shuffling") {
      return
    }

    let cancelled = false
    const stepMs = SHUFFLE_DURATION * 1000
    const intervalMs = SHUFFLE_INTERVAL_MS
    const halfMs = stepMs * 0.5

    let halfTimeoutId: number | undefined
    let stepTimeoutId: number | undefined
    let settleTimeoutId: number | undefined

    const scheduleNextCycle = () => {
      if (cancelled) return
      runCycle()
    }

    const runCycle = () => {
      if (cancelled) return

      const front = activeIndexRef.current
      const nextActive = (front + 1) % numCards

      setIsOutgoingBehind(false)
      setOutgoingIndex(front)
      setActiveIndex(nextActive)
      activeIndexRef.current = nextActive

      // At 50% mark: card has cleared front; drop its z-index behind the stack
      halfTimeoutId = window.setTimeout(() => {
        if (cancelled) return
        setIsOutgoingBehind(true)
      }, halfMs)

      stepTimeoutId = window.setTimeout(() => {
        if (cancelled) return
        setOutgoingIndex(null)
        setIsOutgoingBehind(false)
        settleTimeoutId = window.setTimeout(
          scheduleNextCycle,
          Math.max(0, intervalMs - stepMs)
        )
      }, stepMs)
    }

    runCycle()

    return () => {
      cancelled = true
      clearTimeout(halfTimeoutId)
      clearTimeout(stepTimeoutId)
      clearTimeout(settleTimeoutId)
    }
  }, [phase, numCards])

  const effectiveOutgoingIndex = phase === "shuffling" ? outgoingIndex : null

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative flex h-[400px] w-full items-center justify-center overflow-hidden bg-transparent sm:h-[480px] md:h-[530px] lg:h-[620px]",
        className
      )}
    >
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          perspective: `${PERSPECTIVE}px`,
        }}
      >
        {images.map((img, i) => {
          const stackPos =
            phase === "hidden" || phase === "isometric"
              ? i
              : (i - activeIndex + numCards) % numCards
          const isGoingToBack =
            effectiveOutgoingIndex !== null && i === effectiveOutgoingIndex
          const isShuffleOutgoing = effectiveOutgoingIndex !== null
          const pose = poses[i] ?? FAN_CENTER
          const entranceDelay = delays[i] ?? 0

          const { animateState, transition, zIndex } = computeCardMotion({
            phase,
            i,
            numCards,
            stackPos,
            isGoingToBack,
            isShuffleOutgoing,
            pose,
            entranceDelay,
            isOutgoingBehind,
          })

          return (
            <motion.div
              key={img}
              className="absolute overflow-hidden rounded-[20px] border border-white/10 bg-[#0b1329] shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              style={{
                width: CARD_W,
                height: CARD_H,
                borderRadius: 20,
                transformOrigin: "center center",
                transformStyle: "preserve-3d",
                zIndex,
              }}
              initial={false}
              animate={animateState}
              transition={transition}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt=""
                className="pointer-events-none h-full w-full object-fill select-none"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
