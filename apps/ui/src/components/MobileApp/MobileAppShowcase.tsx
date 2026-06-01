import React from 'react'

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

const MobileAppShowcase = () => {
    return (
        <section
            data-nav-theme="light"
            className='bg-white w-full px-[16px] sm:px-[80px] py-[34px] sm:py-[40px]'
        >
            <div className='flex gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
                {showcaseCards.map(({ title, description }) => (
                    <div
                        key={title}
                        className='shrink-0 w-[300px] h-[362px] sm:w-[374px] sm:h-[427px] flex flex-col overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm'
                    >
                        {/* Dummy image placeholder */}
                        <div
                            className='shrink-0 w-full h-[193px] sm:h-[241px] bg-slate-200'
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
                ))}
            </div>
        </section>
    )
}

export default MobileAppShowcase
