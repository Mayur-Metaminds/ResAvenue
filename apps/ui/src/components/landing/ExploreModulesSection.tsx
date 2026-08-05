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
  ThreeDWheelIcon10,
  ThreeDWheelIcon11,
  ThreeDWheelIcon12,
  ThreeDWheelIcon13,
  ThreeDWheelIcon14,
  ThreeDWheelIcon2,
  ThreeDWheelIcon3,
  ThreeDWheelIcon4,
  ThreeDWheelIcon5,
  ThreeDWheelIcon6,
  ThreeDWheelIcon7,
  ThreeDWheelIcon8,
  ThreeDWheelIcon9,
} from "../../../public/svg/LandingPage"
import type * as React from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"


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
  /** Optional className merged onto the feature photo (scale + positioning nudges). */
  imageClassName?: string
}

const directConnectFeatures: FeatureStep[] = [
  {
    id: "booking-engine",
    label: "Responsive Booking Engine",
    description:
      "Seamless bookings across every device. Deliver a fast, mobile-first experience that converts.",
    imageClassName: "2xl:scale-[1.1] 2xl:mt-10 xl:ml-20 xl:mr-10 2xl:ml-15 4xl:translate-x-20",
    icon: ThreeDWheelIcon1,
    image: "/images/Landing/explore-module-direct_connect/booking-engine.avif",
  },
  {
    id: "corporate",
    label: "Corporate & Member Management",
    description:
      "Build loyalty that drives repeat bookings.Manage corporate clients and members with ease.",
    icon: ThreeDWheelIcon2,
    imageClassName: "2xl:scale-[1.1] 2xl:mt-15 xl:ml-10 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-direct_connect/corporate-management.avif",
  },
  {
    id: "analytics",
    label: "Analytics & Reporting",
    description:
      "Turn data into smarter decisions. Track performance and unlock actionable insights instantly.",
    icon: ThreeDWheelIcon3,
    imageClassName: "2xl:scale-[1.1] 2xl:mt-10 xl:ml-10 xl:mr-10 4xl:translate-x-30",
    image: "/images/Landing/explore-module-direct_connect/analytics-reporting.avif",
  },
  {
    id: "discounts",
    label: "Discounts & Promotions",
    description:
      "Drive demand with irresistible offers. Launch targeted promotions that convert more bookings.",
    icon: ThreeDWheelIcon4,
    image: "/images/Landing/explore-module-direct_connect/discounts-promotions.avif",
    imageClassName: "xl:mt-10 xl:ml-10 xl:mr-10 2xl:scale-[1.2] 4xl:scale-[1.05] 4xl:translate-x-20",
  },
  {
    id: "events",
    label: "Events & Ticketing",
    description:
      "Drive demand with irresistible offers. Launch targeted promotions that convert more bookings.",
    icon: ThreeDWheelIcon5,
    image: "/images/Landing/explore-module-direct_connect/events-ticketing.avif",
    imageClassName: " 2xl:mt-5 xl:mr-10 4xl:translate-x-20",
  },
  {
    id: "packages",
    label: "Packages Engine",
    description:
      "Sell more with curated experiences. Bundle rooms, services, and offers to boost revenue.",
    icon: ThreeDWheelIcon6,
    imageClassName: "2xl:scale-[1.1] 2xl:mt-10 xl:ml-10 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-direct_connect/packages-engine.avif",
  },
  {
    id: "invoice",
    label: "Invoice Payments",
    description:
      "Faster payments. Zero friction. Simplify invoicing with secure and seamless transactions.",
    icon: ThreeDWheelIcon7,
    imageClassName: "2xl:scale-[1.1] mt-15 xl:ml-10 xl:mr-10 4xl:scale-100 4xl:translate-x-20",
    image: "/images/Landing/explore-module-direct_connect/invoice-payment.avif",
  },
]

