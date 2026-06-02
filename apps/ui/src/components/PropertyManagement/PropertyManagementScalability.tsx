"use client"

import { Marquee } from "@/components/common/Marquee"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"

const PropertyManagementScalability = () => {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]"
    >
      <SectionHeader
        eyebrow="CLOUD-NATIVE INFRASTRUCTURE"
        eyebrowColor="#ED862E"
        className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
        descriptionClassName="font-source-sans-400 text-center text-[16px] leading-[31.5px] text-[#64748B]"
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
            Scale effortlessly with a ResAvenue booking engine{" "}
            <span style={{ color: "rgba(100, 116, 139, 0.60)" }}>
              built for real-time{" "}
            </span>
            <span style={{ color: "rgba(100, 116, 139, 0.30)" }}>
              sync and higher{" "}
            </span>
            <span style={{ color: "rgba(100, 116, 139, 0.15)" }}>
              direct conversions.
            </span>
          </>
        }
      />

      {/* Infinite-scroll marquee — dummy logo data reused from the trusted-logos set. */}
      <div className="w-full py-[30px] lg:px-[70px]">
        <Marquee<TrustedLogo>
          items={[...trustedLogos]}
          getKey={(logo) => logo.name}
          durationSeconds={35}
          pauseOnHover={false}
          edgeFade
          gapPx={96}
          backgroundColor="#FFFFFF"
          ariaLabel="Trusted by"
          renderItem={({ name, Component }) => (
            <div
              aria-label={name}
              className="opacity-80 transition-opacity hover:opacity-100"
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
