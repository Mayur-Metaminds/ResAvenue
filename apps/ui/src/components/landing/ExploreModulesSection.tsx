"use client"

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import {
  BarChart3,
  Monitor,
  PackageOpen,
  Percent,
  Receipt,
  Ticket,
  Users,
} from "lucide-react"
import type * as React from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/styles"

import { SectionHeader } from "./SectionHeader"

type FeatureStep = {
  id: string
  label: string
  description: string
  icon: React.ElementType
  image: string
}

const directConnectFeatures: FeatureStep[] = [
  {
    id: "booking-engine",
    label: "Responsive Booking Engine",
    description:
      "Mobile-first booking flow that converts visitors with frictionless reservations.",
    icon: Monitor,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "corporate",
    label: "Corporate & Member Management",
    description:
      "Negotiated rates, loyalty tiers, and travel-program portals in one place.",
    icon: Users,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "analytics",
    label: "Analytics & Reporting",
    description:
      "Real-time pace, pickup, and channel mix dashboards built for revenue teams.",
    icon: BarChart3,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "discounts",
    label: "Discounts & Promotions",
    description:
      "Supports multiple rate plans, discounts, promo codes, and value add-ons to boost RevPAR and ADR.",
    icon: Percent,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "events",
    label: "Events & Ticketing",
    description:
      "Sell, manage, and track events alongside room revenue without a second system.",
    icon: Ticket,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "packages",
    label: "Packages Engine",
    description:
      "Bundle rooms, F&B, and experiences into sellable packages with margin control.",
    icon: PackageOpen,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "invoice",
    label: "Invoice Payments",
    description:
      "Branded payment links, partial captures, and reconciliation built in.",
    icon: Receipt,
    image: "/images/Landing/Explore-Module.png",
  },
]

const channelConnectFeatures: FeatureStep[] = [
  {
    id: "inventory",
    label: "Master Inventory Sharing",
    description:
      "One source of truth pushed to every connected channel in real time.",
    icon: PackageOpen,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "otas",
    label: "Connect to 100+ OTAs",
    description:
      "Plug into the world's biggest demand sources without per-channel work.",
    icon: Monitor,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "realtime",
    label: "Real-time Updates",
    description:
      "Rate, availability, and restriction sync with sub-second propagation.",
    icon: BarChart3,
    image: "/images/Landing/Explore-Module.png",
  },
]

