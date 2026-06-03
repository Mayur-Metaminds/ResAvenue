"use client"

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  ThreeDWheelIcon1,
  ThreeDWheelIcon2,
  ThreeDWheelIcon3,
  ThreeDWheelIcon4,
  ThreeDWheelIcon5,
  ThreeDWheelIcon6,
  ThreeDWheelIcon7,
} from "../../../public/svg/LandingPage"
import type * as React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

// useLayoutEffect runs after the DOM commits but before the browser paints,
// so we can re-scroll without a flash. useEffect is the SSR-safe fallback.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

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
    icon: ThreeDWheelIcon1,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "corporate",
    label: "Corporate & Member Management",
    description:
      "Negotiated rates, loyalty tiers, and travel-program portals in one place.",
    icon: ThreeDWheelIcon2,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "analytics",
    label: "Analytics & Reporting",
    description:
      "Real-time pace, pickup, and channel mix dashboards built for revenue teams.",
    icon: ThreeDWheelIcon3,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "discounts",
    label: "Discounts & Promotions",
    description:
      "Supports multiple rate plans, discounts, promo codes, and value add-ons to boost RevPAR and ADR.",
    icon: ThreeDWheelIcon4,
    image: "/images/Landing/Explore-Module.png",
  },  
  {
    id: "events",
    label: "Events & Ticketing",
    description:
      "Sell, manage, and track events alongside room revenue without a second system.",
    icon: ThreeDWheelIcon5,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "packages",
    label: "Packages Engine",
    description:
      "Bundle rooms, F&B, and experiences into sellable packages with margin control.",
    icon: ThreeDWheelIcon6,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "invoice",
    label: "Invoice Payments",
    description:
      "Branded payment links, partial captures, and reconciliation built in.",
    icon: ThreeDWheelIcon7,
    image: "/images/Landing/Explore-Module.png",
  },
]

const channelConnectFeatures: FeatureStep[] = [
  {
    id: "inventory",
    label: "Master Inventory Sharing",
    description:
      "One source of truth pushed to every connected channel in real time.",
    icon: ThreeDWheelIcon6,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "otas",
    label: "Connect to 100+ OTAs",
    description:
      "Plug into the world's biggest demand sources without per-channel work.",
    icon: ThreeDWheelIcon1,
    image: "/images/Landing/Explore-Module.png",
  },
  {
    id: "realtime",
    label: "Real-time Updates",
    description:
      "Rate, availability, and restriction sync with sub-second propagation.",
    icon: ThreeDWheelIcon3,
    image: "/images/Landing/Explore-Module.png",
  },
]

