"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

import { Marquee } from "@/components/common/Marquee"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"

const PropertyManagementScalability = () => {
  const sectionRef = useRef(null)

  // Scroll-driven: section enters from bottom (start 80%) to center (start 20%)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 50%", "start 5%"],
  })

  const color1 = useTransform(scrollYProgress, [0, 0.4], ["rgba(100,116,139,0.15)", "rgba(100,116,139,1)"])
  const color2 = useTransform(scrollYProgress, [0, 0.6], ["rgba(100,116,139,0.15)", "rgba(100,116,139,1)"])
  const color3 = useTransform(scrollYProgress, [0, 0.8], ["rgba(100,116,139,0.15)", "rgba(100,116,139,1)"])
  const color4 = useTransform(scrollYProgress, [0, 1.0], ["rgba(100,116,139,0.15)", "rgba(100,116,139,1)"])

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="w-full bg-white px-3 py-[30px] pt-[60] md:px-8 lg:py-[80px] md:text-nowrap"
    >
      <SectionHeader
        eyebrow="CLOUD-NATIVE INFRASTRUCTURE"
        eyebrowClassName="lg:text-[14px]"
        eyebrowColor="#ED862E"
        className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
        titleClassName="tracking-[-1.5px]!"
        descriptionClassName="font-source-sans-400 text-center text-[18px] leading-[31.5px] text-[#64748B]"
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
            Designed for Enterprise Scalability
          </SectionHeader.Highlight>
        }
        description={
          <>
            <motion.span style={{ color: color1 }}>
              {"Scale effortlessly with a ResAvenue booking engine "}
            </motion.span>
            <motion.span style={{ color: color2 }}>
              built for real-time
            </motion.span>
            <br className="hidden md:block" />
            <motion.span style={{ color: color3 }}>
              {"sync and higher "}
            </motion.span>
            <motion.span style={{ color: color4 }}>
              direct conversions.
            </motion.span>
          </>
        }
      />

      {/* Infinite-scroll marquee — dummy logo data reused from the trusted-logos set. */}
      <div className="w-full py-[30px] lg:px-[70px]">
        <Marquee<TrustedLogo>
          items={[...trustedLogos]}
          getKey={(logo) => logo.name}
          durationSeconds={110}
          pauseOnHover={false}
          edgeFade
          gapPx={96}
          backgroundColor="#FFFFFF"
          ariaLabel="Trusted by"
          renderItem={({ name, Component }) => (
            <div
              aria-label={name}
              className="opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-17.5 [&_svg]:w-37.5 md:[&_svg]:h-20 md:[&_svg]:w-42.5"
            >
              <Component />
            </div>
          )}
        />
      </div>
    </section>
  )
}

export default PropertyManagementScalability
