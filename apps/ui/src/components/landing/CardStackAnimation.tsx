"use client"

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"

// Swap / add / remove entries freely, or pass an `images` prop: every value
// below is derived from the list length, so the fan, the stack and the shuffle
// all adapt on their own.
const DEFAULT_IMAGES = [
    "/images/Landing/Booking report.png",
    "/images/Landing/Direct Connect CRM.png",
    "/images/Landing/Internet Booking engine latest.png",
    "/images/Landing/Property Management latest.png",
]

// Everything below is measured from public/asset/test-animation.mp4 (1440x1080)
// and scaled by 1024/1440, so the numbers describe the composition on a
// 1024x600 design stage. That stage is then scaled to fit the real container,
// which is what keeps the animation identical on every screen size.
const STAGE_W = 1024
const STAGE_H = 600
const STAGE_MARGIN_X = 40
const STAGE_MARGIN_Y = 28

const CARD_W = 373
const CARD_H = 264
const PERSPECTIVE = 3556

// Shared plane orientation of the isometric fan (frames 40-72 of the video).
const FAN_ROTATE_X = -4.25
const FAN_ROTATE_Y = -43.3
const FAN_ROTATE_Z = -11.75
const FAN_SCALE = 1.076

// Centre of the fan, and the right / up / forward step between neighbours.
const FAN_CENTER = { x: 32, y: 11, z: 212 }
const FAN_STEP = { x: 212, y: -65, z: -276 }

// Plays back the video's timings this much slower. Every duration and delay
// below is the raw measurement, so the sequence keeps the video's proportions.
const TIME_SCALE = 1.7

// Each card starts below the stage and further from the camera, then rises.
const ENTRANCE_DROP = 560
const ENTRANCE_DEPTH = -1200
const ENTRANCE_DURATION = 1.5 * TIME_SCALE
const ENTRANCE_STAGGER = 0.18 * TIME_SCALE
const ENTRANCE_LEAD = 0.06 * TIME_SCALE
const EASE_OUT = [0.16, 1, 0.3, 1] as const

// Centred stack the video cuts to at f74: cards recede straight back and up.
// Mild boost after the fan settles — enough presence in the hero without
// overflowing the stage or looking oversized next to the copy.
const STACK_Y0 = 10
const STACK_Y_STEP = -85
const STACK_Z_STEP = -503
const STACK_VISUAL_SCALE = 1.32

const FAN_HOLD_MS = 2470 * TIME_SCALE
const SHUFFLE_START_MS = 3600 * TIME_SCALE
const SHUFFLE_INTERVAL_MS = 1170 * TIME_SCALE
const SHUFFLE_DURATION = 0.47 * TIME_SCALE

const RAD = Math.PI / 180

type Pose = { x: number; y: number; z: number }

// Same maths the browser runs for `perspective` + `rotateX/Y/Z` + `scale`,
// used to measure how much room a fan of N cards actually needs.
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

// Keep the video's exact card-to-card gap while it still fits the stage; only
// tighten the fan once there are too many cards for the original spacing.
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

// Cards rise one by one from left to right.
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

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Uniformly scales the 1024x600 design stage to FIT inside the container
// (contain, never cover) so the fan is never clipped. A small inset keeps
// breathing room around the composition on every breakpoint.
const STAGE_FIT_INSET = 0.94

