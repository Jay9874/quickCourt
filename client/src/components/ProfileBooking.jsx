import React, { useState } from 'react'
import useBookingStore from '../store/bookingStore'

export default function ProfileBooking () {
  const [activeTab, setActiveTab] = useState('Confirmed')
  const { bookings } = useBookingStore()

  // Placeholder functions for event handlers
  const handleCancelBooking = id => {
    console.log('Cancel booking with ID:', id)
  }

  const handleWriteReview = id => {
    console.log('Write a review for booking with ID:', id)
  }

  return (
    <div className='min-h-screen flex-1 rounded-md border border-gray-400 p-8 shadow-lg'>
      <div className='inline-flex border border-gray-400 rounded-full p-1'>
        <button
          onClick={() => setActiveTab('Confirmed')}
          className={`px-4 py-2 rounded-full transition duration-300 ${
            activeTab === 'Confirmed'
              ? 'bg-green-950 text-white font-semibold'
              : ''
          }`}
        >
          All Bookings
        </button>
        <button
          onClick={() => setActiveTab('Cancelled')}
          className={`px-4 py-2 rounded-full transition duration-300 ${
            activeTab === 'Cancelled'
              ? 'bg-green-950 text-white font-semibold'
              : ''
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* Container for Confirmed and other non-cancelled bookings */}
      <div className='mt-4 mb-8'>
        {bookings
          .filter(b => b.status === activeTab)
          .map(booking => (
            <div
              key={booking._id}
              className='rounded-xl p-5 mb-4 border border-[#444] shadow-lg'
            >
              <div className='font-semibold text-lg mb-1'>
                {booking.venue.name}
              </div>
              <div className='flex gap-5 text-sm mb-0.5'>
                <span>
                  <span role='img' aria-label='date'>
                    📅
                  </span>{' '}
                  {booking.date}
                </span>
                <span>
                  <span role='img' aria-label='time'>
                    Starting at:
                  </span>{' '}
                  {booking.startTime}
                </span>
                <span>
                  <span role='img' aria-label='time'>
                    Duration:
                  </span>{' '}
                  {booking.duration}
                </span>
              </div>
              <div className='text-sm mb-0.5'>
                <span role='img' aria-label='location'>
                  📍
                </span>{' '}
                {booking.address}
              </div>
              <div className='text-sm mb-0.5'>
                Status:{' '}
                <span className='text-[#0f3] font-semibold ml-1'>
                  <span role='img' aria-label='status'>
                    ✅
                  </span>{' '}
                  {booking.status}
                </span>
              </div>
              <div className='mt-2 flex gap-3 flex-wrap'>
                {booking.status === 'Confirmed' && booking.canCancel && (
                  <button
                    className='text-[#f33] bg-transparent border-none font-mono text-sm'
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    [Cancel Booking]
                  </button>
                )}
                {booking.status === 'Confirmed' && (
                  <button
                    className='text-[#0f3] bg-transparent border-none font-mono text-sm'
                    onClick={() => handleWriteReview(booking._id)}
                  >
                    [Write Review]
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Container for Cancelled bookings */}
      {/* <div>
        <h3 className='text-2xl font-bold mb-4'>Cancelled Bookings</h3>
        {bookings
          .filter(b => b.status === 'Cancelled')
          .map(booking => (
            <div
              key={booking._id}
              className='rounded-xl p-5 mb-4 border border-[#333]'
            >
              <div className='font-semibold text-lg mb-1'>
                {booking.venueName} ({booking.sport})
              </div>
              <div className='flex gap-5 text-sm mb-0.5'>
                <span>
                  <span role='img' aria-label='date'>
                    📅
                  </span>{' '}
                  {booking.date}
                </span>
                <span>
                  <span role='img' aria-label='time'>
                    ⏰
                  </span>{' '}
                  {booking.startTime} - {booking.endTime}
                </span>
              </div>
              <div className='text-sm mb-0.5'>
                <span role='img' aria-label='location'>
                  📍
                </span>{' '}
                {booking.location}
              </div>
              <div className='text-sm mb-0.5'>
                Status:{' '}
                <span className='text-[#f33] font-semibold'>
                  <span role='img' aria-label='status'>
                    ❌
                  </span>{' '}
                  {booking.status}
                </span>
              </div>
            </div>
          ))}
      </div> */}
    </div>
  )
}