export function ExploreModulesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<"direct" | "channel">("direct")
  const [activeIndex, setActiveIndex] = useState(0)

  const currentFeatures =
    activeTab === "direct" ? directConnectFeatures : channelConnectFeatures

  // One viewport of page scroll per feature step. The sticky inner stays pinned
  // for the full outer-section height, so the user "stays in" the section until
  // they've scrolled through every step — then the section ends naturally and
  // the next section comes into view.
  const stepsPerSection = Math.max(1, currentFeatures.length)
  const sectionHeight = `${stepsPerSection * 100}vh`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Map scroll progress (0..1) to a fractional index, then snap to nearest int.
  const indexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, currentFeatures.length - 1)]
  )
  useMotionValueEvent(indexMotion, "change", (latest) => {
    const next = Math.max(
      0,
      Math.min(currentFeatures.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const scrollToFeature = (i: number, behavior: ScrollBehavior = "smooth") => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    const progress = i / Math.max(1, currentFeatures.length - 1)
    window.scrollTo({ top: sectionTop + scrollable * progress, behavior })
  }

  // When the user switches tabs we preserve their RELATIVE progress (0..1)
  // in the section rather than resetting them to the top. This stops sticky
  // from detaching mid-switch and avoids the disorienting jump-to-top feel.
  // The actual scroll re-anchor happens in useIsoLayoutEffect below, after
  // React commits the new section height.
  const pendingProgressRef = useRef<number | null>(null)

  const handleTabChange = (tab: "direct" | "channel") => {
    if (tab === activeTab) return
    const el = sectionRef.current
    if (el) {
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      const scrollable = el.offsetHeight - window.innerHeight
      pendingProgressRef.current =
        scrollable > 0
          ? Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollable))
          : 0
    }
    setActiveTab(tab)
    // activeIndex resyncs from the scroll-driven useMotionValueEvent below.
  }

  useIsoLayoutEffect(() => {
    const progress = pendingProgressRef.current
    if (progress == null) return
    pendingProgressRef.current = null
    const el = sectionRef.current
    if (!el) return
    const sectionTop = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    window.scrollTo({
      top: sectionTop + scrollable * progress,
      behavior: "instant",
    })
  }, [activeTab])

  const selectFeature = (i: number) => {
    setActiveIndex(i)
    scrollToFeature(i)
  }

  const activeFeature = currentFeatures[activeIndex] ?? currentFeatures[0]
  if (!activeFeature) return null

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative w-full bg-[#010C28] text-white"
      style={{ height: sectionHeight }}
    >
      {/* Header — in normal flow, scrolls away with the page */}
      <div className="px-4 lg:px-1 pt-24 lg:pt-20">
        <SectionHeader
          className="mb-[25px]"
          eyebrow="CORE FEATURES"
          eyebrowColor="#FFF"
          eyebrowDotColor="#FFF"
          titleColor="#FFFFFF"
          highlightGradient="linear-gradient(90deg, #ED862E 0%, #ED862E 100%)"
          title={
            <>
              Explore the Power Behind{" "}
              <SectionHeader.Highlight>Every Module</SectionHeader.Highlight>
            </>
          }
          description="Switch between product areas to see how ResAvenue handles every aspect of your hotel operations."
        />
      </div>

      {/* Sticky block — pins below the fixed navbar so the tabs row stays visible */}
      <div className="sticky top-24 lg:top-20 h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-5rem)] w-full overflow-hidden">
        <div className="flex w-full flex-col px-4 lg:px-1 h-full justify-center">
          <div className="flex h-full flex-col ">
          {/* Tabs */}
          <div className="relative z-20 mb-[54px] lg:mb-10 flex justify-center">
            <div className="flex rounded-full border border-gray-800/50 bg-[#0b142e] p-1">
              <TabButton
                active={activeTab === "direct"}
                onClick={() => handleTabChange("direct")}
              >
                Direct Connect
              </TabButton>
              <TabButton
                active={activeTab === "channel"}
                onClick={() => handleTabChange("channel")}
              >
                Channel Connect
              </TabButton>
            </div>
          </div>

          <div className="flex flex-1 flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 pb-6 lg:pb-[92px] min-h-0">
            {/* 3D Wheel */}
            <div
              className="relative z-0 w-full lg:col-span-5 h-[280px] lg:h-full lg:ml-22.5 shrink-0 overflow-hidden lg:overflow-visible"
              style={{ perspective: "1200px" }}
            >
              <div
                className="absolute inset-0 w-full origin-center lg:origin-left"
                style={{ transformStyle: "preserve-3d" }}
              >
                {currentFeatures.map((feature, i) => (
                  <WheelItem
                    key={`${activeTab}-${feature.id}`}
                    feature={feature}
                    index={i}
                    activeIndex={activeIndex}
                    onClick={() => selectFeature(i)}
                  />
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative z-10 w-full lg:col-span-7 aspect-video lg:aspect-auto lg:h-full shrink-0 mt-2 lg:mt-0">
              <div className="pointer-events-none absolute inset-0 rounded-3xl lg:rounded-l-3xl lg:rounded-r-none bg-gradient-to-tr from-[#ED862E]/10 to-transparent opacity-60 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeFeature.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full w-full lg:w-[150%] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeFeature.image}
                    alt={activeFeature.label}
                    className="h-full w-full object-contain lg:object-cover object-center lg:object-left-top p-2 lg:p-0"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          </div>
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
  activeIndex: number
  onClick: () => void
}

/** Degrees between adjacent items on the wheel. Smaller = straighter / less tilt. */
const WHEEL_ANGLE_STEP = 6
/** Vertical radius (px). Large + small angle keeps items nearly vertical with comfortable spacing. */
const WHEEL_RADIUS_Y = 1100
/** Depth radius (px). Kept modest so items barely recede — wheel reads as almost flat. */
const WHEEL_RADIUS_Z = 220
const DEG_TO_RAD = Math.PI / 180

function WheelItem({ feature, index, activeIndex, onClick }: WheelItemProps) {
  const offset = index - activeIndex
  const abs = Math.abs(offset)
  const angle = offset * WHEEL_ANGLE_STEP * DEG_TO_RAD
  const y = Math.sin(angle) * WHEEL_RADIUS_Y
  const z = (Math.cos(angle) - 1) * WHEEL_RADIUS_Z
  const rotateX = -offset * WHEEL_ANGLE_STEP
  const opacity = abs > 3 ? 0 : Math.max(0, 1 - abs * 0.32)
  const isActive = offset === 0
  const Icon = feature.icon

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={false}
      animate={{ y, z, rotateX, opacity }}
      transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.6 }}
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        translate: "0 -50%",
        transformOrigin: "center left",
      }}
      className={cn(
        "relative flex items-center gap-4 lg:gap-[24px] text-left w-full lg:w-[467px] py-2 lg:py-[10px] pr-[10px] pl-0"
      )}
    >
      {/* Background & Border Layer (active only) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-[8px] transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="absolute inset-0 rounded-[8px] bg-gradient-to-r from-[rgba(237,134,46,0.08)] to-transparent" />
        <div
          className="absolute inset-0 rounded-[8px] bg-gradient-to-r from-[#ED862E] to-transparent p-[1px]"
          style={{
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[8px] transition-colors duration-300 ml-3 lg:ml-[16px]",
          isActive ? "bg-[#ED862E]/10" : "bg-white/5"
        )}
      >
        <Icon className={cn("h-5 w-5", isActive ? "text-[#ED862E]" : "text-gray-500")} />
      </div>
      <div className="relative z-10 flex min-w-0 flex-col">
        <span
          className={cn(
            "truncate text-[15px] leading-tight font-semibold transition-colors duration-300 md:text-lg",
            isActive ? "text-white" : "text-gray-400"
          )}
        >
          {feature.label}
        </span>
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isActive ? "mt-1 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <p className="line-clamp-2 pr-2 text-[13px] lg:text-sm leading-relaxed text-gray-400 whitespace-normal">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
