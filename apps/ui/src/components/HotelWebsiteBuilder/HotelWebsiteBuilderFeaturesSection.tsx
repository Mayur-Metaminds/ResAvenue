"use client"

import { Blocks, Database, Lock, Zap } from "lucide-react"

import {
  ScrollRevealShowcase,
  type ScrollRevealCard,
} from "@/components/common/ScrollRevealShowcase"

export const HOTEL_WEBSITE_BUILDER_IMAGE = {
  src: "/images/Hotel-Website-Builder/Hotel-Website-Builder2.png",
  alt: "Hotel Website Builder Platform",
}

export const HOTEL_WEBSITE_BUILDER_CARDS: ScrollRevealCard[] = [
  {
    position: "top-left",
    icon: <Blocks className="h-6 w-6" />,
    title: "User-Friendly, No-Code Interface",
    description:
      "Create and manage your website effortlessly with an intuitive, no-code builder — no technical expertise required.",
  },
  {
    position: "top-right",
    icon: <Zap className="h-6 w-6" />,
    title: "Integrated Booking Engine",
    description:
      "Enable instant, commission-free bookings directly from your website with a seamless, embedded booking experience.",
  },
  {
    position: "bottom-left",
    icon: <Database className="h-6 w-6" />,
    title: "Content Management System (CMS)",
    description:
      "Easily update rooms, offers, images, and pages in real-time with a flexible and powerful CMS.",
  },
  {
    position: "bottom-right",
    icon: <Lock className="h-6 w-6" />,
    title: "Fast & Secure Hosting",
    description:
      "Enjoy lightning fast performance, high uptime, and enterprise grade security for a smooth guest experience.",
  },
]

export function HotelWebsiteBuilderFeaturesSection() {
  return (
    <ScrollRevealShowcase
    bgClassName="pt-[51px]"
      header={{
        eyebrow: "Optimized for conversions",
        eyebrowClassName:"mb-[32px]",
        title: "Everything You Need to Build,\nManage, and Convert",
        titleHighlight: "Build,\nManage, and Convert",
        highlightGradient:
          "linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 57.71%, #ED862E 68.44%)",
        description:
          "From website creation to direct bookings, manage your entire digital experience on one powerful platform.",
        titleClassName: "!mb-2 md:!mb-[12px] text-[28px] md:text-[40px] lg:text-[48px] leading-tight",
        descriptionClassName: "text-sm md:text-lg",
      }}
      cards={HOTEL_WEBSITE_BUILDER_CARDS}
      image={HOTEL_WEBSITE_BUILDER_IMAGE}
    />
  )
}
