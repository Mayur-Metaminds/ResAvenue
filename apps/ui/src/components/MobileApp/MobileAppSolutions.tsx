import React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"



const MobileAppSolutions = () => {
    return (
        <section data-nav-theme="light" className="w-full bg-[#F6F7FB] px-4 py-[60px] md:px-8 lg:py-[100px]">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    eyebrow={<span>OUR SOLUTIONS</span>}
                    eyebrowClassName="typo-body2 text-[14px] text-[#ED862E] text-center"
                    className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
                    descriptionClassName="typo-body1 text-center text-[#64748B]"
                    title={
                        <SectionHeader.Highlight
                            style={{
                                background:
                                    "var(--cta-gradient, linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%))",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Hotels run on disparate systems.
                            Yours doesn't have to.
                        </SectionHeader.Highlight>
                    }
                    description="Powerful modules designed to work together to create seamless event experiences from creation to post-event analysis."
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                </div>



            </div>
        </section>
    )
}

export default MobileAppSolutions