function useStageScale() {
    const ref = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)

    useIsomorphicLayoutEffect(() => {
        const el = ref.current
        if (!el) return

        const measure = () => {
            const { width, height } = el.getBoundingClientRect()
            if (!width || !height) return
            setScale(Math.min(width / STAGE_W, height / STAGE_H) * STAGE_FIT_INSET)
        }

        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return { ref, scale }
}

export function CardStackAnimation({ images = DEFAULT_IMAGES }: { images?: string[] } = {}) {
    const numCards = images.length
    const { ref: stageRef, scale } = useStageScale()

    const { poses, delays, fanHoldMs, shuffleStartMs } = useMemo(() => {
        const order = buildEntranceOrder(numCards)
        const byIndex = new Array<number>(numCards)
        order.forEach((cardIndex, step) => {
            byIndex[cardIndex] = ENTRANCE_LEAD + step * ENTRANCE_STAGGER
        })
        // Never cut the fan short if a longer list pushes the last card's delay out.
        const entranceEndsMs = (ENTRANCE_LEAD + (numCards - 1) * ENTRANCE_STAGGER + ENTRANCE_DURATION) * 1000
        const hold = Math.max(FAN_HOLD_MS, entranceEndsMs + 600)
        return {
            poses: buildFanPoses(numCards),
            delays: byIndex,
            fanHoldMs: hold,
            shuffleStartMs: hold + (SHUFFLE_START_MS - FAN_HOLD_MS),
        }
    }, [numCards])

    const [phase, setPhase] = useState<"hidden" | "isometric" | "stacked" | "shuffling">("hidden")
    const [activeIndex, setActiveIndex] = useState(0)
    const [outgoingIndex, setOutgoingIndex] = useState<number | null>(null)
    const [promotingFromIndex, setPromotingFromIndex] = useState<number | null>(null)
    const activeIndexRef = useRef(0)
    const outgoingBehindRef = useRef(false)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        activeIndexRef.current = activeIndex
    }, [activeIndex])

    useEffect(() => {
        setActiveIndex(0)
        activeIndexRef.current = 0
    }, [numCards])

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
            setOutgoingIndex(null)
            setPromotingFromIndex(null)
            outgoingBehindRef.current = false
            return
        }

        let cancelled = false
        const stepMs = SHUFFLE_DURATION * 1000
        const intervalMs = SHUFFLE_INTERVAL_MS
        const halfMs = stepMs * 0.5

        let halfTimeoutId: number | undefined
        let stepTimeoutId: number | undefined
        let settleTimeoutId: number | undefined

        const runCycle = () => {
            if (cancelled) return

            const front = activeIndexRef.current
            const nextActive = (front + 1) % numCards

            // Single coherent shuffle: front slides to back while every other card
            // slides forward one slot in the same SHUFFLE_DURATION window.
            outgoingBehindRef.current = false
            setPromotingFromIndex(null)
            setOutgoingIndex(front)
            setActiveIndex(nextActive)
            activeIndexRef.current = nextActive

            // First 50%: outgoing card is on top of everything
            if (cardRefs.current[front]) {
                cardRefs.current[front]!.style.zIndex = "999"
            }

            // At 50% mark: card has cleared the front; drop its z-index behind the stack
            halfTimeoutId = window.setTimeout(() => {
                if (cancelled) return
                outgoingBehindRef.current = true
                if (cardRefs.current[front]) {
                    cardRefs.current[front]!.style.zIndex = "1"
                }
            }, halfMs)

            stepTimeoutId = window.setTimeout(() => {
                if (cancelled) return
                setOutgoingIndex(null)
                outgoingBehindRef.current = false
                // keep stack settled for the remainder of the measured interval
                settleTimeoutId = window.setTimeout(() => {
                    if (cancelled) return
                    runCycle()
                }, Math.max(0, intervalMs - stepMs))
            }, stepMs)
        }

        runCycle()
        return () => {
            cancelled = true
            clearTimeout(halfTimeoutId)
            clearTimeout(stepTimeoutId)
            clearTimeout(settleTimeoutId)
            setOutgoingIndex(null)
            setPromotingFromIndex(null)
            outgoingBehindRef.current = false
        }
    }, [phase, numCards])

    const getStackPosition = (index: number) => {
        if (phase === "hidden" || phase === "isometric") return index
        return (index - activeIndex + numCards) % numCards
    }

    const isShuffleOutgoing = phase === "shuffling" && outgoingIndex !== null
    const isShufflePromoting = phase === "shuffling" && promotingFromIndex !== null

    const frozenStackPos = (index: number, front: number) =>
        (index - front + numCards) % numCards

    return (
        <div
            ref={stageRef}
            className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden bg-transparent"
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
                    const stackPos = getStackPosition(i)
                    const isGoingToBack = isShuffleOutgoing && i === outgoingIndex
                    const pose = poses[i] ?? FAN_CENTER
                    const entranceDelay = delays[i] ?? 0

                    let animateState: AnimateState = {}
                    let transition: Record<string, unknown> = { duration: 1, ease: EASE_OUT }
                    let zIndex = numCards - i

                    if (phase === "hidden") {
                        animateState = {
                            x: pose.x,
                            y: pose.y + ENTRANCE_DROP,
                            z: pose.z + ENTRANCE_DEPTH,
                            rotateX: FAN_ROTATE_X,
                            rotateY: FAN_ROTATE_Y,
                            rotateZ: FAN_ROTATE_Z,
                            scale: FAN_SCALE,
                            opacity: 0,
                        }
                    } else if (phase === "isometric") {
                        animateState = {
                            x: pose.x,
                            y: pose.y,
                            z: pose.z,
                            rotateX: FAN_ROTATE_X,
                            rotateY: FAN_ROTATE_Y,
                            rotateZ: FAN_ROTATE_Z,
                            scale: FAN_SCALE,
                            opacity: 1,
                        }
                        transition = {
                            duration: ENTRANCE_DURATION,
                            ease: EASE_OUT,
                            delay: entranceDelay,
                            opacity: { duration: 0.001, delay: entranceDelay },
                        }
                    } else if (phase === "stacked" || phase === "shuffling") {
                        if (isGoingToBack) {
                            const back = stackedPose(numCards - 1)
                            animateState = {
                                x: 0,
                                y: [STACK_Y0, STACK_Y0 + 210, STACK_Y0 + 210, back.y as number],
                                z: [0, 210, 210, back.z as number],
                                scale: STACK_VISUAL_SCALE,
                                opacity: 1,
                                rotateX: [0, 82, 82, 0],
                                rotateY: 0,
                                rotateZ: 0,
                            }
                            // First 50%: stays on top (zIndex 999). After 50%: drops to zIndex 1 to join behind the stack.
                            zIndex = outgoingBehindRef.current ? 1 : 999
                            transition = { duration: SHUFFLE_DURATION, ease: "easeInOut", times: [0, 0.5, 0.501, 1] }
                        } else if (isShuffleOutgoing) {
                            // Coherent shuffle: every non-outgoing card slides forward one slot
                            // in the SAME SHUFFLE_DURATION window as the front card's arc.
                            animateState = stackedPose(stackPos)
                            zIndex = numCards - stackPos
                            transition = { duration: SHUFFLE_DURATION, ease: "easeInOut" }
                        } else if (isShufflePromoting) {
                            if (i === activeIndex) {
                                animateState = stackedPose(0)
                                zIndex = numCards - 0
                                transition = { duration: 0 }
                            } else if (i === promotingFromIndex) {
                                animateState = stackedPose(numCards - 1)
                                zIndex = 1
                                transition = { duration: 0 }
                            } else {
                                const frozenPos = frozenStackPos(i, promotingFromIndex!)
                                animateState = stackedPose(frozenPos)
                                zIndex = numCards - frozenPos
                                transition = { duration: 0 }
                            }
                        } else {
                            animateState = stackedPose(stackPos)
                            zIndex = numCards - stackPos
                            transition =
                                phase === "shuffling"
                                    ? { duration: 0.001, ease: EASE_OUT }
                                    : { duration: SHUFFLE_DURATION, ease: EASE_OUT }
                        }
                    }

                    return (
                        <motion.div
                            key={i}
                            ref={(el) => {
                                cardRefs.current[i] = el
                            }}
                            className="absolute overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/10 bg-[#0b1329]"
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
                            <img src={img} alt="" className="w-full h-full object-contain" />
                        </motion.div>
                    )
                })}

            </div>
        </div>
    )
}
