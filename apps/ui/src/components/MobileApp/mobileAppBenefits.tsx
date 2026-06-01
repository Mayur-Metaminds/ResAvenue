import { SectionHeader } from '@/components/landing/SectionHeader'
import { Clock, Smartphone, TrendingUp, Zap } from 'lucide-react'
import React from 'react'

const benefits = [
    {
        icon: Smartphone,
        title: 'Total Control on the Go',
        description: 'Manage your hotel anytime, anywhere with full functionality in your pocket.',
    },
    {
        icon: Zap,
        title: 'Real-Time Accuracy',
        description: 'Eliminate delays and discrepancies with lightning-fast cloud synchronization.',
    },
    {
        icon: TrendingUp,
        title: 'Boost Revenue',
        description: 'Optimize pricing and distribution instantly to maximize your RevPAR.',
    },
    {
        icon: Clock,
        title: 'Save Time',
        description: 'Reduce manual updates and operational overhead with automated workflows.',
    },
]

const mobileAppBenefits = () => {
    return (
        <section data-nav-theme="light" className='bg-white w-full px-4 md:px-8 py-[60px] lg:py-[100px]'>
            <SectionHeader
                eyebrow={<span>BENEFITS</span>}
                eyebrowClassName="typo-body2 text-[14px] text-[#ED862E] text-center"
                className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
                titleClassName="tracking-[-1.5px]! lg:text-[36px]! lg:leading-[40px]! lg:tracking-normal!"
                descriptionClassName="typo-body1 text-center text-[#64748B] hidden lg:block"
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
                        Why Choose Our Mobile App?
                    </SectionHeader.Highlight>
                }
                description="Everything you need to know about ResAvenue Mobile."
            />

            <div className='mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 lg:grid-cols-4 lg:justify-items-stretch'>
                {benefits.map(({ icon: Icon, title, description }) => (
                    <div
                        key={title}
                        className='flex w-[343px] max-w-full flex-col items-center gap-[14.8px] rounded-[24px] border-[3px] border-[#ED862E40] bg-[#F8FAFC] p-6 text-center lg:w-auto lg:border-[#E2E8F0]'
                    >
                        <span className='flex h-14 w-14 items-center justify-center rounded-full bg-[#ED862E1A]'>
                            <Icon className='h-6 w-6 text-[#ED862E]' aria-hidden='true' />
                        </span>
                        <h3 className='font-plus-jakarta-700 text-[18px] leading-[24px] text-[#0F172A]'>
                            {title}
                        </h3>
                        <p className='font-source-sans-400 text-[16px] leading-[22.4px] text-[#64748B]'>
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default mobileAppBenefits