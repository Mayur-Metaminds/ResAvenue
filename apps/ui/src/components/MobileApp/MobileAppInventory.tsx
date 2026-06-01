import { SectionHeader } from '@/components/landing/SectionHeader'
import React from 'react'

const inventoryPoints = [
    { icon: '/images/Mobile-App/Icon.svg', label: 'Bulk inventory updates in two taps' },
    { icon: '/images/Mobile-App/carbon_workflow-automation.svg', label: 'Dynamic pricing rules automation' },
    { icon: '/images/Mobile-App/lsicon_control-outline.svg', label: 'Stop-sell control for all channels' },
]

const MobileAppInventory = () => {
    return (
        <section data-nav-theme="light" className='bg-white w-full flex flex-col lg:flex-row px-[16px] sm:px-[80px] py-[34px] sm:py-[40px]'>
            <div className='sm:flex-1 min-w-0 py-[60px] md:px-8 lg:py-[100px] text-left'>
                <SectionHeader
                    eyebrow={<span>REAL-TIME CONTROL</span>}
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
                            Inventory & Rate Management
                        </SectionHeader.Highlight>
                    }
                    description="Update rates and inventory across all OTAs and your brand website instantly.
Prevent overbookings with lightning-fast cloud synchronization."
                />

                {/* typo-body1 matches font-family/weight + mobile 16px/22.4px + desktop 31.5px line-height.
                    Only the desktop font-size (24px vs utility's 18px) and color are overridden inline. */}
                <ul className="mt-6 flex flex-col gap-4 lg:mt-8 lg:gap-6">
                    {inventoryPoints.map(({ icon, label }) => (
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
                <img
                    className='h-[343px] w-[343px] sm:h-[384px] sm:w-[384px] rounded-3xl rotate-3'
                    src="/images/Mobile-App/mobileAppInventory.png" alt="" />
            </div>
        </section>
    )
}

export default MobileAppInventory