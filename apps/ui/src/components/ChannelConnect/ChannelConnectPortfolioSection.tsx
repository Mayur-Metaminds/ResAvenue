"use client"

import Image from "next/image"
import { Bell, Settings2, Percent } from "lucide-react"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { cn } from "@/lib/styles"

export function ChannelConnectPortfolioSection() {
  return (
    <section className="w-full bg-white pt-[80px]">
      <div className="">
        <div
          className="flex flex-col overflow-hidden rounded-[45px]"
          style={{
            background: "radial-gradient(100% 100% at 100% 0%, #ED852E 0%, #1A2F6D 50%, #010E38 100%)"
          }}
        >
          {/* Block 1: Control Your Portfolio On the Go */}
          <div className="relative p-8 md:p-16 lg:px-24 lg:pt-24 lg:pb-16">
            <div className="relative z-10">
              <FeatureShowcase
                imagePosition="left"
                header={{
                  className: "mb-0", // No bottom margin because FeatureShowcase adds gap
                  eyebrow: (
                    <span className="font-plus-jakarta-700 text-[12px] uppercase tracking-[1px] text-white/50">
                      PORTFOLIO CONTROL, SIMPLIFIED
                    </span>
                  ) as any, // eyebrow prop typically accepts string, but Eyebrow handles nodes usually
                  title: (
                    <span
                      className="block font-plus-jakarta-500 text-[36px] leading-[1.2] tracking-[-0.9px] md:text-[48px] md:leading-[56.5px]"
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
                    </span>
                  ),
                  description: (
                    <span className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                      Never miss a critical update. Our premium mobile application
                      gives revenue managers real-time alerts and &quot;One-Touch&quot; rate
                      overriding capabilities.
                    </span>
                  ),
                }}
                imageSlot={
                  <div className="flex justify-center w-full lg:justify-start">
                    <div className="relative flex aspect-[3/4] w-full max-w-[320px] items-center justify-center overflow-hidden rounded-[32px] border border-slate-700 bg-slate-800 shadow-2xl">
                      <Image 
                        src="/images/Channel-Connect/Hero-img.png" 
                        alt="Mobile App" 
                        fill 
                        className="object-cover opacity-80"
                      />
                    </div>
                  </div>
                }
              >
                <FeatureShowcase.Card
                  variant="dark"
                  icon={<Bell className="h-5 w-5 text-white/80" />}
                  title="Instant Booking Alerts"
                />
                <FeatureShowcase.Card
                  variant="dark"
                  icon={<Settings2 className="h-5 w-5 text-white/80" />}
                  title="Quick Rate Override"
                  subtitle="Adjust pricing instantly to respond to last-minute demand changes."
                />
                <FeatureShowcase.Card
                  variant="dark"
                  icon={<Percent className="h-5 w-5 text-white/80" />}
                  title="Discounts & Promotions"
                />
              </FeatureShowcase>
            </div>
          </div>

          {/* Block 2: Decisions Driven by Data */}
          <div className="relative p-8 md:p-16 lg:px-24 lg:pt-16 lg:pb-24">
            <div className="relative z-10">
              <FeatureShowcase
                imagePosition="right"
                header={{
                  className: "mb-0",
                  eyebrow: (
                    <span className="font-plus-jakarta-700 text-[12px] uppercase tracking-[1px] text-white/50">
                      BUILT FOR DATA-DRIVEN DECISIONS
                    </span>
                  ) as any,
                  title: (
                    <span className="block font-plus-jakarta-500 text-[36px] leading-[1.2] tracking-[-0.9px] text-[#F9F9F9] md:text-[48px] md:leading-[56.5px]">
                      Decisions Driven by
                      <br />
                      Data, Not Guesswork
                    </span>
                  ),
                  description: (
                    <span className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                      Our advanced analytics suite breaks down your revenue performance by
                      channel, region, and segment in real time.
                    </span>
                  ),
                }}
                imageSlot={
                  <div className="flex justify-center w-full lg:justify-end">
                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] border border-slate-700 bg-slate-800 shadow-2xl">
                      <Image 
                        src="/images/Channel-Connect/Hero-img.png" 
                        alt="Dashboard Dummy" 
                        fill 
                        className="object-cover opacity-80"
                      />
                    </div>
                  </div>
                }
              >
                <BulletRow text="Track booking sources and identify top-performing channels." />
                <BulletRow text="Monitor revenue, occupancy, and key metrics in real-time." />
                <BulletRow text="Maintain consistent pricing across all OTAs." />
                <BulletRow text="Benchmark rates and stay ahead of the market." />
              </FeatureShowcase>
            </div>
          </div>
        </div>
      </div>
    </section>
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
