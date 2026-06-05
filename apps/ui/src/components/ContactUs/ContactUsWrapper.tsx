"use client"

import ContactUsBody from "@/components/ContactUs/ContactUsBody"
import ContactUsHero from "@/components/ContactUs/ContactUsHero"
import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"

function ContactUsWrapper() {
  return (
    <div className="flex min-h-screen flex-col bg-white pb-10">
      <ContactUsHero />
      <ContactUsBody />
      <div className="w-full py-[30px] lg:px-[70px]">
        <Marquee<TrustedLogo>
          items={[...trustedLogos]}
          getKey={(logo) => logo.name}
          durationSeconds={30}
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
    </div>
  )
}

export default ContactUsWrapper
