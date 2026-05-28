import { LayoutGrid } from "lucide-react"
import React from "react"

import { SectionHeader } from "@/components/landing/SectionHeader"

const EventBookingBody = () => {
  return (
    <section className="w-full bg-[#F4F6F9] px-4 py-[60px] md:px-8 lg:py-[100px]">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-15"
          eyebrowClassName="typo-body2 font-normal text-[#ED862E] xl:font-bold xl:text-[12px] xl:tracking-[0.7px]"
          titleClassName="xl:leading-[56.5px] xl:tracking-normal"
          descriptionClassName="typo-body1 text-center text-[#64748B]"
          eyebrow="UNIFIED EVENT MANAGEMENT"
          title={
            <>
              Events run on disconnected systems.
              <br />
              <SectionHeader.Highlight
                style={{
                  background:
                    "linear-gradient(86deg, #010E38 -2.62%, #1A2F6D 54.67%, #ED862E 76.16%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Yours doesn&apos;t have to.
              </SectionHeader.Highlight>
            </>
          }
          description="Managing ticketing, marketing, operations, and revenue across disconnected systems leads to lost data, overselling, and poor attendee experiences. ResAvenue unifies everything."
        />

        
      </div>
    </section>
  )
}

export default EventBookingBody
