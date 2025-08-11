import React from 'react'
import VenueCard from '../components/VenueCard'

export default function Home () {
  // Mock data - replace with actual API call
  const mockVenues = [
    {
      id: 1,
      name: 'Central Sports Complex',
      sports: ['Basketball', 'Volleyball', 'Badminton'],
      pricePerHour: 1500,
      location: 'Bandra West, Mumbai',
      rating: 4.5,
      venueType: 'Indoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Riverside Tennis Club',
      sports: ['Tennis'],
      pricePerHour: 2000,
      location: 'Powai, Mumbai',
      rating: 4.8,
      venueType: 'Outdoor',
      image:
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Elite Soccer Field',
      sports: ['Soccer', 'Football'],
      pricePerHour: 2500,
      location: 'Andheri East, Mumbai',
      rating: 4.2,
      venueType: 'Outdoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Metro Basketball Arena',
      sports: ['Basketball'],
      pricePerHour: 1800,
      location: 'Kurla West, Mumbai',
      rating: 4.6,
      venueType: 'Indoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    
  ]

  return (
    <div>
      <div className='flex min-h-[50vh]'>
        {/* the bg container */}
        <div></div>
        {/* the left container*/}
        <div className='flex justify-center flex-col p-4'>
          <form>
            <div className='flex p-1 border border-2 rounded-md w-fit'>
              <div style={{ height: '24px', width: '24px' }}>
                <svg
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  stroke='#707070'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <path
                      d='M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z'
                      stroke='#9c9c9c'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{' '}
                    <path
                      d='M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z'
                      stroke='#9c9c9c'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{' '}
                  </g>
                </svg>
              </div>
              <input
                className=''
                type='text'
                name='city'
                placeholder='Ahmedabad'
              />
            </div>
          </form>
          <div className='mt-2'>
            <h2>Find Players and Venue Nearby</h2>
            <p>
              Seamlessly explore special venue to play with
              <br />
              sports enthuasts just like you!
            </p>
          </div>
        </div>
      </div>

      {/* the loaded venues */}
      <div className='flex overflow-scroll'>
        {mockVenues.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  )
}
