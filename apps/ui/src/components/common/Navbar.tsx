"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

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

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    )
    if (sections.length === 0) return

    const computeActive = () => {
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

    computeActive()
    window.addEventListener("scroll", computeActive, { passive: true })
    window.addEventListener("resize", computeActive)

    return () => {
      window.removeEventListener("scroll", computeActive)
      window.removeEventListener("resize", computeActive)
    }
  }, [])

  const isDark = theme === "dark"

  return (
    <nav
      className={cn(
        "fixed z-50 transition-all duration-300",
        "top-0 left-0 w-full rounded-none px-[15px] py-[19px]", // Mobile defaults
        "lg:top-6 lg:left-1/2 lg:w-[calc(100%-4rem)] lg:-translate-x-1/2 lg:rounded-[100px] lg:border lg:px-2 lg:py-2 lg:shadow-[0_8px_32px_rgba(0,0,0,0.1)]", // Desktop shape
        isDark
          ? "bg-transparent lg:border-white/10 lg:bg-white/10 lg:backdrop-blur-md"
          : "border-b border-black/5 bg-white/80 backdrop-blur-md lg:border-black/10 lg:shadow-sm"
      )}
    >
      <div className="flex w-full items-center justify-between lg:px-4">
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
                  isDark
                    ? "text-white/80 hover:text-white"
                    : "text-[#010C28]/80 hover:text-[#010C28]"
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

      {/* Mobile dropdown */}
      {isMobileMenuOpen && (
        <div className="px-20 md:hidden">
          <div className="mt-2 flex flex-col space-y-4 rounded-lg border border-[#333333] bg-[#18181A] p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary py-2 text-base font-medium text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="primary"
              className="mt-4 flex h-[40.8px] w-[134.08px] items-center justify-center rounded-[50px] !font-['Source_Sans_3'] text-[13px] leading-[20.8px] font-semibold text-white"
              style={{ padding: "11px 21.661px 11.8px 22px" }}
            >
              Request a Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
