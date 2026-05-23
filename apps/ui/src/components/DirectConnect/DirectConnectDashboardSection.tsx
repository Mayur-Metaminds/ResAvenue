"use client"

export function DirectConnectDashboardSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/demo-section-bg-img.png')`,
      }}
    >
      <div className="container mx-auto max-w-[1200px] px-4 py-[80px] md:px-8 lg:py-[60px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
          {/* Left Column: Content */}
          <div className="z-10 flex flex-col">
            {/* Title */}
            <h2 className="font-plus-jakarta-700 mb-6 text-[36px] leading-[1.1] tracking-tight text-white md:text-[48px] lg:text-[56px]">
              Unified Intelligence <br className="hidden md:block" />
              Dashboard
            </h2>

            {/* Subtitle */}
            <p className="font-source-sans-400 mb-12 max-w-[90%] text-[16px] leading-[1.6] text-white/70 md:text-[18px]">
              Stop guessing. Get granular data on where your guests come from,
              why they book, and how you can maximize every dollar of revenue.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-12 md:gap-16">
              <div className="flex flex-col">
                <span className="font-plus-jakarta-700 mb-2 text-[40px] leading-none text-white md:text-[48px]">
                  2.4s
                </span>
                <span className="text-[10px] font-bold tracking-[1.5px] text-white/50 uppercase md:text-[12px]">
                  Avg. Load Time
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-plus-jakarta-700 mb-2 text-[40px] leading-none text-white md:text-[48px]">
                  18%
                </span>
                <span className="text-[10px] font-bold tracking-[1.5px] text-white/50 uppercase md:text-[12px]">
                  Revpar Growth
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Mockup Image */}
          <div className="relative z-10 flex aspect-[4/3] w-full items-center justify-center lg:origin-right lg:scale-110">
            <img
              src="/images/Direct-Connect/Unified-Intelligence-Dashboard.png"
              alt="Dashboard Mockup"
              className="h-full w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
