'use client';

import { CtaSection } from "@/components/common/CtaSection"
import { DistributedTechnologyHeroSection } from "./DistributedTechnologyHeroSection"
import { Marquee } from "@/components/common/Marquee"
import { trustedLogos, type TrustedLogo } from "@/types/trustedLogos"
import DistributedTechnologyDistribution from "@/components/DistributedTechnology/DistributedTechnologyDistribution";
import DistributedTechnologyNetworks from "@/components/DistributedTechnology/DistributedTechnologyNetworks";
export default function DistributedTechnologyWrapper() {
    return (
        <div className="flex min-h-screen flex-col">
            <DistributedTechnologyHeroSection />

            <div className="w-full py-[30px] lg:px-[70px]">
                <Marquee<TrustedLogo>
                    items={[...trustedLogos]}
                    getKey={(logo) => logo.name}
                    durationSeconds={60}
                    pauseOnHover={false}
                    edgeFade
                    gapPx={96}
                    backgroundColor="#FFFFFF"
                    ariaLabel="Trusted by"
                    renderItem={({ name, Component }) => (
                        <div
                            aria-label={name}
                            className="opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-17.5 [&_svg]:w-37.5 md:[&_svg]:h-20 md:[&_svg]:w-42.5"
                        >
                            <Component />
                        </div>
                    )}
                />
            </div>
            <DistributedTechnologyDistribution />
            <DistributedTechnologyNetworks />
            <CtaSection primaryButtonLabel={null}
                showFooter
                title="Connect Your Property to the Global Travel Ecosystem"
                description="Join thousands of hotels that have increased their revenue and simplified their distribution
workflows with ResAvenue's enterprise-grade platform." />
        </div>
    )
}
