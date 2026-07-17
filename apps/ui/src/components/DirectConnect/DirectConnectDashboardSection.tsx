"use client"

import { CountUp } from "@/components/common/CountUp"
import { LazyLottie } from "@/components/common/LazyLottie"
import { INTELLIGENT_ANALYTICS_INNER } from "@/lib/lottie-urls"

export function DirectConnectDashboardSection() {
  return (
    <section
      data-nav-theme="dark"
      className="relative mt-[80px] w-full overflow-hidden bg-cover bg-center bg-no-repeat md:rounded-none rounded-[32px]"
      style={{
        backgroundImage: `url('/images/demo-section-bg-img.png')`,
      }}
    >
      <div className="container mx-auto max-w-[1440px] px-[16px] py-[34px] lg:px-[80px] lg:py-[60px]">
        <div className="grid grid-cols-1 items-center gap-[34px] lg:grid-cols-2 lg:gap-8">
          {/* Left Column: Content */}
          <div className="z-10 flex flex-col gap-[24px]">
            {/* Title */}
            <h2 className="font-plus-jakarta-500 text-[36px] leading-[1.1] tracking-tight text-white md:text-[48px]">
              Unified Intelligence <br className="hidden md:block" />
              Dashboard
            </h2>

            {/* Subtitle */}
            <p className="font-source-sans-400 max-w-[90%] text-[16px] leading-[1.6] text-white/70 md:text-[18px]">
              Stop guessing. Get granular data on where your guests come from,
              why they book, and how you can maximize every dollar of revenue.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-12 md:gap-16">
              <div className="flex flex-col">
                <span className="font-plus-jakarta-700 mb-2 text-[36px] leading-none text-[#ED862E] md:text-[48px]">
                  <CountUp
                    target={2.4}
                    suffix="s"
                    format={(n) => n.toFixed(1)}
                  />
                </span>
                <span className="font-source-sans-600 text-[10px] font-bold tracking-[1.5px] text-white/50 uppercase md:text-[12px]">
                  Avg. Load Time
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-plus-jakarta-700 mb-2 text-[40px] leading-none text-[#ED862E] md:text-[48px]">
                  <CountUp target={18} suffix="%" />
                </span>
                <span className="font-source-sans-600 text-[10px] font-bold tracking-[1.5px] text-white/50 uppercase md:text-[12px]">
                  Revpar Growth
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mockup Animation */}
          <div className="relative z-10 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[16px] lg:origin-center lg:scale-130 lg:rounded-[24px]">
            <LazyLottie
              src={INTELLIGENT_ANALYTICS_INNER}
              priority="lazy"
              loop
              className="flex h-full w-full items-center justify-center drop-shadow-2xl"
              lottieClassName="h-auto max-h-full w-full sm:-mb-30 md:-mb-22 lg:-mb-30 xl:-ml-5"
              rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
