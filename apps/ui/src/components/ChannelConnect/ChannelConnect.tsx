import { ChannelConnectDashboardSection } from "./ChannelConnectDashboardSection"
import { ChannelConnectEngineeredSection } from "./ChannelConnectEngineeredSection"
import { ChannelConnectHeroSection } from "./ChannelConnectHeroSection"
import { ChannelConnectOmnichannelSection } from "./ChannelConnectOmnichannelSection"

export default function ChannelConnect() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <ChannelConnectHeroSection />
      <ChannelConnectOmnichannelSection />
      <ChannelConnectEngineeredSection />
      <ChannelConnectDashboardSection />
    </main>
  )
}
