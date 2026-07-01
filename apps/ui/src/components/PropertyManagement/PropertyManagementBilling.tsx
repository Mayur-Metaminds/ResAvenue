import {
  HOTEL_WEBSITE_BUILDER_IMAGE,
} from "@/components/HotelWebsiteBuilder/HotelWebsiteBuilderFeaturesSection"
import { ScrollRevealCard, ScrollRevealShowcase } from "@/components/common/ScrollRevealShowcase"
import { SectionHeader } from "@/components/landing/SectionHeader"
import { InvoiceGeneration, TimeBasedLinks, PaymentMethods } from "../../../public/svg/Property-Management"

export const HOTEL_WEBSITE_BUILDER_CARDS: ScrollRevealCard[] = [
  {
    position: "top-left",
    icon: <InvoiceGeneration />,
    title: "Automatic invoice generation",
    description:
      "Easily create invoices automatically, ensuring you stay organized and on top of your finances.",
  },
  {
    position: "top-right",
    icon: <TimeBasedLinks />,
    title: "Time-Based Payment Links ",
    description:
      "Stay informed with timely alerts, ensuring you never miss a payment deadline.",
  },
  {
    position: "bottom-right",
    icon: <PaymentMethods />,
    title: "Multiple payment methods",
    description:
      "Multiple payment options ensure seamless transactions for every guest.",
  }
]

const PropertyManagementBilling = () => {
  return (
    // Header lives INSIDE the showcase (like the Hotel section) so it fills the
    // centered sticky frame instead of leaving a half-viewport gap above the cards.
    // TODO: swap in billing-specific cards/image — reusing the Hotel Website
    // Builder content as a placeholder for now.
    <div data-nav-theme="light">
      <ScrollRevealShowcase
        header={{
          eyebrow: "GET PAID FASTER, WITHOUT THE HASSLE",
          eyebrowColor: "#ED862E",
          className: "mx-auto max-w-3xl text-center",
          descriptionClassName: "typo-body1 text-center text-[#64748B]",
          title: (
            <SectionHeader.Highlight
              style={{
                background:
                  "var(--cta-gradient, linear-gradient(85deg, #010E38 -6.88%, #1A2F6D 34.36%, #ED862E 100%))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Billing & Payments
            </SectionHeader.Highlight>
          ),
          description:
            "Simplify billing with automated invoices and secure payment processing. Ensure every transaction is accurate, transparent, and completed without delays.",
        }}
        bgClassName="py-[34px] px-4 lg:px-8 lg:py-15"
        cards={HOTEL_WEBSITE_BUILDER_CARDS}
        image={HOTEL_WEBSITE_BUILDER_IMAGE}
        featureTitleClassName="max-[1025px]:text-[18px] max-[1025px]:leading-6"
        cardsWrapperClassName="gap-4 lg:gap-5 max-w-none"
        mobileIconWrapperClassName="[&>svg]:w-12.5 [&>svg]:h-12.5"
        cardClassName="w-full flex-row items-start max-[1025px]:gap-3 gap-4 rounded-[20px] border border-[#F5E1CE] bg-white p-3 lg:p-4 xl:p-5 shadow-[0_1px_2px_0_rgba(16,24,40,0.04)]"
        iconWrapperClassName="shrink-0 items-center justify-center rounded-[16px] w-14 h-14"
      />
    </div>
  )
}

export default PropertyManagementBilling