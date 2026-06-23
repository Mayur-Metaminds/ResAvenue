import React from "react"

import { LazyLottie } from "@/components/common/LazyLottie"
import { SectionHeader } from "@/components/landing/SectionHeader"

const EventBookingBody = () => {
  return (
    <section data-nav-theme="light" className="w-full bg-[#F4F6F9] px-2 py-[60px] md:px-8 lg:pt-[80px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          className="mx-auto mb-10  text-center lg:mb-15"
          eyebrowClassName="typo-body2 font-normal text-[#ED862E] xl:font-bold xl:text-[12px] xl:tracking-[0.7px]"
          titleClassName="xl:leading-[56.5px] xl:tracking-normal"
          descriptionClassName="typo-body1 text-center text-[#64748B]"
          eyebrow="UNIFIED EVENT MANAGEMENT"
          title={
            <SectionHeader.Highlight
              style={{
                background:
                  "var(--cta-gradient, linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              Events run on disconnected systems.
              <br />
              Yours doesn&apos;t have to.
            </SectionHeader.Highlight>
          }
          description="Managing ticketing, marketing, operations, and revenue across disconnected systems leads to lost data, overselling, and poor attendee experiences. ResAvenue unifies everything."
        />

        <LazyLottie
          src="/assets/landing/event_and_ticketing_outer.json"
          priority="lazy"
          loop
          className="mx-auto mt-3 h-75 w-full max-w-2xl"
          aria-label="Event management animation"
        />
      </div>
    </section>
  )
}

export default EventBookingBody
