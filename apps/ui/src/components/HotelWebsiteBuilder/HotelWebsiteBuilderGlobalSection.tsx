"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FeatureShowcase } from "@/components/common/FeatureShowcase"
import { CheckedIcon } from "../../../public/svg/commonSvg"

const slideInFromLeft = (i: number) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.12 },
})

function CheckedRow({ text }: { text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-[16px]">
      <CheckedIcon className="h-[20px] w-[20px] shrink-0" />
      <p className="font-source-sans-400 text-[16px] leading-[24px] text-white/80">
        {text}
      </p>
    </div>
  )
}

export function HotelWebsiteBuilderGlobalSection() {
  return (
    <section className="relative w-full bg-[#0B1527]">
      <div className="relative p-[20px] md:p-16 lg:px-24 lg:pt-24 lg:pb-32 max-w-[1440px] mx-auto">
        <div className="relative z-10">
          <FeatureShowcase
            imagePosition="left"
            header={{
              className: "mb-[24px]",
              eyebrowDotColor: "#FFF",
              eyebrowClassName: "mb-0",
              titleClassName: "mb-0",
              eyebrow: "MULTI-LANGUAGE / MULTI-CURRENCY",
              eyebrowColor: "#FFF",
              title: "Go Global with Ease",
              titleHighlight: "with Ease",
              highlightGradient: "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
              titleColor: "#F5F4F0",
              description: (
                <span className="font-source-sans-400 text-[16px] leading-[26px] text-[#94A3B8]">
                  Offer localized experiences with multi-language and multi-currency support for international guests.
                </span>
              ),
            }}
            imageSlot={
              <div className="hidden lg:flex justify-center w-full lg:justify-end pr-8">
                <div className="relative flex aspect-[4/3] w-full max-w-[600px] items-center justify-center overflow-hidden rounded-[24px] border border-slate-700 bg-slate-800 shadow-2xl">
                  <Image
                    src="/images/Hotel-Website-Builder/Hotel-Website-Builder6.png" // Placeholder
                    alt="Multi Language Multi Currency"
                    fill
                    className="object-cover opacity-90"
                  />
                </div>
              </div>
            }
          >
            {/* Mobile Image Slot */}
            <div className="flex lg:hidden justify-center w-full mb-8 mt-4">
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[24px] border border-slate-700 bg-slate-800 shadow-2xl">
                <Image
                  src="/images/Landing/Direct-Connect-Preview.png" // Placeholder
                  alt="Multi Language Multi Currency"
                  fill
                  className="object-cover opacity-90"
                />
              </div>
            </div>

            {/* List of features */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-10">
              <motion.div {...slideInFromLeft(0)}>
                <CheckedRow 
                  text={
                    <>
                      <span className="font-semibold text-white">Global Guests</span> - Welcome guests from around the world
                    </>
                  } 
                />
              </motion.div>
              <motion.div {...slideInFromLeft(1)}>
                <CheckedRow 
                  text={
                    <>
                      <span className="font-semibold text-white">Multi-Currency</span> - Show prices in your guest&apos;s currency
                    </>
                  } 
                />
              </motion.div>
              <motion.div {...slideInFromLeft(2)}>
                <CheckedRow 
                  text={
                    <>
                      <span className="font-semibold text-white">Multi-Language</span> - Speak your guest&apos;s language
                    </>
                  } 
                />
              </motion.div>
            </div>

          </FeatureShowcase>
        </div>
      </div>
    </section>
  )
}
