import { ChannelConnectDashboardSection } from "./ChannelConnectDashboardSection"
import { ChannelConnectEngineeredSection } from "./ChannelConnectEngineeredSection"
import { ChannelConnectHeroSection } from "./ChannelConnectHeroSection"
import { ChannelConnectOmnichannelSection } from "./ChannelConnectOmnichannelSection"
import { ChannelConnectMobileAppSection } from "./ChannelConnectMobileAppSection"
import { ChannelConnectPortfolioSection } from "./ChannelConnectPortfolioSection"
import { ChannelConnectCentralizeSection } from "./ChannelConnectCentralizeSection"
import { CtaSection } from "../common/CtaSection"

export default function ChannelConnect() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ChannelConnectHeroSection />
      <ChannelConnectOmnichannelSection />
      <ChannelConnectEngineeredSection />
      <ChannelConnectDashboardSection />
      <ChannelConnectPortfolioSection />
      <ChannelConnectMobileAppSection />
      {/* <ChannelConnectCentralizeSection /> */}
      <CtaSection primaryButtonLabel={null} showFooter />
    </main>
  )
}
