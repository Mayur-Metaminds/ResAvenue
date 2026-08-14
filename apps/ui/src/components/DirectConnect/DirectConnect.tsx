import { CtaSection } from "@/components/common/CtaSection"

import { DirectConnectBookingEngineSection } from "./DirectConnectBookingEngineSection"
import { DirectConnectDashboardSection } from "./DirectConnectDashboardSection"
import { DirectConnectDeepDiveSection } from "./DirectConnectDeepDiveSection"
import { DirectConnectDeepDiveSectionTest } from "./DirectConnectDeepDiveSectionTest"
import { DirectConnectHeroSection } from "./DirectConnectHeroSection"
import { DirectConnectOperationsSection } from "./DirectConnectOperationsSection"
import { DirectConnectSolutionSection } from "./DirectConnectSolutionSection"

export default function DirectConnect() {
  return (
    <div className="flex min-h-screen flex-col">
      <DirectConnectHeroSection />
      <DirectConnectSolutionSection />
      <DirectConnectDeepDiveSection />
      <DirectConnectOperationsSection />
      <DirectConnectDashboardSection />
      <DirectConnectBookingEngineSection />
      <CtaSection primaryButtonLabel={null} showFooter />
    </div>
  )
}