const channelConnectFeatures: FeatureStep[] = [
  {
    id: "rate-inventory",
    label: "Rate / Inventory Management",
    description:
      "Stay in control across all channels. Update rates and inventory in real-time without errors.",
    icon: ThreeDWheelIcon8,
    imageClassName: "2xl:scale-[1.1] 2xl:mt-10 xl:mr-10 4xl:translate-x-30",
    image: "/images/Landing/explore-module-channel_connect/rate-inventory.avif",
  },
  {
    id: "property-management",
    label: "Property Management",
    description:
      "Manage every property from one place. Simplify operations with centralized control and visibility.",
    icon: ThreeDWheelIcon9,
    imageClassName: "2xl:scale-[1.1] 2xl:mt-10 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-channel_connect/property-management.avif",
  },
  {
    id: "yield-management",
    label: "Yield Management",
    description:
      "Maximize revenue with smart pricing. Adjust rates dynamically based on demand and trends.",
    icon: ThreeDWheelIcon10,
    imageClassName: "2xl:scale-[1.2] 4xl:scale-[1] 2xl:mt-10 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-channel_connect/yield-management.avif",
  },
  {
    id: "competitor-analysis",
    label: "Competitor Analysis",
    description:
      "Know your market. Stay ahead. Track competitor pricing and make smarter decisions.",
    icon: ThreeDWheelIcon11,
    imageClassName: "2xl:scale-[1.1] xl:mt-5 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-channel_connect/competitor-analysis.avif",
  },
  {
    id: "seasonal-pricing",
    label: "Seasonal Pricing",
    description:
      "Adapt pricing to every season. Optimize rates effortlessly for peak and low demand.",
    icon: ThreeDWheelIcon12,
    imageClassName: "2xl:scale-[1.2] 4xl:scale-[1.1] 2xl:mt-10 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-channel_connect/seasonal-pricing.avif",
  },
  {
    id: "promotions",
    label: "Promotions",
    description:
      "Launch offers that actually convert. Create and manage campaigns across all channels.",
    icon: ThreeDWheelIcon13,
    imageClassName: "2xl:scale-[1.2] 4xl:scale-[1.1] 2xl:mt-15 2xl:mr-10 xl:mr-15 4xl:translate-x-20",
    image: "/images/Landing/explore-module-channel_connect/promotions.avif",
  },
  {
    id: "reports-analytics",
    label: "Reports & Analytics",
    description:
      "See what's working. Improve faster. Get deep insights into performance across channels.",
    icon: ThreeDWheelIcon14,
    imageClassName: "2xl:scale-[1.2] 4xl:scale-[1] 2xl:mt-10 xl:mr-10 4xl:translate-x-20",
    image: "/images/Landing/explore-module-channel_connect/reports-analytics.avif",
  },
]

