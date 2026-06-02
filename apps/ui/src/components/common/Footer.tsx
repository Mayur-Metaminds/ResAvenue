"use client"

import {
  Facebook,
  LinkedIn,
  ResAvenueWhiteLogo,
  Twitter,
} from "../../../public/svg/commonSvg"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#010C28] pt-20 pb-10 text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand & Description (Left Column) */}
          <div className="flex flex-col pr-8 md:col-span-5">
            <div className="mb-6 flex items-center">
              <ResAvenueWhiteLogo />
            </div>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-[#8b949e]">
              Comprehensive hotel technology platform for direct bookings,
              distribution, payments, and operations.
            </p>
          </div>

          {/* Links Columns (Right Side) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {/* Column 1: COMPANY */}
            <div className="flex flex-col">
              <h4 className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#8b949e] uppercase">
                COMPANY
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: SOLUTIONS */}
            <div className="flex flex-col">
              <h4 className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#8b949e] uppercase">
                SOLUTIONS
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Direct Connect
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Channel Connect
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Property Mgmt
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Revenue Mgmt
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: LEGAL */}
            <div className="flex flex-col">
              <h4 className="mb-6 text-[11px] font-bold tracking-[0.2em] text-[#8b949e] uppercase">
                LEGAL
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
          <p className="mb-4 text-xs text-[#8b949e] md:mb-0">
            © 2026 ResAvenue. All rights reserved.
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
