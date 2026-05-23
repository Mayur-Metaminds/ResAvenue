"use client"

import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/styles"

import { HeroTitle } from "./HeroTitle"

const faqs = [
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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      data-nav-theme="light"
      className="w-full bg-[#F8FAFC] px-4 py-24 md:px-8"
    >
      <div className="container mx-auto flex max-w-3xl flex-col items-center">
        {/* Header */}
        <div className="mb-12 w-full text-center">
          <HeroTitle
            className="mb-4"
            style={
              {
                "--hero-title-color": "#010C28",
                letterSpacing: "-0.5px",
              } as React.CSSProperties
            }
          >
            Frequently Asked{" "}
            <HeroTitle.Highlight
              style={
                {
                  "--hero-title-gradient":
                    "linear-gradient(90deg, #ED862E 0%, #D97726 100%)",
                } as React.CSSProperties
              }
            >
              Questions
            </HeroTitle.Highlight>
          </HeroTitle>
          <a
            href="#"
            className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors hover:text-[#ED862E] hover:decoration-[#ED862E]"
          >
            Everything you need to know about ResAvenue
          </a>
        </div>

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
      </div>
    </section>
  )
}
