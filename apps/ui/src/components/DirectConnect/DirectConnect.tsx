import { ComingSoonPage } from "@/components/common/ComingSoonPage"
import { CtaSection } from "@/components/common/CtaSection"

export default function DirectConnect() {
  return (
    <div className="flex min-h-screen flex-col">
      <ComingSoonPage />
      {/* <DirectConnectHeroSection />
      <DirectConnectSolutionSection />
      <DirectConnectDeepDiveSection />
      <DirectConnectOperationsSection />
      <DirectConnectDashboardSection />
      <DirectConnectBookingEngineSection /> */}
      <CtaSection primaryButtonLabel={null} showFooter />
    </div>
  )
}
