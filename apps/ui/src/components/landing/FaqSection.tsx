"use client"

import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/styles"

import { SectionHeader } from "./SectionHeader"

export type FaqItem = {
  question: string
  answer: string
}

const defaultFaqs: FaqItem[] = [
  {
    question: "How long does deployment typically take?",
    answer:
      "Deployment typically takes between 2 to 4 weeks depending on the complexity of your existing systems and the modules you choose to implement. Our dedicated onboarding team will guide you through the entire process.",
  },
  {
    question: "What security standards and certifications do you maintain?",
    answer:
      "We maintain enterprise-grade security including SOC 2 Type II compliance, PCI-DSS certification for payments, and full GDPR compliance for data protection.",
  },
  {
    question: "Which third-party systems can you integrate with?",
    answer:
      "Our platform features a robust API and pre-built integrations with over 100+ major OTAs, popular PMS systems, accounting software, and payment gateways.",
  },
  {
    question: "Is there API access for custom workflows?",
    answer:
      "Yes, we provide comprehensive RESTful APIs and webhooks that allow your development team to build custom integrations and automate your unique workflows.",
  },
  {
    question: "Where is customer data stored and processed?",
    answer:
      "Customer data is stored securely in top-tier regional cloud data centers with strict geographic isolation to comply with local data sovereignty and privacy laws.",
  },
  {
    question: "What kind of support and SLA do you provide?",
    answer:
      "We offer 24/7 priority support for critical issues, a dedicated account manager for enterprise clients, and an industry-leading 99.9% uptime SLA.",
  },
]

type FaqSectionProps = {
  /** FAQ items to render. Defaults to the standard ResAvenue set. */
  faqs?: FaqItem[]
  /** Sub-heading under the title. */
  description?: string
  /** Which item starts open. Default 0 (first open); pass null for all closed. */
  defaultOpenIndex?: number | null
}

export function FaqSection({
  faqs = defaultFaqs,
  description = "Everything you need to know about ResAvenue",
  defaultOpenIndex = 0,
}: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#F8FAFC] px-4 py-[54px] lg:py-[120px] md:px-8"
    >
      <div className="container mx-auto flex max-w-3xl flex-col items-center">
        {/* Header */}
        <SectionHeader
          className="mb-12"
          title={
            <SectionHeader.Highlight
              style={
                {
                  "--hero-title-gradient":
                    "linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%)",
                } as React.CSSProperties
              }
            >
              Frequently Asked Questions
            </SectionHeader.Highlight>
          }
          titleClassName="!font-semibold !leading-[32px] lg:!leading-[48px]"
          description={description}
          descriptionClassName="typo-body1 text-[#45556C]"
        />

        {/* FAQ Accordion */}
        <div className="w-full space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={cn(
                  "w-full overflow-hidden rounded-2xl border bg-white transition-all duration-300",
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
                  <span className="typo-body3 text-[#0F172B]">
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
                    <p className="px-6 pb-6 typo-body4 text-gray-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
