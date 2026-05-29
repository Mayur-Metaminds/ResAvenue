"use client"

import Image from "next/image"
import { Bell, Settings2, Percent } from "lucide-react"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { cn } from "@/lib/styles"
import { PortfolioIcon1, PortfolioIcon2, PortfolioIcon3 } from "../../../public/svg/Channel-Connect"
import { CheckedIcon } from "../../../public/svg/commonSvg"

export function ChannelConnectPortfolioSection() {
  return (
    <section data-nav-theme="light" className="w-full bg-white pt-[80px]">
      <div className="">
        <div
          className="flex flex-col gap-[32px] overflow-hidden rounded-[45px]"
          style={{
            background: "radial-gradient(100% 100% at 100% 0%, #ED852E 0%, #1A2F6D 50%, #010E38 100%)"
          }}
        >
          <div className="relative p-[20px] md:p-16 lg:px-24 lg:pt-24 lg:pb-16">
            <div className="relative z-10">
              <FeatureShowcase
                imagePosition="left"
                header={{
                  className: "mb-[24px]", 
                  eyebrow: "PORTFOLIO CONTROL, SIMPLIFIED",
                  eyebrowColor: "#FFF",
                  eyebrowClassName:"mb-0",
                  eyebrowDotColor: "#FFF",
                  title: "Control Your Portfolio\nOn the Go",
                  titleClassName:"mb-0",
                  titleHighlight: "Control Your Portfolio",
                  titleColor: "#F9F9F9",
                  highlightGradient: "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                  description: (
                    <span className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                      Never miss a critical update. Our premium mobile application
                      gives revenue managers real-time alerts and &quot;One-Touch&quot; rate
                      overriding capabilities.
                    </span>
                  ),
                }}
                imageSlot={
                  <div className="flex justify-center w-full">
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
                  icon={<PortfolioIcon1 className="h-5 w-5 text-white/80" />}
                  title="Instant Booking Alerts"
                />
                <FeatureShowcase.Card
                  variant="dark"
                  icon={<PortfolioIcon2 className="h-5 w-5 text-white/80" />}
                  title="Quick Rate Override"
                  subtitle="Adjust pricing instantly to respond to last-minute demand changes."
                />
                <FeatureShowcase.Card
                  variant="dark"
                  icon={<PortfolioIcon3 className="h-5 w-5 text-white/80" />}
                  title="Discounts & Promotions"
                />
              </FeatureShowcase>
            </div>
          </div>

          {/* Block 2: Decisions Driven by Data */}
          <div className="relative p-[20px] md:p-16 lg:px-24 lg:pt-16 lg:pb-24">
            <div className="relative z-10">
              <FeatureShowcase
                imagePosition="left"
                header={{
                  className: "mb-[24px]",
                  eyebrowDotColor: "#FFF",
                  eyebrowClassName: "mb-0",
                  titleClassName: "mb-0",
                  eyebrow: "BUILT FOR DATA-DRIVEN DECISIONS",
                  eyebrowColor: "#FFF",
                  title: "Decisions Driven by\nData, Not Guesswork",
                  titleHighlight: "Decisions Driven by",
                  highlightGradient: "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                  titleColor: "#F5F4F0",
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
                <CheckedRow text="Track booking sources and identify top-performing channels." />
                <CheckedRow text="Monitor revenue, occupancy, and key metrics in real-time." />
                <CheckedRow text="Maintain consistent pricing across all OTAs." />
                <CheckedRow text="Benchmark rates and stay ahead of the market." />
              </FeatureShowcase>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckedRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-[16px]">
      <CheckedIcon className="h-[20px] w-[20px] shrink-0" />
      <p className="font-source-sans-400 text-[16px] leading-[24px] text-white/80">
        {text}
      </p>
    </div>
  )
}