import EventBookingBody from '@/components/EventBooking/EventBookingBody'
import EventBookingCoreFeatures from '@/components/EventBooking/EventBookingCoreFeatures'
import EventBookingHero from '@/components/EventBooking/EventBookingHero'
import React from 'react'

const EventBookingWrapper = () => {
  return (
    <div className='flex flex-col w-full'>
    <EventBookingHero/>
    <EventBookingBody/>
    <EventBookingCoreFeatures/>
    </div>
  )
}

export default EventBookingWrapper