"use client"

import ContactUsBody from "@/components/ContactUs/ContactUsBody"
import ContactUsHero from "@/components/ContactUs/ContactUsHero"
import { Footer } from "@/components/common/Footer"
import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"

function ContactUsWrapper() {
  return (
    <>
      <div className="flex flex-col bg-white pb-10">
        <ContactUsHero />
        <ContactUsBody />
        <div className="w-full lg:px-[70px]">
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
      </div>
      <Footer />
    </>
  )
}

export default ContactUsWrapper
