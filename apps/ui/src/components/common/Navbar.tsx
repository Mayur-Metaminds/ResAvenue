"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Minus, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/styles"

import {
  HamburgerMenuSvg,
  ResAvenueBlackLogo,
  ResAvenueWhiteLogo,
  CloseBtn,
} from "../../../public/svg/commonSvg"

const navLinks = [
  {
    name: "Services",
    href: "#",
    subItems: [
      { name: "Direct Connect", href: "/direct-connect" },
      { name: "Channel Connect", href: "/channel-connect" },
      { name: "Mobile App for CM", href: "/mobile-app" },
      { name: "Property Management System", href: "/property-management" },
      { name: "Revenue Management & Price", href: "/revenue-management" },
      { name: "Hotel Website Builder", href: "/hotel-website-builder" },
      { name: "Event Management & Ticketing", href: "/event-booking" },
      { name: "Distribution Technology", href: "/distributed-technology" },
    ],
  },
  { name: "About Us", href: "/about-us" },
  { name: "Pricing", href: "/pricing" },
  {
    name: "Support Center",
    href: "#",
    subItems: [
      { name: "Knowledge Base & Tutorials", href: "/knowledge-base" },
      { name: "FAQs", href: "/faqs" },
      { name: "Ticketing & Chat", href: "/contact-us" },
    ],
  },
  { name: "Resources", href: "/resource-page" },
  { name: "Partners & resellers", href: "/partners" },
  {
    name: "Login",
    href: "#",
    subItems: [
      {
        name: "Direct Connect",
        href: "https://crs.resavenue.com/res_mars_new/",
      },
      {
        name: "Channel Connect",
        href: "https://cm.resavenue.com/channelcontroller/",
      },
    ],
  },
]

