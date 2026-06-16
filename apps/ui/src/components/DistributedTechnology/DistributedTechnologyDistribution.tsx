import { SectionHeader } from '@/components/landing/SectionHeader'
import { CircleCheck } from 'lucide-react'
import React from 'react'

const features = [
    "Centralized rates and availability management",
    "Instant updates to over 100+ global channels",
    "Integrated revenue analytics and performance tracking",
]

const DistributedTechnologyDistribution = () => {
    return (
        <section className="lg:px-20 lg:py-10">
            <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
                {/* Left — content */}
                <div className="w-full lg:w-1/2">
                    <SectionHeader
                        className="mb-[32px] max-w-3xl items-start text-left lg:mb-[40px]"
                        eyebrowClassName="typo-body2 font-normal text-[#ED862E] xl:font-bold xl:text-[12px] xl:tracking-[0.7px]"
                        titleClassName="xl:leading-[56.5px] tracking-[-1.5px]! xl:tracking-normal!"
                        descriptionClassName="typo-body1 text-left text-[#64748B]"
                        eyebrow="THE POWER BEHIND"
                        title={
                            <SectionHeader.Highlight
                                style={{
                                    background:
                                        "linear-gradient(86deg, #010E38 -2.62%, #1A2F6D 54.67%, #ED862E 76.16%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Smarter Hotel Distribution
                            </SectionHeader.Highlight>
                        }
                        description="Managing fragmented inventory across dozens of platforms is the
primary cause of revenue leakage. ResAvenue unifies your presence,
ensuring rate parity and maximum occupancy through intelligent
automation."
                    />

                    <ul className="flex flex-col gap-[18px]">
                        {features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                                <CircleCheck className="h-5 w-5 shrink-0 text-[#ED862E]" strokeWidth={1.75} />
                                <span className="typo-body4" style={{ color: "rgba(30, 42, 63, 0.90)" }}>
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right — bento dashboard mockup */}
                <div className="w-full lg:w-1/2">
                    <div className="group relative overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.15)] lg:p-8">
                        {/* Top bar */}
                        <div className="mb-5 flex items-center justify-between">
                            <div className="h-[28px] w-[140px] rounded-full bg-[#F1F5F9]" />
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#FBCFE8]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#FEF08A]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#BBF7D0]" />
                            </div>
                        </div>

                        {/* Search / input bar */}
                        <div className="mb-4 h-[44px] w-full rounded-[12px] border border-gray-100 bg-white shadow-sm" />

                        {/* Row of 3 cards */}
                        <div className="mb-4 grid grid-cols-3 gap-4">
                            <div className="flex h-[90px] flex-col justify-center gap-2 rounded-[14px] bg-[#FFF4EA] px-4">
                                <span className="h-2.5 w-10 rounded-full bg-[#F9C99A]" />
                                <span className="h-2.5 w-7 rounded-full bg-[#F9C99A]" />
                            </div>
                            <div className="h-[90px] rounded-[14px] bg-[#F8FAFC]" />
                            <div className="h-[90px] rounded-[14px] bg-[#F8FAFC]" />
                        </div>

                        {/* Bar chart */}
                        <div className="flex h-[110px] items-end justify-between gap-3 rounded-[14px] bg-[#F8FAFC] p-4">
                            {[
                                { h: "40%", c: "#FCE3CC" },
                                { h: "62%", c: "#FBD0A8" },
                                { h: "100%", c: "#F9B477" },
                                { h: "34%", c: "#FCE3CC" },
                                { h: "82%", c: "#F59E4D" },
                            ].map((bar, i) => (
                                <div
                                    key={i}
                                    className="w-full rounded-[8px]"
                                    style={{ height: bar.h, backgroundColor: bar.c }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DistributedTechnologyDistribution
