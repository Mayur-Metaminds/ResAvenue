"use client"

import Link from "next/link"

import { CurrentYear } from "@/components/common/CurrentYear"
import { cn } from "@/lib/styles"

import {
  Facebook,
  LinkedIn,
  ResAvenueWhiteLogo,
  Twitter,
} from "../../../public/svg/commonSvg"

interface FooterProps {
  /**
   * Render without the footer's own opaque background so it can sit inside a
   * section that already paints one (e.g. CtaSection) and share that backdrop.
   */
  nested?: boolean
  className?: string
}

export function Footer({ nested = false, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full  text-white",
        nested ? "pt-16 pb-10" : "bg-[#010C28] pt-20 pb-10",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand & Description (Left Column) */}
          <div className="flex flex-col pr-8 lg:col-span-4 xl:col-span-4">
            <div className="mb-6 flex items-center">
              <ResAvenueWhiteLogo />
            </div>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-[#8b949e]">
              Comprehensive hotel technology platform for direct bookings,
              distribution, payments, and operations.
            </p>
          </div>

          {/* Links Columns (Right Side) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 xl:col-span-8">
            {/* Column 1: COMPANY */}
            <div className="flex flex-col">
              <h3 className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#8b949e] uppercase">
                COMPANY
              </h3>
              <ul className="space-y-4">
                {/* About Us, Careers, and Partners intentionally have no href
                    — those pages don't exist yet. Rendered as inert text
                    (not <a>) so crawlers don't report them as broken/404
                    internal links. Re-add the href once each page exists. */}
                <li>
                  <span className="text-sm text-gray-300">About Us</span>
                </li>
                <li>
                  <span className="text-sm text-gray-300">Careers</span>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <span className="text-sm text-gray-300">Partners</span>
                </li>
              </ul>
            </div>

            {/* Column 2: LEGAL */}
            <div className="flex flex-col">
              <h3 className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#8b949e] uppercase">
                LEGAL
              </h3>
              <ul className="space-y-4">
                {/* Same as COMPANY above — no href until these pages exist. */}
                <li>
                  <span className="text-sm text-gray-300">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-sm text-gray-300">Terms of Service</span>
                </li>
                <li>
                  <span className="text-sm text-gray-300">Cookie Policy</span>
                </li>
              </ul>
            </div>

            {/* Column 3: SOLUTIONS */}
            <div className="flex flex-col sm:col-span-2">
              <h3 className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#8b949e] uppercase">
                SOLUTIONS
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 w-full">
                {[
                  { title: "Direct Connect", href: "/direct-connect" },
                  { title: "Channel Connect", href: "/channel-connect" },
                  { title: "Property Management System", href: "/property-management" },
                  { title: "Revenue Management", href: "/#" },
                  { title: "Distribution Network", href: "/distributed-technology" },
                  { title: "Event Management", href: "/event-booking" },
                  { title: "Website Builder", href: "/hotel-website-builder" },
                  { title: "Tours & Packages Engine", href: "/#" },
                  { title: "Mobile App Ecosystem", href: "/mobile-app" },
                  { title: "Analytics & Reporting", href: "/#" },
                  { title: "Guest CRM & Loyalty", href: "/#" },
                ].map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-sm text-gray-300 transition-colors hover:text-white"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
          <p className="mb-4 text-xs text-[#8b949e] md:mb-0">
            © <CurrentYear /> ResAvenue. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center   transition-all hover:bg-white/10 hover:text-white"
            >
              <LinkedIn className="h-4 w-4 fill-current" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center   transition-all hover:bg-white/10 hover:text-white"
            >
              <Twitter className="h-4 w-4 fill-current" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center  transition-all hover:bg-white/10 hover:text-white"
            >
              <Facebook className="h-4 w-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