type NavTheme = "light" | "dark"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedLink, setExpandedLink] = useState<string | null>("Services")
  // Default to dark — hero is the first section, and we want correct colors before JS hydrates.
  const [theme, setTheme] = useState<NavTheme>("dark")
  const [scrolled, setScrolled] = useState(false)
  // Re-run the theme-detection effect whenever the route changes. The Navbar
  // lives in the root layout and does NOT unmount on Next.js navigation, so
  // without this dep we'd be reading stale `data-nav-theme` elements from the
  // previous page.
  const pathname = usePathname()

  useEffect(() => {
    let rafId: number | null = null

    const compute = () => {
      setScrolled(window.scrollY > 0)

      const sections =
        document.querySelectorAll<HTMLElement>("[data-nav-theme]")
      if (sections.length === 0) {
        setTheme("dark")

        return
      }

      const threshold = 80
      let current: NavTheme = "dark"
      for (const section of sections) {
        const top = section.getBoundingClientRect().top
        if (top <= threshold) {
          current = (section.dataset.navTheme as NavTheme) ?? "dark"
        }
      }
      setTheme(current)
    }

    // rAF-throttle scroll handler — coalesces a burst of scroll events into
    // one layout read per frame.
    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        compute()
      })
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", compute)

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", compute)
    }
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Close the mobile menu once the desktop navbar breakpoint (xl) is reached.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)")
    const onChange = () => {
      if (mq.matches) setIsMobileMenuOpen(false)
    }
    onChange()
    mq.addEventListener("change", onChange)

    return () => mq.removeEventListener("change", onChange)
  }, [])

  const isDark = theme === "dark"

  return (
    <>
      <nav
        className={cn(
          "4xl:px-100 fixed top-0 left-0 z-[100] w-full rounded-none px-[15px] py-[19px] transition-[top,width,padding,background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-300 ease-out will-change-[top,width]",
          // Always center on desktop — works at full width too (left:50% + -translate-x-1/2 nets to left:0 when width is 100%).
          // Keeping these stable across scroll states eliminates the wobble from animating left/translate together.
          // Desktop navbar chrome starts at xl; lg and below use the mobile navbar.
          "xl:left-1/2 xl:-translate-x-1/2",
          scrolled
            ? [
                "xl:top-6 xl:w-[calc(100%-2rem)] xl:rounded-[100px] xl:border xl:px-2 xl:py-2 xl:shadow-[0_8px_32px_rgba(0,0,0,0.1)] 2xl:w-[calc(100%-4rem)]",
                isDark
                  ? "bg-black/20 backdrop-blur-md xl:border-white/10 xl:bg-white/10"
                  : "border-b border-black/5 bg-[linear-gradient(225deg,rgba(240,242,253,0.18)_0%,rgba(61,98,129,0.12)_100%)] backdrop-blur-[15px] xl:border-black/10 xl:shadow-sm",
              ]
            : "border-0 bg-transparent shadow-none backdrop-blur-none"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between transition-opacity xl:px-4",
            isMobileMenuOpen
              ? "pointer-events-none opacity-0 duration-100"
              : "opacity-100 delay-[400ms] duration-500"
          )}
        >
          {/* Logo */}
          <div className="shrink-0 xl:ml-2">
            <Link href="/">
              {isDark ? <ResAvenueWhiteLogo /> : <ResAvenueBlackLogo />}
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 xl:flex">
            <div className="flex items-center xl:space-x-3 2xl:space-x-8">
              {navLinks.map((link) => {
                const isLogin = link.name === "Login"

                return (
                  <div
                    key={link.name}
                    className={cn(
                      "group relative inline-block",
                      // Services / Support Center: py-2 is part of the hit area above the
                      // shared pt-4 dropdown offset. Login is a tall CTA button, so py-0
                      // keeps top-full at the button bottom — then the same pt-4 matches.
                      isLogin ? "py-0" : "py-2",
                      link.subItems && "hover:z-50"
                    )}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "typo-body3 relative flex shrink-0 items-center gap-1.5 whitespace-nowrap transition-colors",
                        isLogin
                          ? buttonVariants({
                              variant: "primary",
                              className:
                                "box-border h-[40.8px] leading-none text-white after:hidden hover:text-white hover:opacity-90",
                            })
                          : [
                              "hover:text-[#ED862E]",
                              // Animated underline in the same hover color, grows from the left.
                              "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#ED862E] after:transition-[width] after:duration-300 hover:after:w-full",
                              isDark ? "text-white/80" : "text-[#010E38]",
                            ]
                      )}
                      style={
                        isLogin
                          ? { padding: "11px 21.661px 11.8px 22px" }
                          : undefined
                      }
                    >
                      {link.name}
                      {link.subItems && (
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-200 group-hover:rotate-180"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {link.subItems && (
                      // Dropdown offset:
                      // - Text links (Services / Support Center): wrapper py-2 puts 8px
                      //   under the label, then pt-4 (16px) → visible label→panel air ≈ 8px
                      //   of py-2 (reads as nav) + short bridge.
                      // - Login is a solid CTA with py-0, so top-full = button bottom.
                      //   Using the same pt-4 leaves a full 16px empty band under the
                      //   orange button. pt-2 matches the visible gap under Support Center.
                      <div
                        className={cn(
                          "pointer-events-none invisible absolute top-full left-1/2 z-[110] -translate-x-1/2 group-hover:pointer-events-auto group-hover:visible",
                          isLogin ? "pt-[13.75px]" : "pt-4"
                        )}
                      >
                        <div
                          className={cn(
                            "relative isolate flex w-[186px] flex-col gap-[8px] rounded-[5px] p-[10px] backdrop-blur-md",
                            isDark
                              ? "bg-[rgba(0,0,0,0.22)]"
                              : "border border-black/5 bg-white/90 shadow-sm"
                          )}
                        >
                          {link.subItems.map((sub, idx) => (
                            <div
                              key={sub.name}
                              className="flex flex-col gap-[10px]"
                            >
                              {idx > 0 && (
                                <div className="h-[1px] w-full bg-[#D7D9D9]/40" />
                              )}
                              <Link
                                href={sub.href}
                                className={cn(
                                  "block text-left text-[14px] leading-normal font-medium transition-colors",
                                  isDark
                                    ? "text-white/80 hover:text-white"
                                    : "text-[#010C28]/80 hover:text-[#010C28]"
                                )}
                              >
                                {sub.name}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <Link
              href="/contact-us"
              className={buttonVariants({
                variant: "primary",
                className:
                  "typo-body3 flex h-[40.8px] w-[134.08px] items-center justify-center rounded-[50px] xl:mr-2",
              })}
              style={{ padding: "11px 21.661px 11.8px 22px" }}
            >
              Request a Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn(
              "touch-manipulation p-2 xl:hidden",
              isDark ? "text-white" : "text-[#010C28]"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileMenuOpen ? (
              <CloseBtn
                bgColor="transparent"
                iconColor="currentColor"
                size={28}
              />
            ) : (
              <HamburgerMenuSvg />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] flex flex-col xl:hidden"
            style={{
              background: "rgba(237, 134, 46, 0.60)",
              backdropFilter: "blur(20.7px)",
              WebkitBackdropFilter: "blur(20.7px)",
            }}
          >
            <div className="flex flex-1 flex-col overflow-hidden px-[15px] py-[19px] shadow-2xl md:px-[24px] lg:px-[32px]">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <div className="shrink-0">
                  <ResAvenueWhiteLogo />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  aria-label="Close menu"
                >
                  <CloseBtn
                    bgColor="rgba(255, 255, 255, 0.15)"
                    iconColor="#ffffff"
                    size={36}
                  />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-1 flex-col overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <div
                      key={link.name}
                      className="border-b border-white/10 pb-4"
                    >
                      {link.subItems ? (
                        <div>
                          <button
                            onClick={() =>
                              setExpandedLink(
                                expandedLink === link.name ? null : link.name
                              )
                            }
                            className={cn(
                              "typo-body5 flex w-full items-center justify-between transition-colors hover:text-white/80",
                              expandedLink === link.name
                                ? "text-[#ED862E]"
                                : "text-white"
                            )}
                          >
                            {link.name}
                            {expandedLink === link.name ? (
                              <Minus className="h-5 w-5 shrink-0" />
                            ) : (
                              <Plus className="h-5 w-5 shrink-0" />
                            )}
                          </button>
                          <AnimatePresence>
                            {expandedLink === link.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-5 flex flex-col space-y-[18px] pl-4">
                                  {link.subItems.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="typo-body3 text-white transition-colors hover:text-[#ED862E]"
                                    >
                                      {subItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          className="typo-body5 text-white transition-colors hover:text-[#ED862E]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto flex justify-center pt-8 pb-4">
                  <Link
                    href="/contact-us"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={buttonVariants({
                      variant: "primary",
                      className:
                        "font-source-sans-600 flex h-[48px] w-full max-w-[240px] items-center justify-center rounded-[50px] text-[15px] text-white",
                    })}
                  >
                    Request a Demo
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
