import { SectionHeader } from '@/components/landing/SectionHeader'
import { AppearOnScroll } from '@/components/common/AppearOnScroll'
import { CalenderIcon, GuestUser, BoxCheck } from '../../../public/svg/Mobile-App'
import React from 'react'

const reservationPoints = [
    { Icon: CalenderIcon, label: 'Unified reservation calendar view' },
    { Icon: GuestUser, label: 'Instant guest communication tools' },
    { Icon: BoxCheck, label: 'One-click check-in/check-out status' },
]

const MobileAppReservations = () => {
    return (
        <section
            data-nav-theme="dark"
            className='w-full bg-cover bg-center bg-no-repeat py-[34px] sm:py-[40px] overflow-x-hidden'
            style={{ backgroundImage: "url('/images/hero_section_bg.png')" }}
        >
            <div className='mx-auto flex w-full max-w-[1920px] gap-[17px] lg:gap-16 flex-col lg:flex-row px-[16px] sm:px-[80px]'>
                <div className='bg-[#F1F5F90D] max-sm:h-[512px] rounded-3xl sm:flex-1 flex items-center justify-center'>
                    <AppearOnScroll x={-40} y={0}>
                        <img
                            className='h-[343px] w-[343px] sm:h-[384px] sm:w-[384px] rounded-3xl -rotate-3'
                            src="/images/Mobile-App/mobileAppReservations.png" alt="" />
                    </AppearOnScroll>
                </div>
                <div className='sm:flex-1 min-w-0 sm:py-[60px] lg:py-[100px] text-left py-[34px]'>
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
                        {reservationPoints.map(({ Icon, label }) => (
                            <li key={label} className="flex items-center gap-3 lg:gap-4">
                                <span aria-hidden="true" className="shrink-0">
                                    <Icon />
                                </span>
                                <span className="typo-body1 text-white xl:text-[24px]">
                                    {label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default MobileAppReservations
