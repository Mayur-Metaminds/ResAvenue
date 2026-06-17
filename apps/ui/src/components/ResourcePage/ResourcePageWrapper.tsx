'use client';

import { CtaSection } from "@/components/common/CtaSection"
import { ResourcePageHeroSection } from "./ResourcePageHeroSection"

export default function ResourcePageWrapper() {
    return (
        <div className="flex min-h-screen flex-col">
            <ResourcePageHeroSection />
            <CtaSection
                title="Create unforgettable events with less effort and more impact."
                description="Get started today and transform the way you manage and sell tickets."
                primaryButtonLabel="Explore Solutions"
                secondaryButtonLabel={null}
            />
        </div>
    )
}
