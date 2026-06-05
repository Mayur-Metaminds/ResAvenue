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
    name: "Products",
    href: "#",
    subItems: [
      { name: "Direct Connect", href: "/direct-connect" },
      { name: "Channel Connect", href: "/channel-connect" },
      { name: "Property management system", href: "#" },
      { name: "Revenue Management", href: "#" },
      { name: "Distribution Network", href: "#" },
      { name: "Event Management", href: "#" },
      { name: "Website Builder", href: "#" },
      { name: "Tours & Packages Engine", href: "#" },
      { name: "Mobile App Ecosystem", href: "#" },
    ],
  },
  { name: "Features", href: "#" },
  { name: "Benefits", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Resources", href: "#" },
]

type NavTheme = "light" | "dark"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedLink, setExpandedLink] = useState<string | null>("Products")
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

      // Re-query every call rather than capturing once: sections may be added
      // after mount (Suspense, animations, route changes), and the captured
      // array can't see them otherwise.
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-nav-theme]"
      )
      if (sections.length === 0) {
        // No themed sections on this page — fall back to dark default so we
        // don't carry over a stale theme from a previous route.
        setTheme("dark")
        return
      }

      // Walk sections in document order; the last one whose top is at-or-past
      // the navbar threshold (~80px from viewport top) is the one currently
      // under the navbar.
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
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const isDark = theme === "dark"

  return (
    <>
      <nav
        className={cn(
        "fixed top-0 left-0 z-50 w-full rounded-none px-[15px] py-[19px] transition-[top,width,padding,background-color,border-color,border-radius,box-shadow,backdrop-filter] duration-300 ease-out will-change-[top,width]",
        // Always center on desktop — works at full width too (left:50% + -translate-x-1/2 nets to left:0 when width is 100%).
        // Keeping these stable across scroll states eliminates the wobble from animating left/translate together.
        "lg:left-1/2 lg:-translate-x-1/2",
        scrolled
          ? [
              "lg:top-6 lg:w-[calc(100%-4rem)] lg:rounded-[100px] lg:border lg:px-2 lg:py-2 lg:shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
              isDark
                ? "bg-black/20 backdrop-blur-md lg:border-white/10 lg:bg-white/10"
                : "border-b border-black/5 bg-[linear-gradient(225deg,rgba(240,242,253,0.45)_0%,rgba(61,98,129,0.25)_100%)] backdrop-blur-[15px] lg:border-black/10 lg:shadow-sm",
            ]
          : "border-0 bg-transparent shadow-none backdrop-blur-none"
      )}
    >
      <div className={cn(
        "flex w-full items-center justify-between lg:px-4 transition-opacity", 
        isMobileMenuOpen ? "opacity-0 pointer-events-none duration-100" : "opacity-100 delay-[400ms] duration-500"
      )}>
        {/* Logo */}
        <div className="shrink-0 lg:ml-2">
          <Link href="/">
            {isDark ? <ResAvenueWhiteLogo /> : <ResAvenueBlackLogo />}
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center space-x-8 lg:flex lg:space-x-12">
          <div className="flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative inline-block typo-body3 transition-colors",
                  "hover:text-[#ED862E]",
                  // Animated underline in the same hover color, grows from the left.
                  "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#ED862E] after:transition-[width] after:duration-300 hover:after:w-full",
                  isDark ? "text-white/80" : "text-[#010E38]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="/contact-us"
            className={buttonVariants({
              variant: "primary",
              className:
                "typo-body3 flex h-[40.8px] w-[134.08px] items-center justify-center rounded-[50px] lg:mr-2",
            })}
            style={{ padding: "11px 21.661px 11.8px 22px" }}
          >
            Request a Demo
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "touch-manipulation p-2 lg:hidden",
            isDark ? "text-white" : "text-[#010C28]"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          {isMobileMenuOpen ? (
            <CloseBtn bgColor="transparent" iconColor="currentColor" size={28} />
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
            className="fixed inset-0 z-[100] flex flex-col lg:hidden"
            style={{
              background: "rgba(237, 134, 46, 0.60)",
              backdropFilter: "blur(20.7px)",
              WebkitBackdropFilter: "blur(20.7px)",
            }}
          >
            <div className="flex flex-1 flex-col overflow-hidden px-[15px] py-[19px] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="shrink-0">
                <ResAvenueWhiteLogo />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                aria-label="Close menu"
              >
                <CloseBtn bgColor="rgba(255, 255, 255, 0.15)" iconColor="#ffffff" size={36} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-white/10 pb-4">
                    {link.subItems ? (
                      <div>
                        <button
                          onClick={() => setExpandedLink(expandedLink === link.name ? null : link.name)}
                          className={cn(
                            "flex w-full items-center justify-between typo-body5 transition-colors hover:text-white/80",
                            expandedLink === link.name ? "text-[#ED862E]" : "text-white"
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
              <div className="mt-auto pt-8 pb-4">
                <Link
                  href="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={buttonVariants({
                    variant: "primary",
                    className:
                      "font-source-sans-600 flex w-full h-[48px] items-center justify-center rounded-[50px] text-[15px] text-white",
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
