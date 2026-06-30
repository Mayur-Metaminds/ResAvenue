import {
  HOTEL_WEBSITE_BUILDER_CARDS,
  HOTEL_WEBSITE_BUILDER_IMAGE,
} from "@/components/HotelWebsiteBuilder/HotelWebsiteBuilderFeaturesSection"
import { ScrollRevealShowcase } from "@/components/common/ScrollRevealShowcase"
import { SectionHeader } from "@/components/landing/SectionHeader"

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
        cards={HOTEL_WEBSITE_BUILDER_CARDS}
        image={HOTEL_WEBSITE_BUILDER_IMAGE}
        bgClassName="bg-white max-lg:pb-10"
      />
    </div>
  )
}

export default PropertyManagementBilling
