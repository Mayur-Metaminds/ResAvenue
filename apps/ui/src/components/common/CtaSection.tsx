"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CtaSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#010C28] py-32 lg:py-40"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 h-full w-full"
        style={{
          backgroundImage: "url('/images/demo-section-bg-img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Subtle overlay to ensure text readability if needed */}
      <div className="absolute inset-0 z-0 bg-[#010C28]/20 mix-blend-multiply" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl leading-[1.15] font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
          Transform the Way Your Hotel Operates
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed font-light text-gray-200 opacity-90 md:text-lg">
          Join thousands of hotels that have increased direct bookings, reduced
          OTA dependency, and streamlined operations.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-medium text-gray-900 shadow-lg transition-transform hover:scale-105 hover:bg-gray-100"
          >
            Request a Demo
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button className="rounded-full border border-white/10 bg-[#1C2C47]/60 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#1C2C47]/80">
            Explore Solutions
          </button>
        </div>
      </div>
    </section>
  )
}
