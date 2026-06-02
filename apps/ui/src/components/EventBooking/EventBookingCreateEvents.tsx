import React from "react"

const EventBookingCreateEvents = () => {
    return (
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4 bg-[url('/images/demo-section-bg-img.png')] bg-cover bg-center bg-no-repeat px-4">
            <h2 className="typo-h1 max-w-3xl text-center text-white xl:text-[46px] xl:leading-[51.52px] xl:tracking-[-0.5px]">
                Create unforgettable events with less effort and more impact.
            </h2>
            <p className="typo-body1 max-w-2xl text-center text-white/50 xl:leading-[30.6px]">
                Get started today and transform the way you manage and sell tickets.
            </p>
            <button
                type="button"
                className="font-plus-jakarta-500 mt-6 flex  items-center justify-center rounded-[50px] border border-white/15 bg-white/[0.08] pt-[12px] pr-[27.805px] pb-[13px] pl-[29px] text-center text-[15px] font-semibold leading-6 text-white backdrop-blur-sm xl:h-[54px] xl:w-[183.8px] xl:pt-[17px] xl:pr-[28.605px] xl:pb-[18px] xl:pl-[29px] text-nowrap"
            >
                Explore Solutions
            </button>
        </div>
    )
}

export default EventBookingCreateEvents
