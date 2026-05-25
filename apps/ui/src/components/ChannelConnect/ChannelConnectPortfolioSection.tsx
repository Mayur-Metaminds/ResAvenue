"use client"

import Image from "next/image"
import { Bell, Settings2, Percent } from "lucide-react"
import { cn } from "@/lib/styles"

export function ChannelConnectPortfolioSection() {
  return (
    <section className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-24 overflow-hidden rounded-[40px] bg-[#0A101F] p-8 md:p-16 lg:p-24 relative">
          
          {/* Subtle gradient background effect for the dark container */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

          {/* Block 1: Control Your Portfolio On the Go */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Mobile App Dummy Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative flex aspect-[3/4] w-full max-w-[320px] items-center justify-center rounded-[32px] bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-plus-jakarta-500 text-sm">
                  Mobile App Dummy
                </div>
                {/* Fallback local image if you want to swap to a real one */}
                {/* <Image src="/images/Channel-Connect/DummyMobile.png" alt="Mobile App" fill className="object-cover" /> */}
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-4 font-plus-jakarta-700 text-[12px] uppercase tracking-[1px] text-white/50">
                  PORTFOLIO CONTROL, SIMPLIFIED
                </p>
                <h2
                  className="mb-6 font-plus-jakarta-500 text-[36px] leading-[1.2] tracking-[-0.9px] md:text-[48px] md:leading-[56.5px]"
                  style={{
                    background:
                      "var(--text-gradient, linear-gradient(180deg, #F9F9F9 0%, #E8E8E8 100%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Control Your Portfolio
                  <br />
                  On the Go
                </h2>
                <p className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                  Never miss a critical update. Our premium mobile application gives
                  revenue managers real-time alerts and &quot;One-Touch&quot; rate
                  overriding capabilities.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <FeatureRow
                  icon={<Bell className="h-5 w-5 text-white/80" />}
                  title="Instant Booking Alerts"
                />
                <FeatureRow
                  icon={<Settings2 className="h-5 w-5 text-white/80" />}
                  title="Quick Rate Override"
                  subtitle="Adjust pricing instantly to respond to last-minute demand changes."
                />
                <FeatureRow
                  icon={<Percent className="h-5 w-5 text-white/80" />}
                  title="Discounts & Promotions"
                />
              </div>
            </div>
          </div>

          {/* Block 2: Decisions Driven by Data */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Text Content */}
            <div className="order-2 flex flex-col gap-8 lg:order-1">
              <div>
                <p className="mb-4 font-plus-jakarta-700 text-[12px] uppercase tracking-[1px] text-white/50">
                  BUILT FOR DATA-DRIVEN DECISIONS
                </p>
                <h2 className="mb-6 font-plus-jakarta-500 text-[36px] leading-[1.2] tracking-[-0.9px] text-[#F9F9F9] md:text-[48px] md:leading-[56.5px]">
                  Decisions Driven by
                  <br />
                  Data, Not Guesswork
                </h2>
                <p className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                  Our advanced analytics suite breaks down your revenue performance by
                  channel, region, and segment in real time.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <BulletRow text="Track booking sources and identify top-performing channels." />
                <BulletRow text="Monitor revenue, occupancy, and key metrics in real-time." />
                <BulletRow text="Maintain consistent pricing across all OTAs." />
                <BulletRow text="Benchmark rates and stay ahead of the market." />
              </div>
            </div>

            {/* Dashboard Dummy Image */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center rounded-[24px] bg-slate-800 border border-slate-700 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-plus-jakarta-500 text-sm">
                  Dashboard Dummy
                </div>
                {/* Fallback local image if you want to swap to a real one */}
                {/* <Image src="/images/Channel-Connect/DummyDashboard.png" alt="Dashboard" fill className="object-cover" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureRow({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-[16px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
        {icon}
      </div>
      <div className="flex flex-col pt-2">
        <h3 className="font-plus-jakarta-700 text-[16px] text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 font-source-sans-400 text-[14px] leading-[22px] text-[#94A3B8]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

function BulletRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ED862E]" />
      <p className="font-source-sans-400 text-[16px] leading-[24px] text-white/80">
        {text}
      </p>
    </div>
  )
}
