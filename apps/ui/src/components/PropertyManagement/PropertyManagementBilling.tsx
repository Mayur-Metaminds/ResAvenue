import { SectionHeader } from "@/components/landing/SectionHeader"

const PropertyManagementBilling = () => {
  return (
    <section
      data-nav-theme="light"
      className="w-full bg-white px-4 py-[60px] md:px-8 lg:py-[100px]"
    >
      <SectionHeader
        eyebrow="GET PAID FASTER, WITHOUT THE HASSLE"
        eyebrowColor="#ED862E"
        className="mx-auto max-w-3xl text-center"
        descriptionClassName="typo-body1 text-center text-[#64748B]"
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
            Billing & Payments
          </SectionHeader.Highlight>
        }
        description="Simplify billing with automated invoices and secure payment processing. Ensure every transaction is accurate, transparent, and completed without delays."
      />
    </section>
  )
}

export default PropertyManagementBilling
