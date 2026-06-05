import { SectionHeader } from '@/components/landing/SectionHeader'
import { AppearOnScroll } from '@/components/common/AppearOnScroll'
import React from 'react'

// Dummy placeholder icons (reused Mobile-App svgs) — swap with the real ones later.
const reservationPoints = [
    { icon: '/images/Mobile-App/Icon.svg', label: 'Unified reservation calendar view' },
    { icon: '/images/Mobile-App/carbon_workflow-automation.svg', label: 'Instant guest communication tools' },
    { icon: '/images/Mobile-App/lsicon_control-outline.svg', label: 'One-click check-in/check-out status' },
]

const MobileAppReservations = () => {
    return (
        <section
            data-nav-theme="dark"
            className='w-full flex flex-col lg:flex-row px-[16px] sm:px-[80px] bg-cover bg-center bg-no-repeat py-[34px] sm:py-[40px]'
            style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
        >
            <div className='bg-[#F1F5F90D] max-sm:h-[512px] rounded-3xl sm:flex-1 flex items-center justify-center'>
                <AppearOnScroll x={-40} y={0}>
                    <img
                        className='h-[343px] w-[343px] sm:h-[384px] sm:w-[384px] rounded-3xl -rotate-3'
                        src="/images/Mobile-App/mobileAppReservations.png" alt="" />
                </AppearOnScroll>
            </div>
            <div className='sm:flex-1 min-w-0 py-[60px] md:px-8 lg:py-[100px] text-left'>
                <SectionHeader
                    eyebrow={<span>OPERATIONS</span>}
                    eyebrowClassName="typo-body2 text-[14px] text-[#ED862E]"
                    className="items-start text-left"
                    descriptionClassName="typo-body1 text-left text-white/55"
                    title="Reservation Management"
                    titleHighlight="Management"
                    titleColor="#FFFFFF"
                    highlightGradient="linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)"
                    description="Get a 360-degree view of all guest bookings. Search, modify, or cancel reservations with a unified inbox that brings all channels together."
                />

                <ul className="mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-6">
                    {reservationPoints.map(({ icon, label }) => (
                        <li key={label} className="flex items-center gap-3 lg:gap-4">
                            <img
                                src={icon}
                                alt=""
                                aria-hidden="true"
                                className="shrink-0 h-5 w-5 xl:h-7 xl:w-7"
                            />
                            <span className="typo-body1 text-white xl:text-[24px]">
                                {label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default MobileAppReservations