export function ExploreModulesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<"direct" | "channel">("direct")
  const [activeIndex, setActiveIndex] = useState(0)
  // 4K (2560px+): keep the module at a fixed 800px so the next section peeks
  // below instead of a full-viewport sticky takeover.
  const [is4k, setIs4k] = useState(false)

  const wheelCooldownRef = useRef(0)
  const exitLockoutRef = useRef(0)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const activeIndexRef = useRef(0)
  const is4kRef = useRef(false)

  activeIndexRef.current = activeIndex
  is4kRef.current = is4k

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 2560px)")
    const sync = () => setIs4k(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const currentFeatures =
    activeTab === "direct" ? directConnectFeatures : channelConnectFeatures

  // Matches sticky top classes: top-16 (mobile) / sm:top-24 / lg:top-20
  const getStickyOffset = () =>
    window.innerWidth >= 1024 ? 80 : window.innerWidth >= 640 ? 96 : 64

  // One viewport of page scroll per feature step. The sticky inner stays pinned
  // for the full outer-section height, so the user "stays in" the section until
  // they've scrolled through every step — then the section ends naturally and
  // the next section comes into view. At 4K we skip the tall track entirely.
  const stepsPerSection = Math.max(1, currentFeatures.length) + 1
  const sectionHeight = is4k ? undefined : `${stepsPerSection * 100}vh`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 96px", "end end"],
  })

  // Map scroll progress (0..1) to a fractional index, then snap to nearest int.
  const indexMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, currentFeatures.length)]
  )
  useMotionValueEvent(indexMotion, "change", (latest) => {
    if (is4k) return
    const next = Math.max(
      0,
      Math.min(currentFeatures.length - 1, Math.round(latest))
    )
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const scrollToFeature = (i: number, behavior: ScrollBehavior = "smooth") => {
    if (is4k) {
      setActiveIndex(i)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const stickyOffset = getStickyOffset()
    const pinStart = sectionTop - stickyOffset
    const scrollable = el.offsetHeight - (window.innerHeight - stickyOffset)
    const progress = i / Math.max(1, currentFeatures.length)
    window.scrollTo({ top: pinStart + scrollable * progress, behavior })
  }

  const isSectionEngaged = () => {
    const el = sectionRef.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    if (is4kRef.current) {
      return rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15
    }
    const stickyOffset = getStickyOffset()
    return rect.top <= stickyOffset + 1 && rect.bottom >= window.innerHeight - 1
  }

  const AUTOPLAY_MS = 5000

  const clearAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }

  const startAutoplay = () => {
    clearAutoplay()
    if (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    autoplayRef.current = setInterval(() => {
      if (!isSectionEngaged()) return
      const len = currentFeatures.length
      if (len <= 1) return
      const prev = activeIndexRef.current
      const next = (prev + 1) % len
      const wrapping = next === 0 && prev === len - 1
      if (is4kRef.current) {
        setActiveIndex(next)
      } else {
        scrollToFeature(next, wrapping ? "instant" : "smooth")
      }
    }, AUTOPLAY_MS)
  }

  useEffect(() => {
    startAutoplay()
    return clearAutoplay
    // Restart when the feature list changes (tab switch).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, currentFeatures.length, is4k])

  // When the user switches tabs we preserve their RELATIVE progress (0..1)
  // in the section rather than resetting them to the top. This stops sticky
  // from detaching mid-switch and avoids the disorienting jump-to-top feel.
  // The actual scroll re-anchor happens in useIsoLayoutEffect below, after
  // React commits the new section height.
  const pendingProgressRef = useRef<number | null>(null)

  const handleTabChange = (tab: "direct" | "channel") => {
    if (tab === activeTab) return
    if (is4k) {
      setActiveTab(tab)
      setActiveIndex(0)
      startAutoplay()
      return
    }
    const el = sectionRef.current
    if (el) {
      const sectionTop = el.getBoundingClientRect().top + window.scrollY
      const stickyOffset = getStickyOffset()
      const pinStart = sectionTop - stickyOffset
      const scrollable = el.offsetHeight - (window.innerHeight - stickyOffset)
      pendingProgressRef.current =
        scrollable > 0
          ? Math.max(0, Math.min(1, (window.scrollY - pinStart) / scrollable))
          : 0
    }
    setActiveTab(tab)
    startAutoplay()
    // activeIndex resyncs from the scroll-driven useMotionValueEvent below.
  }

  useIsoLayoutEffect(() => {
    if (is4k) return
    const progress = pendingProgressRef.current
    if (progress == null) return
    pendingProgressRef.current = null
    const el = sectionRef.current
    if (!el) return
    const sectionTop = el.getBoundingClientRect().top + window.scrollY
    const stickyOffset = getStickyOffset()
    const pinStart = sectionTop - stickyOffset
    const scrollable = el.offsetHeight - (window.innerHeight - stickyOffset)
    window.scrollTo({
      top: pinStart + scrollable * progress,
      behavior: "instant",
    })
  }, [activeTab, is4k])

  const selectFeature = (i: number) => {
    setActiveIndex(i)
    scrollToFeature(i)
    startAutoplay()
  }

  // Wheel/trackpad hijacking — while the section is pinned, swallow wheel
  // events and snap exactly one step at a time. Without this, the natural
  // scroll distance per wheel varies (~50px on slow trackpads, 500px+ on a
  // fast swipe), so a single gesture would non-deterministically advance 1,
  // 2, or 3 steps depending on velocity. The cooldown matches the smooth
  // scroll duration so a burst of trackpad inertia events still resolves
  // to one step. At the section's first/last step, we let wheel events
  // bubble naturally so the user can scroll out of the section.
  // At 4K the section is a fixed 800px block (not sticky), so wheel over it
  // just steps the active feature without hijacking page scroll height.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const COOLDOWN_MS = 800
    const EXIT_LOCKOUT_MS = 1000

    const isPinned = () => {
      const rect = el.getBoundingClientRect()
      const stickyOffset = getStickyOffset()
      // Allow 1px tolerance for browser subpixel layout rounding
      return rect.top <= stickyOffset + 1 && rect.bottom >= window.innerHeight - 1
    }

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now()
      const direction = Math.sign(e.deltaY)
      if (direction === 0) return

      if (is4k) {
        const rect = el.getBoundingClientRect()
        const overSection =
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right
        if (!overSection) return

        const target = activeIndex + direction
        if (target < 0 || target >= currentFeatures.length) return

        if (now < wheelCooldownRef.current) {
          e.preventDefault()
          return
        }

        e.preventDefault()
        wheelCooldownRef.current = now + COOLDOWN_MS
        setActiveIndex(target)
        startAutoplay()
        return
      }

      if (!isPinned()) return

      if (now < exitLockoutRef.current) return

      const target = activeIndex + direction
      // Boundaries: let the user scroll out of the section in the natural
      // direction (don't preventDefault). Arm the exit lockout so subsequent
      // inertia events don't get trapped by the cooldown check.
      if (target < 0 || target >= currentFeatures.length) {
        exitLockoutRef.current = now + EXIT_LOCKOUT_MS
        return
      }

      if (now < wheelCooldownRef.current) {
        e.preventDefault()

        return
      }

      e.preventDefault()
      wheelCooldownRef.current = now + COOLDOWN_MS
      scrollToFeature(target, "instant")
      startAutoplay()
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => window.removeEventListener("wheel", handleWheel)
  }, [activeIndex, currentFeatures.length, is4k])

  const activeFeature = currentFeatures[activeIndex] ?? currentFeatures[0]
  if (!activeFeature) return null

  return (
    <section
      data-nav-theme="dark"
      className="relative w-full bg-[#010C28] text-white 4xl:pb-20"
    >
      {/* Header — in normal flow, scrolls away with the page */}
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-1 pt-24 lg:pt-20">
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

      {/* Sticky tracking area — at 4K this is a fixed 800px block (not full-viewport) */}
      <div
        ref={sectionRef}
        className={cn(is4k && "h-[800px]")}
        style={sectionHeight ? { height: sectionHeight } : undefined}
      >
        {/* Sticky block — pins below the fixed navbar so the tabs row stays visible.
            At 4K: relative + 800px so the next section stays visible below. */}
        <div className="sticky top-16 sm:top-24 lg:top-20 h-[calc(100dvh-6rem)] lg:h-[calc(100dvh-5rem)] w-full overflow-hidden 4xl:relative 4xl:top-auto 4xl:h-[800px]">
          {/* Row container — widened at 2xl/4xl (separate from the header's
              max-w-[1440px] above) so the 7-col image grid track actually has
              room to grow. Without this, the image column's max-w-[...] caps
              below were unreachable: a child's max-width can only shrink it
              within its grid track, never force the track itself to expand. */}
          <div className="mx-auto flex w-full max-w-[1440px] 2xl:max-w-[1800px] 4xl:max-w-[2200px] flex-col px-4 lg:px-1 h-full justify-center">
            <div className="flex h-full flex-col ">
              {/* Tabs */}
              <div className="relative z-20 mb-[54px] lg:mb-10 flex justify-center 4xl:mb-6">
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

              <div className="flex flex-1 flex-col lg:grid lg:grid-cols-12 lg:grid-rows-1 gap-6 lg:gap-12 4xl:gap-24 pb-6 lg:pb-[92px] 4xl:px-35 4xl:pb-6 min-h-0">
                {/* 3D Wheel */}
                <div
                  className="relative z-0 w-full lg:col-span-5 h-[280px] lg:h-full lg:self-center lg:ml-[20px] xl:ml-22.5 shrink-0 overflow-hidden lg:overflow-visible max-sm:-translate-y-6"
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

                {/* Image column — now has real room (see widened row container
                    above), so the max-w cap below is a true ceiling rather than
                    an unreachable request. Per-feature scale-[...] in
                    imageClassName is restored: it can push slightly past this
                    box since there's no overflow-hidden here by design. */}
                <div className="relative z-10 w-full lg:col-span-7 h-[260px] md:h-[320px] lg:h-full shrink-0 -mt-20 mb-2 sm:mt-4 sm:mb-0 lg:mt-0 4xl:pl-16 flex items-center justify-center 4xl:justify-start">
                  <div className="relative w-full h-full max-w-[560px] sm:max-w-[600px] lg:max-w-[900px] 2xl:max-w-[1100px] 4xl:w-[920px] mx-auto 4xl:mx-0">
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#ED862E]/10 to-transparent opacity-60 blur-3xl" />
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeTab}-${activeFeature.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full w-full flex items-center justify-center"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeFeature.image}
                          alt={activeFeature.label}
                          className={cn(
                            "h-full w-full max-w-full max-h-full rounded-[20px] object-contain object-center p-2 lg:p-0",
                            activeFeature.imageClassName
                          )}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
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

        "w-auto px-[26px] py-[10px]",

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
/** Tighter vertical radius below the `sm` breakpoint. */
const WHEEL_RADIUS_Y_SM = 720
/** Depth radius (px). Kept modest so items barely recede — wheel reads as almost flat. */
const WHEEL_RADIUS_Z = 220
const DEG_TO_RAD = Math.PI / 180

function WheelItem({ feature, index, activeIndex, onClick }: WheelItemProps) {
  const [isSm, setIsSm] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)")
    const sync = () => setIsSm(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  const offset = index - activeIndex
  const abs = Math.abs(offset)
  const angle = offset * WHEEL_ANGLE_STEP * DEG_TO_RAD
  const radiusY = isSm ? WHEEL_RADIUS_Y_SM : WHEEL_RADIUS_Y
  const y = Math.sin(angle) * radiusY
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
        "relative flex items-center gap-3 sm:gap-4 lg:gap-[24px] text-left w-full lg:w-full xl:w-[467px] py-1 sm:py-2 lg:py-[10px] pr-[10px] pl-0"
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
          "relative z-10 flex h-[36px] w-[36px] sm:h-[48px] sm:w-[48px] shrink-0 items-center justify-center rounded-[8px] transition-colors duration-300 ml-3 lg:ml-[16px]",
          isActive ? "bg-[#ED862E]/10" : "bg-white/5"
        )}
      >
        <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", isActive ? "text-[#ED862E]" : "text-gray-500")} />
      </div>
      <div className="relative z-10 flex min-w-0 flex-col">
        <span
          className={cn(
            "truncate font-plus-jakarta-500 text-[12px] leading-[18px] sm:text-[16px] sm:leading-[24px] transition-colors duration-300",
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
            <p className="line-clamp-2 pr-2 text-[11px] sm:text-[13px] lg:text-sm leading-relaxed text-gray-400 whitespace-normal">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  )
}
