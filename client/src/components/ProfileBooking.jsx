import React from 'react'

export default function ProfileBooking () {
  const bookings = [
    {
      _id: '1',
      venueName: 'SBR Badminton',
      sport: 'Badminton',
      date: '2025-05-06',
      startTime: '01:00 PM',
      endTime: '02:00 PM',
      location: 'Satellite, Jodhpur Village',
      status: 'Confirmed',
      canCancel: true
    },
    {
      _id: '2',
      venueName: 'Khel Gaon',
      sport: 'Tennis',
      date: '2025-05-07',
      startTime: '05:00 PM',
      endTime: '06:00 PM',
      location: 'Navrangpura, Ahmedabad',
      status: 'Confirmed',
      canCancel: false
    },
    {
      _id: '3',
      venueName: 'SGVP Cricket Ground',
      sport: 'Cricket',
      date: '2025-05-05',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      location: 'SGVP Road, Ahmedabad',
      status: 'Cancelled'
    }
  ]

  // Placeholder functions for event handlers
  const handleCancelBooking = id => {
    console.log('Cancel booking with ID:', id)
  }

  const handleWriteReview = id => {
    console.log('Write a review for booking with ID:', id)
  }

  return (
    <div className='min-h-screen border border-gray-400 p-8 text-white font-sans'>
      <h2 className='text-3xl font-bold mb-6'>My Bookings</h2>

      {/* Container for Confirmed and other non-cancelled bookings */}
      <div className='bg-[#111] rounded-2xl border border-[#333] p-5 mb-8'>
        {bookings
          .filter(b => b.status !== 'Cancelled')
          .map(booking => (
            <div
              key={booking._id}
              className='bg-[#181818] rounded-xl p-5 mb-4 border border-[#444] shadow-lg'
            >
              <div className='font-semibold text-lg mb-1'>
                <span role='img' aria-label='court'>
                  🎾
                </span>{' '}
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
                    className='text-[#f33] bg-transparent border-none cursor-pointer font-mono text-sm'
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    [Cancel Booking]
                  </button>
                )}
                {booking.status === 'Confirmed' && (
                  <button
                    className='text-[#0f3] bg-transparent border-none cursor-pointer font-mono text-sm'
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
      <div>
        <h3 className='text-2xl font-bold mb-4'>Cancelled Bookings</h3>
        {bookings
          .filter(b => b.status === 'Cancelled')
          .map(booking => (
            <div
              key={booking._id}
              className='bg-[#181818] rounded-xl p-5 mb-4 border border-[#333]'
            >
              <div className='font-semibold text-lg mb-1'>
                <span role='img' aria-label='court'>
                  🎾
                </span>{' '}
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
      </div>
    </div>
  )
}
