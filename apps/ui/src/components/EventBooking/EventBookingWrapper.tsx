import EventBookingBody from '@/components/EventBooking/EventBookingBody'
import EventBookingCoreFeatures from '@/components/EventBooking/EventBookingCoreFeatures'
import EventBookingCreateEvents from '@/components/EventBooking/EventBookingCreateEvents'
import EventBookingEventType from '@/components/EventBooking/EventBookingEventType'
import EventBookingHero from '@/components/EventBooking/EventBookingHero'
import React from 'react'

const EventBookingWrapper = () => {
  return (
    <div className='flex flex-col w-full'>
      <EventBookingHero />
      <EventBookingBody />
      <EventBookingCoreFeatures />
      <EventBookingEventType />
      <EventBookingCreateEvents />

    </div>
  )
}

export default EventBookingWrapper