export function ExploreModulesSection() {
  const [activeTab, setActiveTab] = useState<"direct" | "channel">("direct")
  const currentFeatures =
    activeTab === "direct" ? directConnectFeatures : channelConnectFeatures

  // Outer tall section drives the scroll; inner panel is sticky-pinned to the viewport.
  const scrollRef = useRef<HTMLDivElement>(null)
  // Mobile-only: ref to the image container so tapping an item scrolls it into view.
  const mobileImageRef = useRef<HTMLDivElement>(null)

  /** Set the active feature and (on mobile) smoothly scroll the image into view. */
  const selectFeature = (i: number) => {
    setActiveIndex(i)
    // Use rAF so the new image is mounted (via AnimatePresence) before we scroll.
    requestAnimationFrame(() => {
      mobileImageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    })
  }
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  // Continuous active index — fractional. Drives the wheel rotation.
  const activeIndexFloat = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, currentFeatures.length - 1)]
  )

  // Discrete active index — rounded. Drives the right-side image swap AND the mobile list highlight.
  const [activeIndex, setActiveIndex] = useState(0)

  // Track viewport size so we only run the scroll-driven wheel logic on >=md.
  // On mobile, the active item is set by clicking — no sticky tall section, no scroll story.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)

    return () => mq.removeEventListener("change", update)
  }, [])

  useMotionValueEvent(activeIndexFloat, "change", (latest) => {
    if (!isDesktop) return // mobile uses click-driven activation
    const clamped = Math.max(
      0,
      Math.min(currentFeatures.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === clamped ? prev : clamped))
  })

  const activeFeature = currentFeatures[activeIndex] ?? currentFeatures[0]
  if (!activeFeature) return null

  // Outer section height. ~80vh per step gives a comfortable scroll cadence on desktop.
  // On mobile we drop the tall sticky scroll entirely and let the section size to content.
  const sectionHeight = `${currentFeatures.length * 80}vh`

  return (
    <section
      ref={scrollRef}
      data-nav-theme="dark"
      className="relative w-full bg-[#010C28] text-white"
      // Mobile: auto height (no scroll-driven story). Desktop: tall section so the sticky wheel has scroll room.
      style={isDesktop ? { height: sectionHeight } : undefined}
    >
      <div
        className={cn(
          "flex w-full flex-col px-1 pt-8.5 lg:pt-20",
          isDesktop && "sticky top-0 h-screen justify-center overflow-hidden"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <SectionHeader
            className="mb-5"
            theme="dark"
            eyebrow="CORE FEATURES"
            title={
              <>
                Explore the Power Behind{" "}
                <SectionHeader.Highlight>Every Module</SectionHeader.Highlight>
              </>
            }
            description="Switch between product areas to see how ResAvenue handles every aspect of your hotel operations."
          />

          {/* Tabs */}
          <div className="mb-10 flex justify-center">
            <div className="flex rounded-full border border-gray-800/50 bg-[#0b142e] p-1">
              <TabButton
                active={activeTab === "direct"}
                onClick={() => setActiveTab("direct")}
              >
                Direct Connect
              </TabButton>
              <TabButton
                active={activeTab === "channel"}
                onClick={() => setActiveTab("channel")}
              >
                Channel Connect
              </TabButton>
            </div>
          </div>

          {isDesktop ? (
            // ──────────── Desktop: 3D wheel (left) + image (right) ────────────
            <div className="grid flex-1 grid-cols-12 items-center gap-12">
              <div
                className="relative col-span-5 h-116.75 lg:ml-22.5"
                style={{ perspective: "1200px" }}
              >
                <div
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {currentFeatures.map((feature, i) => (
                    <WheelItem
                      key={`${activeTab}-${feature.id}`}
                      feature={feature}
                      index={i}
                      activeIndexFloat={activeIndexFloat}
                    />
                  ))}
                </div>
              </div>

              <div className="relative col-span-7 h-105">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-tr from-[#ED862E]/10 to-transparent opacity-60 blur-3xl" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${activeFeature.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute top-0 left-0 h-full w-[150%] overflow-hidden rounded-l-3xl border-y border-l border-white/10 shadow-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.label}
                      className="h-full w-full object-cover object-left-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            // ──────────── Mobile: click-driven vertical list + image below ────────────
            <div className="flex flex-col gap-6 px-4 pb-12">
              <ul className="flex flex-col gap-2">
                {currentFeatures.map((feature, i) => {
                  const isItemActive = i === activeIndex
                  const Icon = feature.icon

                  return (
                    <li key={`mobile-${activeTab}-${feature.id}`}>
                      <button
                        type="button"
                        onClick={() => selectFeature(i)}
                        className={cn(
                          "flex w-full touch-manipulation items-start gap-4 rounded-2xl p-4 text-left transition-colors",
                          isItemActive
                            ? "bg-linear-to-r from-[#1a2349]/80 to-[#0b142e]/80 shadow-lg ring-1 ring-[#ED862E]/40"
                            : "hover:bg-white/5"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                            isItemActive ? "bg-[#ED862E]/15" : "bg-white/5"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5",
                              isItemActive ? "text-[#ED862E]" : "text-gray-500"
                            )}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "font-plus-jakarta-700 text-base",
                              isItemActive ? "text-white" : "text-gray-400"
                            )}
                          >
                            {feature.label}
                          </p>
                          {isItemActive && (
                            <p className="font-source-sans-400 mt-2 text-sm leading-relaxed text-gray-400">
                              {feature.description}
                            </p>
                          )}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {/* Active feature screenshot */}
              <div
                ref={mobileImageRef}
                className="relative h-72 scroll-mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mobile-img-${activeTab}-${activeFeature.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full w-full overflow-hidden rounded-2xl bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.label}
                      className="h-full w-full object-cover object-top-left"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-[36px] shrink-0 items-center justify-center transition-all duration-300",

        "w-[148px] px-[26px] py-[10px]",

        "md:w-[194px] md:pr-[25.89px] md:pl-[27px]",

        "font-plus-jakarta-700 text-center text-[13px] leading-normal",

        active
          ? [
              "rounded-[50px] bg-[#ED862E] text-white",
              "shadow-[0_4px_16px_0_rgba(237,134,46,0.30)]",
            ]
          : ["bg-transparent text-[#787878] hover:text-white"]
      )}
    >
      {children}
    </button>
  )
}

interface WheelItemProps {
  feature: FeatureStep
  index: number
  activeIndexFloat: MotionValue<number>
}

/** Degrees of wheel rotation per feature step. Larger = items spaced wider apart on the wheel. */
const WHEEL_ANGLE_STEP = 25
/** Wheel radius in px. Controls how far items curve out into 3D depth. */
const WHEEL_RADIUS = 180
const DEG_TO_RAD = Math.PI / 180

/**
 * A single item on the wheel. Each item subscribes to `activeIndexFloat`
 * and computes its *offset from the active position*. The active item
 * (offset = 0) is locked at the vertical center; surrounding items orbit
 * around it on a virtual drum:
 *
 *   y       = sin(angle) * radius          — vertical position on the wheel
 *   z       = (cos(angle) - 1) * radius    — depth (recedes from viewer)
 *   rotateX = -angle                       — tilts to face the viewer head-on at center
 *   opacity / blur fade as |offset| grows
 *
 * The `top: 50%` + CSS `translate: 0 -50%` pair centers each item's body
 * on the container's vertical midline when y = 0. Framer Motion's `y`
 * adds on top via the `transform` property — the two never conflict.
 */
function WheelItem({ feature, index, activeIndexFloat }: WheelItemProps) {
  const offset = useTransform(activeIndexFloat, (a) => index - a)

  const y = useTransform(
    offset,
    (o) => Math.sin(o * WHEEL_ANGLE_STEP * DEG_TO_RAD) * WHEEL_RADIUS
  )
  const z = useTransform(
    offset,
    (o) => (Math.cos(o * WHEEL_ANGLE_STEP * DEG_TO_RAD) - 1) * WHEEL_RADIUS
  )
  const rotateX = useTransform(offset, (o) => -o * WHEEL_ANGLE_STEP)

  // Fade items as they move away from focus.
  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o)
    if (abs > 3.5) return 0

    return Math.max(0.15, 1 - abs * 0.28)
  })

  // Increasing blur with distance — sharp at center, fuzzy at the edges.
  const filter = useTransform(offset, (o) => {
    const px = Math.min(6, Math.abs(o) * 1.6)

    return `blur(${px}px)`
  })

  // Icon tile highlights only when the item is near center.
  const accentOpacity = useTransform(offset, (o) =>
    Math.max(0, 1 - Math.abs(o) * 2)
  )

  const Icon = feature.icon

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        // y / z / rotateX are applied via the CSS `transform` property by framer-motion.
        y,
        z,
        rotateX,
        opacity,
        filter,
        // CSS `translate` (separate property from `transform`) handles the
        // static -50% Y centering. It does NOT conflict with framer's transform.
        translate: "0 -50%",
        transformOrigin: "center center",
      }}
      className="flex items-center gap-4 whitespace-nowrap"
    >
      <motion.div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "rgba(237, 134, 46, 0.10)",
          opacity: accentOpacity,
        }}
      >
        <Icon className="h-5 w-5 text-[#ED862E]" />
      </motion.div>
      <span className="text-base font-semibold md:text-lg">
        {feature.label}
      </span>
    </motion.div>
  )
}
