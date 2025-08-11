import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const BookingForm = () => {
  // Example state to manage form inputs
  const { venueId } = useParams()

  const [date, setDate] = useState('2025-05-06')
  const [startTime, setStartTime] = useState('13:00')
  const [duration, setDuration] = useState(2)
  const [courts, setCourts] = useState(['Table 1', 'Table 2'])

  // This is where you would fetch data based on the venueId
  const venueData = {
    name: 'SBR Badminton',
    location: 'Satellite, Jodhpur Village',
    rating: 4.5,
    reviews: 6,
    pricePerHour: 250
  }

  const totalCost = venueData.pricePerHour * duration * courts.length

  const handleDurationChange = change => {
    setDuration(prev => Math.max(1, prev + change))
  }

  const handleRemoveCourt = courtToRemove => {
    setCourts(prev => prev.filter(court => court !== courtToRemove))
  }

  function onBook () {
    let booking = {
      date: date,
      start: startTime,
      duration: duration,
      courts: courts
    }
    console.log('the detail is: ', booking)
  }

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto text-white'>
      <h2 className='text-2xl font-bold mb-4'>{venueData.name}</h2>
      <div className='flex items-center text-gray-400 text-sm mb-6'>
        <svg className='w-4 h-4 mr-1 fill-current' viewBox='0 0 24 24'>
          <path d='M12 2C8.13 2 5 5.13 5 9c0 4.5 7 13 7 13s7-8.5 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' />
        </svg>
        <span>{venueData.location}</span>
        <span className='ml-4 text-yellow-400 flex items-center'>
          <svg className='w-4 h-4 mr-1 fill-current' viewBox='0 0 20 20'>
            <path d='M10 15l-5.878 3.09 1.176-6.545L.587 7.645l6.451-.94L10 1l2.962 5.705 6.451.94L14.702 11.545l1.176 6.545z' />
          </svg>
          {venueData.rating} ({venueData.reviews})
        </span>
      </div>

      <div className='space-y-4'>
        {/* Sport */}
        <div>
          <label htmlFor='sport' className='block text-gray-400 mb-1'>
            Sport
          </label>
          <div className='relative'>
            <select
              id='sport'
              className='block w-full bg-gray-700 border border-gray-600 rounded-md p-2 appearance-none pr-8'
            >
              <option>Badminton</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
              <svg
                className='w-4 h-4 fill-current text-gray-400'
                viewBox='0 0 24 24'
              >
                <path d='M7 10l5 5 5-5z' />
              </svg>
            </div>
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor='date' className='block text-gray-400 mb-1'>
            Date
          </label>
          <div className='relative'>
            <input
              type='date'
              id='date'
              value={date}
              onChange={e => setDate(e.target.value)}
              className='block w-full bg-gray-700 border border-gray-600 rounded-md p-2 appearance-none'
            />
          </div>
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor='startTime' className='block text-gray-400 mb-1'>
            Start Time
          </label>
          <div className='relative'>
            <input
              type='time'
              id='startTime'
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className='block w-full bg-gray-700 border border-gray-600 rounded-md p-2 appearance-none'
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className='block text-gray-400 mb-1'>Duration</label>
          <div className='flex items-center'>
            <button
              className='bg-gray-700 text-gray-400 p-2 rounded-l-md hover:bg-gray-600'
              onClick={() => handleDurationChange(-1)}
            >
              -
            </button>
            <span className='bg-gray-700 text-center py-2 px-4 border-t border-b border-gray-600'>
              {duration} Hr
            </span>
            <button
              className='bg-gray-700 text-gray-400 p-2 rounded-r-md hover:bg-gray-600'
              onClick={() => handleDurationChange(1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Court */}
        <div>
          <label htmlFor='court' className='block text-gray-400 mb-1'>
            Court
          </label>
          <div className='relative'>
            <select
              id='court'
              className='block w-full bg-gray-700 border border-gray-600 rounded-md p-2 appearance-none pr-8'
            >
              <option>--Select Court--</option>
            </select>
            <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
              <svg
                className='w-4 h-4 fill-current text-gray-400'
                viewBox='0 0 24 24'
              >
                <path d='M7 10l5 5 5-5z' />
              </svg>
            </div>
          </div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {courts.map(court => (
              <span
                key={court}
                className='flex items-center bg-gray-700 text-gray-300 rounded-md px-2 py-1 text-sm'
              >
                {court}
                <button
                  className='ml-2 text-gray-500 hover:text-white'
                  onClick={() => handleRemoveCourt(court)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onBook}
        className='mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md w-full transition-colors duration-300'
      >
        Continue to Payment - ₹{totalCost.toFixed(2)}
      </button>
    </div>
  )
}

export default BookingForm
