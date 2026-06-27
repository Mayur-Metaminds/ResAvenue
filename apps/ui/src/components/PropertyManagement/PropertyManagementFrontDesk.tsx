"use client"

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { ArrowRightLeft, CalendarCog, ClipboardList } from "lucide-react"
import type React from "react"
import { useRef, useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

function IconBadge({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <span
      className={cn(
        "flex h-12 w-12 min-w-12 shrink-0 items-center justify-center rounded-[14px] transition-colors duration-500 lg:h-14 lg:w-14",
        active ? "bg-[#ED862E]/15 text-[#ED862E]" : "bg-white/5 text-white/30"
      )}
    >
      {children}
    </span>
  )
}

const bullets = [
  {
    id: "reservation",
    icon: <CalendarCog className="h-5 w-5 lg:h-6 lg:w-6" />,
    title: (
      <>
        Real-time reservation <span className="text-[#ED862E]">updates</span>
      </>
    ),
    description:
      "Stay on top of every booking with instant updates synced across all your channels and devices.",
  },
  {
    id: "checkin",
    icon: <ArrowRightLeft className="h-5 w-5 lg:h-6 lg:w-6" />,
    title: (
      <>
        Quick Check-in<span className="text-[#ED862E]">/Check-out</span>
      </>
    ),
    description:
      "Manage rates, inventory, and bookings across OTAs, GDS, and direct channels in real time.",
  },
  {
    id: "assignment",
    icon: <ClipboardList className="h-5 w-5 lg:h-6 lg:w-6" />,
    title: (
      <>
        Automated room <span className="text-[#ED862E]">assignment</span>
      </>
    ),
    description:
      "Let the system intelligently assign rooms based on availability, guest preferences, and housekeeping status.",
  },
]

// Shared header — rendered above the panel on mobile (normal flow, scrolls out
// before the sticky panel pins) and inside the right column on desktop.
function FrontDeskHeader({ className }: { className?: string }) {
  return (
    <SectionHeader
      eyebrow="SMARTER FRONT DESK. FASTER CHECK-INS. HAPPIER GUESTS."
      eyebrowColor="#FFFFFF"
      className={cn("items-start text-left", className)}
      descriptionClassName="typo-body1 text-left text-[#FFFFFF80]"
      title={
        <>
          Front Desk{" "}
          <SectionHeader.Highlight>
            Operations<span className="hidden lg:inline"> .</span>
          </SectionHeader.Highlight>
        </>
      }
      titleColor="#FFFFFF"
      highlightGradient="linear-gradient(90deg, #ED862E 0%, #ED862E 100%)"
      description={
        <>
          Empower your front desk team with everything they need in one place.
          <br />
          Manage reservations, walk-ins, and guest interactions with speed and precision.
        </>
      }
    />
  )
}

const PropertyManagementFrontDesk = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const sectionHeight = `${bullets.length * 100}vh`

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const indexMotion = useTransform(scrollYProgress, [0, 1], [0, bullets.length - 1])

  useMotionValueEvent(indexMotion, "change", (latest) => {
    const next = Math.max(0, Math.min(bullets.length - 1, Math.round(latest)))
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const scrollToBullet = (i: number, behavior: ScrollBehavior = "smooth") => {
    const el = sectionRef.current
    if (!el) return
    const sectionTop = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    const progress = i / Math.max(1, bullets.length - 1)
    window.scrollTo({ top: sectionTop + scrollable * progress, behavior })
  }

  const activeBullet = bullets[activeIndex] ?? bullets[0]

  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative h-[calc(var(--fd-section-h)_+_60vh)] w-full bg-[#010C28] lg:h-[var(--fd-section-h)]"
      style={{ "--fd-section-h": sectionHeight } as React.CSSProperties}
    >
      {/* Mobile-only header — normal flow above the panel, so the sticky panel
          only pins once this description has scrolled out the top of the viewport. */}
      <div className="px-4 pt-15 sm:px-20 lg:hidden">
        <FrontDeskHeader />
      </div>

      {/* Sticky panel — bullets (and the header on desktop) pinned on the right */}
      <div className="sticky top-20 h-[calc(100dvh-5rem)] w-full overflow-hidden">
        <div className="flex h-full flex-col gap-4 px-4 py-6 sm:px-20 lg:flex-row lg:items-center lg:gap-10 lg:py-15">

          {/* Left — image placeholder */}
          <div className="relative order-last flex h-44 w-full shrink-0 min-w-0 items-center justify-center lg:order-0 lg:h-full lg:flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBullet?.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-full w-full rounded-3xl border border-white/10 bg-white/5 flex items-center justify-center"
              >
                <span className="text-white/20 text-sm">{activeBullet?.id}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — header + bullets */}
          <div className="flex min-w-0 flex-col justify-center text-left lg:flex-1">
            {/* Desktop-only header — glued above the bullets inside the panel */}
            <FrontDeskHeader className="mt-20 mb-8 hidden lg:mb-20 lg:flex" />
            {/* Bullets */}
            <div className="flex flex-col gap-6 lg:gap-8 lg:pb-20">
              {bullets.map((bullet, i) => {
                const isActive = i === activeIndex
                return (
                  <button
                    key={bullet.id}
                    type="button"
                    onClick={() => scrollToBullet(i)}
                    className={cn(
                      "flex items-start gap-4 text-left transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-40"
                    )}
                  >
                    <IconBadge active={isActive}>{bullet.icon}</IconBadge>
                    <div>
                      <h3
                        className={cn(
                          "font-plus-jakarta-700 leading-7 text-white transition-all duration-500",
                          isActive ? "text-[24px]" : "text-[20px]"
                        )}
                      >
                        {bullet.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="typo-body1 max-w-108 overflow-hidden text-[#FFFFFF80]"
                          >
                            {bullet.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PropertyManagementFrontDesk
