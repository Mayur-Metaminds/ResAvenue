import { SectionHeader } from '@/components/landing/SectionHeader'
import React from 'react'

const MobileAppCoreFeatures = () => {
    return (
        <section data-nav-theme="light" className="w-full bg-white px-4 py-[40px] md:px-8">
            <div className="mx-auto max-w-6xl">
                <SectionHeader
                    className="mx-auto max-w-3xl text-center"
                    descriptionClassName="typo-body1 text-center text-[#64748B]"
                    title={
                        <SectionHeader.Highlight
                            style={{
                                background: "var(--cta-gradient, linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%))",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Core Features
                        </SectionHeader.Highlight>
                    }
                    description="Powerful modules designed to work together to create seamless event experiences from creation to post-event analysis."
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                </div>



            </div>
        </section >
    )
}

export default MobileAppCoreFeatures