"use client"

export function MobileAppCTA() {
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
                <h2 className="typo-h1 mb-6 text-center text-white lg:text-[46px]! lg:leading-[51.52px]! lg:tracking-[-0.5px]!">
                    Create unforgettable events with less effort and more impact.
                </h2>

                <p className="typo-body1 mx-auto mb-10 max-w-2xl text-center text-white/50 text-[14px]! lg:text-[18px]! lg:leading-[30.6px]!">
                    Get started today and transform the way you manage and sell tickets.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="rounded-full border border-white/10 bg-[#1C2C47]/60 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-[#1C2C47]/80">
                        Explore Solutions
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MobileAppCTA
