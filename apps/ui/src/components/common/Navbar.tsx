"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/styles"

import {
  HamburgerMenuSvg,
  ResAvenueBlackLogo,
  ResAvenueWhiteLogo,
} from "../../../public/svg/commonSvg"

const navLinks = [
  { name: "Products", href: "#" },
  { name: "Features", href: "#" },
  { name: "Benefits", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Resources", href: "#" },
]

type NavTheme = "light" | "dark"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Default to dark — hero is the first section, and we want correct colors before JS hydrates.
  const [theme, setTheme] = useState<NavTheme>("dark")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    )

    const compute = () => {
      setScrolled(window.scrollY > 0)

      if (sections.length === 0) return
      // The section whose top is just above the navbar's bottom (~80px) is the
      // one currently under the navbar. Walk sections; pick the last one whose
      // top has scrolled past the navbar threshold.
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

    compute()
    window.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)

    return () => {
      window.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [])

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
                ? "bg-transparent lg:border-white/10 lg:bg-white/10 lg:backdrop-blur-md"
                : "border-b border-black/5 bg-[linear-gradient(225deg,rgba(240,242,253,0.18)_0%,rgba(61,98,129,0.12)_100%)] backdrop-blur-[15px] lg:border-black/10 lg:shadow-sm",
            ]
          : "border-0 bg-transparent shadow-none backdrop-blur-none"
      )}
    >
      <div className={cn(
        "flex w-full items-center justify-between lg:px-4 transition-opacity duration-300", 
        isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        {/* Logo */}
        <div className="shrink-0 lg:ml-2">
          <Link href="/">
            {isDark ? <ResAvenueWhiteLogo /> : <ResAvenueBlackLogo />}
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center space-x-8 md:flex lg:space-x-12">
          <div className="flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "font-source-sans-400 text-[14px] leading-[22.4px] transition-colors",
                  "hover:text-[#ED862E]",
                  isDark ? "text-white/80" : "text-[#010E38]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Button
            variant="primary"
            className="font-source-sans-600 flex h-[40.8px] w-[134.08px] items-center justify-center rounded-[50px] text-[13px] leading-[20.8px] text-white lg:mr-2"
            style={{ padding: "11px 21.661px 11.8px 22px" }}
          >
            Request a Demo
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "touch-manipulation p-2 md:hidden",
            isDark ? "text-white" : "text-[#010C28]"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          {isMobileMenuOpen ? (
            <span className="text-2xl leading-none">&times;</span>
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
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col p-4 md:hidden"
          >
            <div 
            className="flex flex-1 flex-col overflow-hidden rounded-[24px] border-[1px] p-6 shadow-2xl"
            style={{
              borderColor: "rgba(255, 255, 255, 0.10)",
              background: "rgba(237, 134, 46, 0.25)",
              backdropFilter: "blur(20.7px)",
              WebkitBackdropFilter: "blur(20.7px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="shrink-0">
                <ResAvenueWhiteLogo />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-black/20 text-white transition-colors hover:bg-black/40"
                aria-label="Close menu"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col overflow-y-auto">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-white/10 pb-4">
                    <Link
                      href={link.href}
                      className="text-lg font-medium text-white transition-colors hover:text-[#ED862E]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto pt-8 pb-4">
                <Button
                  variant="primary"
                  className="font-source-sans-600 flex w-full h-[48px] items-center justify-center rounded-[50px] text-[15px] text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request a Demo
                </Button>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
