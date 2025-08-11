import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar () {
  return (
    <div className='sticky top-0 border-b-1 border-gray-300 bg-white'>
      <ul className='flex justify-between'>
        <NavLink to=''>QuickCourt</NavLink>

        <NavLink
          to='venues'
          className={({ isActive }) =>
            [
              isActive
                ? 'text-white bg-amber-600 hover:bg-amber-700'
                : 'hover:bg-gray-200',
              'rounded-3xl  py-1 px-4 cursor-pointer'
            ].join(' ')
          }
        >
          Venue
        </NavLink>
        <NavLink
          to='court-booking'
          className={({ isActive }) =>
            [
              isActive
                ? 'text-white bg-amber-600 hover:bg-amber-700'
                : 'hover:bg-gray-200',
              'rounded-3xl  py-1 px-4 cursor-pointer'
            ].join(' ')
          }
        >
          Court Booking
        </NavLink>
      </ul>
    </div>
  )
}
