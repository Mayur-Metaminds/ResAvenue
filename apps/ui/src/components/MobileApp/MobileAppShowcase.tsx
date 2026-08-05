"use client"

import { Marquee } from '@/components/common/Marquee'

// Text content from the design; card images are intentionally left as dummy placeholders.
const showcaseCards = [
    {
        title: 'Control in the Palm of your Hands',
        description: 'Manage all your distribution channels from an intuitive interface.',
    },
    {
        title: 'Seamless Payment Collections',
        description: 'Ensure smooth and quick payment collection directly on the app.',
    },
    {
        title: 'User-Friendly Mobile Experience',
        description: 'Designed for speed, simplicity, and efficiency.',
    },
    {
        title: 'Secure & Reliable',
        description: 'Your data is always protected and accessible.',
    },
]

type ShowcaseCard = (typeof showcaseCards)[number]

const MobileAppShowcase = () => {
    return (
        <section
            data-nav-theme="light"
            className='bg-white w-full sm:px-[40px] py-[34px] sm:py-[40px]'
        >
            <Marquee<ShowcaseCard>
                items={showcaseCards}
                getKey={(card) => card.title}
                durationSeconds={70}
                gapPx={24}
                className="py-4 sm:py-5"
                backgroundColor="#FFFFFF"
                ariaLabel="Mobile app highlights"
                renderItem={({ title, description }) => (
                    <div className='h-full w-[300px] sm:w-[374px] flex flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg shadow-[#ED862E]/12 transition-shadow duration-200 hover:shadow-lg hover:shadow-black/20'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/Mobile-App/dummyshowcase.avif"
                            alt={title}
                            className='shrink-0 w-full h-[193px] sm:h-[241px] object-cover'
                            style={{ borderRadius: '21px 20px 0 0' }}
                        />
                        <div className='p-5 sm:p-6 text-left'>
                            <h3 className='font-plus-jakarta-700 text-[20px] leading-[26px] text-[#0F172A]'>
                                {title}
                            </h3>
                            <p className='font-source-sans-400 mt-2 text-[16px] leading-[22.4px] text-[#64748B]'>
                                {description}
                            </p>
                        </div>
                    </div>
                )}
            />
        </section>
    )
}

export default MobileAppShowcase
