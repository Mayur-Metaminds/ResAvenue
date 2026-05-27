import type React from "react"

import OfficeLocations from "@/components/ContactUs/ContactHeroLocations"
import ContactForm from "@/components/ContactUs/ContactUsForm"
import { HeroContent } from "@/components/landing/HeroContent"
import { HeroTitle } from "@/components/landing/HeroTitle"

{
  /* <HeroContent */
}
//   eyebrow="INTUITIVE EXPERIENCE. FAST FLEXIBILITY."
//   title={
// <HeroTitle
//   style={
// {
//   "--hero-title-color": "#FFFFFF",
//Updated to match Figma specs exactly
//   "--hero-title-gradient": "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
// } as React.CSSProperties
//   }
// >
{
  /* Master Your */
}
{
  /* <br /> */
}
{
  /* <HeroTitle.Highlight>Global Distribution</HeroTitle.Highlight> */
}
{
  /* </HeroTitle> */
}
//   }
//   description={
// <span className="typo-body1 text-white/55">
{
  /* Control Every Channel. Maximize Every Booking. Simplify hotel distribution with a centralized channel management solution built for speed, accuracy, and scale. Connects to 100+ channels directly worldwide. Instantly update rates and inventory across OTAs, GDS, and metasearch platforms while optimizing performance with real-time insights. */
}
{
  /* </span> */
}
//   }
//   actions={[
// <Button
//   key="demo"
//   variant="primary"
//   size="default"
//   icon={<ArrowRight className="h-4 w-4" />}
//   className="gap-[7.6px] pt-[8.5px] pr-[10.5px] pb-[8.5px] pl-[9.5px] lg:pt-[14px] lg:pr-[39.16px] lg:pb-[16px] lg:pl-[28px]"
// >
{
  /* Start Your Journey */
}
{
  /* </Button>, */
}
//   ]}
// />

function ContactUsHero() {
  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/Contact-Us/contactUsBg.png')" }}
    >
      <div className="relative z-10 flex w-full flex-1 flex-col px-[15px] pt-[106px] lg:px-20">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-between gap-12 pb-12 lg:flex-row lg:justify-evenly lg:gap-15 lg:pb-0">
          {/* Left Column: Content */}
          <div className="my-auto flex w-full flex-col justify-center lg:w-[50%] lg:py-20 xl:w-[45%]">
            <HeroContent
              eyebrow="CONNECTED SUPPORT. REAL-TIME RESPONSE"
              eyebrowColor="#ED862E"
              title={
                <HeroTitle
                  style={
                    {
                      "--hero-title-color": "#FFFFFF",
                      // Updated to match Figma specs exactly
                      "--hero-title-gradient":
                        "linear-gradient(90deg, #F27F0D 0%, #FDBA74 100%)",
                    } as React.CSSProperties
                  }
                >
                  Get In Touch
                  <br />
                  <HeroTitle.Highlight>With Our Team</HeroTitle.Highlight>
                </HeroTitle>
              }
              description={
                <span className="typo-body1 text-white/55">
                  We’re here to help you streamline operations and maximize
                  global distribution. Our team delivers solutions that simplify
                  workflows, improve efficiency, and drive results.
                </span>
              }
            />
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: "var(--eyebrow-dot-color, #ED862E)",
                }}
              />
              <span className="font-plus-jakarta-700 text-[12px] leading-[19px] tracking-[0.7px] text-[#ED862E] uppercase">
                CONNECTED SUPPORT. REAL
              </span>
              <span className="h-[1px] flex-1 bg-[#FFFFFF66]" />
            </div>
            <OfficeLocations />
          </div>
          <div className="flex-1 self-start lg:pt-15">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUsHero
