"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"
import { cn } from "@/lib/styles"

// Dummy FAQ data.
const faqs = [
    {
        question: "How long does deployment typically take?",
        answer:
            "Deployment typically takes between 2 to 4 weeks depending on the complexity of your existing systems and the modules you choose to implement.",
    },
    {
        question: "What security standards do you maintain?",
        answer:
            "We maintain enterprise-grade security including SOC 2 Type II compliance, PCI-DSS certification for payments, and full GDPR compliance for data protection.",
    },
    {
        question: "Is there API access for custom workflows?",
        answer:
            "Yes, we provide comprehensive RESTful APIs and webhooks that allow your development team to build custom integrations and automate your unique workflows.",
    },
]

const MobileAppFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section
            data-nav-theme="light"
            className="bg-white w-full px-4 md:px-8 py-[60px] lg:py-[100px]"
        >
            <SectionHeader
                className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
                titleClassName="tracking-[-1.5px]! lg:text-[36px]! lg:leading-[40px]! lg:tracking-normal!"
                descriptionClassName="typo-body1 text-center text-[#64748B]"
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
                        Frequently Asked Questions
                    </SectionHeader.Highlight>
                }
                description="Everything you need to know about ResAvenue Mobile."
            />

            <div className="mx-auto w-full max-w-3xl space-y-4">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index

                    return (
                        <div
                            key={index}
                            className={cn(
                                "w-full overflow-hidden rounded-2xl border bg-[#F8FAFC] transition-all duration-300",
                                isOpen
                                    ? "border-[#ED862E]/30 shadow-md"
                                    : "border-gray-100 shadow-sm hover:border-gray-200"
                            )}
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="flex w-full items-center justify-between p-6 text-left outline-none focus-visible:bg-gray-50"
                                aria-expanded={isOpen}
                            >
                                <span className="text-[15px] font-bold text-[#010C28]">
                                    {faq.question}
                                </span>
                                <div
                                    className={cn(
                                        "ml-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300",
                                        isOpen ? "rotate-180 bg-[#ED862E]/10" : "bg-gray-50"
                                    )}
                                >
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 transition-colors",
                                            isOpen ? "text-[#ED862E]" : "text-gray-400"
                                        )}
                                    />
                                </div>
                            </button>

                            <div
                                className={cn(
                                    "grid transition-all duration-300 ease-in-out",
                                    isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="px-6 pb-6 text-sm leading-relaxed text-gray-500">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default MobileAppFAQ
