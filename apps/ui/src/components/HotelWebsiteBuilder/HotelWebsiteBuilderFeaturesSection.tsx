"use client"



import {
  ScrollRevealShowcase,
  type ScrollRevealCard,
} from "@/components/common/ScrollRevealShowcase"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { FeatureRevealCardIcon1, FeatureRevealCardIcon2, FeatureRevealCardIcon3, FeatureRevealCardIcon4 } from "../../../public/svg/Hotel-Website-Builder"

export const HOTEL_WEBSITE_BUILDER_IMAGE = {
  src: "/images/Hotel-Website-Builder/Hotel-Website-Builder2.png",
  alt: "Hotel Website Builder Platform",
}

export const HOTEL_WEBSITE_BUILDER_CARDS: ScrollRevealCard[] = [
  {
    position: "top-left",
    icon: <FeatureRevealCardIcon1/>,
    title: "User-Friendly, No-Code Interface",
    description:
      "Create and manage your website effortlessly with an intuitive, no-code builder — no technical expertise required.",
  },
  {
    position: "top-right",
    icon: <FeatureRevealCardIcon2/>,
    title: "Integrated Booking Engine",
    description:
      "Enable instant, commission-free bookings directly from your website with a seamless, embedded booking experience.",
  },
  {
    position: "bottom-left",
    icon: <FeatureRevealCardIcon3/>,
    title: "Content Management System (CMS)",
    description:
      "Easily update rooms, offers, images, and pages in real-time with a flexible and powerful CMS.",
  },
  {
    position: "bottom-right",
    icon: <FeatureRevealCardIcon4 className="" />,
    title: "Fast & Secure Hosting",
    description:
      "Enjoy lightning fast performance, high uptime, and enterprise grade security for a smooth guest experience.",
  },
]

export function HotelWebsiteBuilderFeaturesSection() {
  return (
    <ScrollRevealShowcase
      bgClassName="pt-[26px] pb-[50px] px-[16px] md:pt-[51px]"
      header={{
        eyebrow: "Optimized for conversions",
        eyebrowClassName: "md:mb-[32px] mb-[10px]",
        title: (
          <>
            <SectionHeader.Highlight> Everything You Need to Build,</SectionHeader.Highlight>
            <br />
            Manage,  <SectionHeader.Highlight> and Convert</SectionHeader.Highlight>
          </>
        ),
        highlightGradient: "linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 57.71%, #ED862E 68.44%)",
        description:
          "From website creation to direct bookings, manage your entire digital experience on one powerful platform.",
        titleClassName: "!mb-[20px] md:!mb-[12px] text-[28px] md:text-[40px] lg:text-[36px] xl:text-[48px] leading-tight",
        descriptionClassName: "text-[#464554]",
      }}
      cards={HOTEL_WEBSITE_BUILDER_CARDS}
      image={HOTEL_WEBSITE_BUILDER_IMAGE}
    />
  )
}
