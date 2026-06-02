import { SectionHeader } from '@/components/landing/SectionHeader'
import { AppearOnScroll } from '@/components/common/AppearOnScroll'
import React from 'react'

// Dummy placeholder icons (reused Mobile-App svgs) — swap with the real ones later.
const alertsPoints = [
    { icon: '/images/Mobile-App/Icon.svg', label: 'Customizable alert priority settings' },
    { icon: '/images/Mobile-App/carbon_workflow-automation.svg', label: 'Daily summary of key performance metrics' },
    { icon: '/images/Mobile-App/lsicon_control-outline.svg', label: 'Team-wide notification syncing' },
]

const MobileAppAlerts = () => {
    return (
        <section data-nav-theme="light" className='bg-white w-full flex flex-col lg:flex-row px-[16px] sm:px-[80px] py-[34px] sm:py-[40px]'>
            <div className='sm:flex-1 min-w-0 py-[60px] md:px-8 lg:py-[100px] text-left'>
                <SectionHeader
                    eyebrow={<span>STAY INFORMED</span>}
                    eyebrowClassName="typo-body2 text-[14px] text-[#ED862E]"
                    className="items-start text-left"
                    descriptionClassName="typo-body1 text-left text-[#64748B]"
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
                            Smart Alerts & Notifications
                        </SectionHeader.Highlight>
                    }
                    description="Never miss a beat. Receive push notifications for new bookings, cancellations, and performance milestones in real-time."
                />

                <ul className="mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-6">
                    {alertsPoints.map(({ icon, label }) => (
                        <li key={label} className="flex items-center gap-3 lg:gap-4">
                            <img
                                src={icon}
                                alt=""
                                aria-hidden="true"
                                className="shrink-0 h-5 w-5 xl:h-7 xl:w-7"
                            />
                            <span className="typo-body1 text-[#334155] xl:text-[24px]">
                                {label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='bg-[#F1F5F9] max-sm:h-[512px] rounded-3xl sm:flex-1 flex items-center justify-center'>
                <AppearOnScroll x={40} y={0}>
                    <img
                        className='h-[311.004px] w-[311.004px] max-w-[384px] aspect-square sm:h-[384px] sm:w-[384px] rounded-3xl rotate-[1deg]'
                        src="/images/Mobile-App/mobileAppAlerts.png" alt="" />
                </AppearOnScroll>
            </div>
        </section>
    )
}

export default MobileAppAlerts
