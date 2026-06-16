import { SectionHeader } from '@/components/landing/SectionHeader'
import React from 'react'

const DistributedTechnologyNetworks = () => {
    return (
        <section className="lg:px-20 lg:py-10">
            <SectionHeader
                className="mx-auto max-w-4xl"
                eyebrowClassName="typo-body2 font-normal text-[#ED862E] xl:font-bold xl:text-[12px] xl:tracking-[0.7px]"
                titleClassName="lg:text-nowrap xl:leading-[56.5px] tracking-[-1.5px]! xl:tracking-normal!"
                descriptionClassName="typo-body1 mx-auto text-[#64748B]"
                eyebrow="GLOBAL CONNECTIVITY"
                title="Connected to the world's leading travel networks."
                titleHighlight="leading travel networks."
                highlightGradient="linear-gradient(90deg, #ED862E 0%, #F59E4D 100%)"
                description="Expand your visibility across global booking ecosystems through seamless integrations with the hospitality industry's most trusted travel and distribution platforms."
            />
        </section>
    )
}

export default DistributedTechnologyNetworks
