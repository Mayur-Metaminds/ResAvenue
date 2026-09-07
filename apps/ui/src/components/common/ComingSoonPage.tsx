"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock3, Layers, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { Eyebrow } from "@/components/common/Eyebrow"
import { Footer } from "@/components/common/Footer"
import { HeroTitle } from "@/components/landing/HeroTitle"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/styles"

const easeOut = [0.22, 1, 0.36, 1] as const
const easeInOut = [0.4, 0, 0.2, 1] as const

const DESCRIPTION =
  "We're working on something new for modern hospitality teams. This experience is currently under development and will be available soon."

export function ComingSoonPage() {
  return (
    <>
      <section
        data-nav-theme="dark"
        className="relative flex min-h-[calc(100dvh-72px)] w-full flex-col overflow-hidden bg-[#0A0A0B] sm:min-h-[calc(100dvh-80px)]"
      >
        {/* Background photo */}
        <Image
          src="/images/hero_section_bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="pointer-events-none object-cover object-center select-none"
        />
        <div className="pointer-events-none absolute inset-0 bg-[#010C28]/45" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_12%,rgba(237,134,46,0.14),transparent_52%),radial-gradient(ellipse_at_84%_88%,rgba(99,115,195,0.12),transparent_50%)]" />

        {/* Hairline grid — very subtle, editorial */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to_right,rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.9)_1px,transparent_1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 30%, black 38%, transparent 82%)",
          }}
        />

        {/* Faint oversized watermark — desktop: 1-line; follows parent layout width & padding */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden select-none lg:block"
        >
          <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center px-4 pt-12 sm:pt-16 md:px-[32px] lg:px-[50px] lg:pt-20 2xl:px-[100px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
              className="w-full"
            >
              <svg
                viewBox="0 0 940 125"
                className="block h-auto w-full overflow-visible select-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-['Plus_Jakarta_Sans'] font-bold tracking-[-0.04em]"
                  fill="rgba(255, 255, 255, 0.035)"
                  fontSize="118"
                >
                  COMING SOON
                </text>
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Soft ambient accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-[18%] left-[-8%] hidden h-[520px] w-[520px] rounded-full bg-[#ED862E]/[0.07] blur-[110px] lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-10%] bottom-[-8%] hidden h-[640px] w-[640px] rounded-full bg-[#8FA0D1]/[0.06] blur-[130px] lg:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[min(58vw,560px)] w-[min(58vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[90px] lg:hidden"
        />

        {/* Content shell — px-4 md:px-[32px] lg:px-[50px] 2xl:px-[100px] */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-4 pt-24 pb-14 sm:pt-28 sm:pb-18 md:px-[32px] md:pt-32 lg:px-[50px] lg:pt-[132px] lg:pb-18 xl:pt-[144px] xl:pb-22 2xl:px-[100px]">
          <div className="grid w-full min-w-0 grid-cols-1 items-center gap-10 sm:gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 xl:gap-12 2xl:gap-16">
            {/* ── Left: editorial ── */}
            <div className="flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease: easeOut }}
                className="mb-5 flex justify-center sm:mb-6 lg:justify-start"
              >
                <Eyebrow
                  showDot={false}
                  className="gap-2.5"
                  style={
                    {
                      "--eyebrow-color": "rgba(255,255,255,0.72)",
                    } as React.CSSProperties
                  }
                >
                  <span className="inline-flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute inline-flex h-2 w-2 animate-[ping_2.6s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-[#ED862E]/30" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ED862E] shadow-[0_0_10px_rgba(237,134,46,0.55)]" />
                    </span>
                    In development Preview build
                  </span>
                </Eyebrow>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36, ease: easeOut }}
                className="flex w-full min-w-0 justify-center lg:justify-start"
              >
                <HeroTitle className="max-w-full text-center text-[38px] leading-[0.95] tracking-[-0.04em] whitespace-nowrap max-[360px]:text-[32px] max-[360px]:whitespace-normal sm:text-[46px] md:text-[52px] lg:text-left lg:text-[56px] xl:text-[64px]">
                  Coming{" "}
                  <HeroTitle.Highlight className="font-[600]">
                    Soon
                  </HeroTitle.Highlight>
                </HeroTitle>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.44, ease: easeOut }}
                className="typo-body1 mt-5 max-w-[34rem] text-center text-pretty text-white/60 sm:mt-6 lg:text-left"
              >
                {DESCRIPTION}
              </motion.p>

              {/* Inline build meta — progress + label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.52, ease: easeOut }}
                className="mt-7 flex w-full max-w-[420px] flex-col gap-3 sm:mt-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-white/45 uppercase">
                    <Clock3 className="h-3.5 w-3.5 text-white/35" />
                    Build progress
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-[0.08em] text-[#ED862E]">
                    Crafting
                  </span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-[68%] rounded-full bg-gradient-to-r from-[#ED862E] to-[#FDBA74]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.1, delay: 0.75, ease: easeOut }}
                    style={{ transformOrigin: "left" }}
                  />
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-[34%] rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-30%", "320%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.6,
                    }}
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] leading-none text-white/35 sm:text-[12px]">
                  <span className="h-px flex-1 bg-white/8" />
                  <span className="shrink-0 font-['Source_Sans_3']">
                    Design complete · Build in progress · Launch next
                  </span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.6, ease: easeOut }}
                className="mt-8 flex w-full max-w-[380px] flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-3.5 lg:justify-start"
              >
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "primary" }),
                    "group w-full justify-center gap-2 px-6 py-3 font-['Plus_Jakarta_Sans'] text-[14.5px] leading-6 font-semibold transition-all hover:opacity-90 sm:w-auto sm:px-7 sm:py-[13px]"
                  )}
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact-us"
                  className={cn(
                    buttonVariants({ variant: "secondary" }),
                    "w-full justify-center border-white/15 bg-white/[0.07] px-6 py-3 font-['Plus_Jakarta_Sans'] text-[14.5px] leading-6 font-semibold backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto sm:px-7 sm:py-[13px]"
                  )}
                >
                  Talk to Our Team
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.68, ease: easeOut }}
                className="mt-6 max-w-[36rem] text-center text-[12.5px] leading-5 text-white/30 sm:mt-7 lg:text-left"
              >
                You&apos;re early this module will live inside the ResAvenue
                hospitality ecosystem alongside Direct Connect and Channel
                Connect.
              </motion.p>
            </div>

            {/* ── Right: bespoke visual ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.78, ease: easeOut }}
              className="relative flex w-full min-w-0 justify-center lg:justify-end"
            >
              {/* Glow behind card */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 left-1/2 hidden h-[78%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-[#ED862E]/[0.09] blur-[64px] lg:block"
              />

              <div className="relative w-full max-w-[560px] lg:max-w-[520px] xl:max-w-[560px]">
                {/* Mobile & Tab watermark: 2 lines BEHIND the card, centered with space between lines */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 left-1/2 z-0 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-center select-none lg:hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
                    className="flex w-full flex-col items-center justify-center gap-3 sm:gap-5"
                  >
                    <span className="font-['Plus_Jakarta_Sans'] text-[clamp(64px,18vw,112px)] leading-none font-[800] tracking-[-0.04em] text-white/[0.08] uppercase">
                      COMING
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[clamp(64px,18vw,112px)] leading-none font-[800] tracking-[-0.04em] text-white/[0.08] uppercase">
                      SOON
                    </span>
                  </motion.div>
                </div>

                {/* Main card */}
                <div className="relative z-10 overflow-hidden rounded-[20px] border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] shadow-[0_24px_64px_rgba(0,0,0,0.45),0_1px_0_rgba(255,255,255,0.08)_inset] backdrop-blur-[8px] sm:rounded-[24px] xl:rounded-[28px]">
                  {/* Chrome bar */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3.5 sm:px-5 sm:py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ED862E]/70" />
                      </span>
                      <span className="hidden h-4 w-px bg-white/10 sm:block" />
                      <span className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase">
                        <Layers className="h-3.5 w-3.5 text-white/35" />
                        <span className="hidden sm:inline">
                          ResAvenue Platform Preview
                        </span>
                        <span className="sm:hidden">Platform Preview</span>
                      </span>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ED862E]/20 bg-[#ED862E]/10 px-2.5 py-1 font-['Plus_Jakarta_Sans'] text-[10px] font-bold tracking-[0.12em] text-[#FDBA74] uppercase">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ED862E]" />
                      Build
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="px-4 py-4 sm:px-5 sm:py-5 xl:px-6 xl:py-6">
                    {/* Top mini modules — represent hospitality stack being assembled */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        {
                          label: "Channel",
                          sub: "Sync Live",
                          active: false,
                          icon: Layers,
                        },
                        {
                          label: "Booking",
                          sub: "Engine",
                          active: true,
                          icon: Sparkles,
                        },
                        {
                          label: "Operations",
                          sub: "PMS Soon",
                          active: false,
                          icon: Clock3,
                        },
                      ].map(({ label, sub, active, icon: Icon }) => (
                        <div
                          key={label}
                          className={cn(
                            "relative flex flex-col gap-2 rounded-[12px] border p-2.5 sm:gap-2.5 sm:rounded-[14px] sm:px-3.5 sm:py-3.5",
                            active
                              ? "border-[#ED862E]/30 bg-[linear-gradient(180deg,rgba(237,134,46,0.14),rgba(237,134,46,0.06))] shadow-[0_8px_24px_rgba(237,134,46,0.18)]"
                              : "border-white/8 bg-white/[0.04]"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full border text-[10px] sm:h-7 sm:w-7 sm:text-[11px]",
                              active
                                ? "border-[#ED862E]/25 bg-[#ED862E] text-white shadow-[0_4px_12px_rgba(237,134,46,0.35)]"
                                : "border-white/10 bg-white/5 text-white/40"
                            )}
                          >
                            <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </span>
                          <span className="flex min-w-0 flex-col">
                            <span
                              className={cn(
                                "truncate font-['Plus_Jakarta_Sans'] text-[10px] font-bold tracking-[0.06em] uppercase sm:text-[11px] sm:tracking-[0.08em]",
                                active ? "text-white" : "text-white/70"
                              )}
                            >
                              {label}
                            </span>
                            <span className="truncate font-['Source_Sans_3'] text-[10px] leading-tight text-white/40 sm:text-[11px] sm:leading-none">
                              {sub}
                            </span>
                          </span>
                          {active && (
                            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#ED862E] shadow-[0_0_8px_rgba(237,134,46,0.6)] sm:top-2.5 sm:right-2.5" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Central blueprint / skeleton preview — translucent glass so underlying watermark is visible */}
                    <div className="relative mt-3.5 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.02] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:mt-5 sm:rounded-[16px] sm:p-4">
                      {/* subtle inner grid */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage:
                            "linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />
                      {/* shimmer sweep */}
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 w-[42%] bg-gradient-to-r from-transparent via-white/[0.055] to-transparent"
                        animate={{ x: ["-20%", "260%"] }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          ease: easeInOut,
                          repeatDelay: 0.8,
                        }}
                      />

                      <div className="relative flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[10px] font-semibold tracking-[0.12em] text-white/30 uppercase">
                            Experience blueprint
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2 py-1 font-['Plus_Jakarta_Sans'] text-[10px] font-semibold tracking-[0.08em] text-white/35">
                            <span className="h-1 w-1 rounded-full bg-[#ED862E]/70" />
                            Assembling
                          </span>
                        </div>

                        {/* skeleton rows */}
                        <div className="flex flex-col gap-2.5">
                          <div className="flex gap-2.5">
                            <div className="h-[46px] flex-1 rounded-[10px] border border-white/8 bg-white/[0.06] sm:h-[54px]" />
                            <div className="h-[46px] flex-1 rounded-[10px] border border-white/5 bg-white/[0.03] sm:h-[54px]" />
                          </div>
                          <div className="h-[36px] w-full rounded-[10px] border border-dashed border-white/12 bg-white/[0.02] sm:h-[42px]" />
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-6 rounded-full bg-white/[0.06] sm:h-7" />
                            <div className="h-6 rounded-full bg-white/[0.04] sm:h-7" />
                            <div className="h-6 rounded-full border border-[#ED862E]/20 bg-[#ED862E]/10 sm:h-7" />
                          </div>
                        </div>

                        {/* connection line hint */}
                        <div className="flex items-center gap-2 pt-1">
                          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                          <span className="shrink-0 font-['Source_Sans_3'] text-[9.5px] tracking-wide text-white/25 sm:text-[10px]">
                            Hospitality grade · Secure · Scalable
                          </span>
                          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-4 flex w-full items-center justify-center gap-1.5 sm:mt-5 sm:gap-0">
                      {[
                        { k: "01", label: "Design", done: true },
                        { k: "02", label: "Build", active: true },
                        { k: "03", label: "Launch", done: false },
                      ].map((step, i) => (
                        <React.Fragment key={step.k}>
                          {i > 0 && (
                            <span
                              aria-hidden
                              className={cn(
                                "mx-2 hidden h-px flex-1 sm:block lg:mx-3",
                                step.active || step.done
                                  ? "bg-[#ED862E]/30"
                                  : "bg-white/10"
                              )}
                            />
                          )}
                          <span
                            className={cn(
                              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 sm:gap-2 sm:px-3 sm:py-1.5",
                              step.active
                                ? "border-[#ED862E]/30 bg-[#ED862E]/10"
                                : step.done
                                  ? "border-white/10 bg-white/5"
                                  : "border-white/8 bg-transparent opacity-60"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9.5px] leading-none font-bold sm:h-5 sm:w-5 sm:text-[10px]",
                                step.active
                                  ? "bg-[#ED862E] text-white shadow-[0_2px_10px_rgba(237,134,46,0.4)]"
                                  : step.done
                                    ? "bg-white text-[#0A0A0B]"
                                    : "bg-white/10 text-white/40"
                              )}
                            >
                              {step.done ? "✓" : step.k}
                            </span>
                            <span
                              className={cn(
                                "font-['Plus_Jakarta_Sans'] text-[10.5px] font-semibold tracking-[0.04em] sm:text-[11px] sm:tracking-[0.06em]",
                                step.active ? "text-white" : "text-white/60"
                              )}
                            >
                              {step.label}
                            </span>
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Bottom strip */}
                  <div className="flex items-center justify-between gap-3 border-t border-white/7 bg-white/[0.015] px-4 py-3 sm:px-5">
                    <span className="font-['Source_Sans_3'] text-[11px] leading-none text-white/30">
                      Part of the ResAvenue ecosystem
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] text-[10px] font-semibold tracking-[0.1em] text-white/25 uppercase">
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      Stay tuned
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
