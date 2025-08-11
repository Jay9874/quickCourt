import React, { useState } from 'react'
import VenueCard from '../components/VenueCard'
import Footer from '../components/Footer'
import { Link, NavLink, useSearchParams } from 'react-router-dom'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

export default function Home () {
  // Mock data - replace with actual API call
  // keeping it to show the default result
  const [defaultCity, setDefaultCity] = useState('Ahmadabad')

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
    {
      id: 5,
      name: 'Metro Basketball Arena',
      sports: ['Basketball'],
      pricePerHour: 1800,
      location: 'Kurla West, Mumbai',
      rating: 4.6,
      venueType: 'Indoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Metro Basketball Arena',
      sports: ['Basketball'],
      pricePerHour: 1800,
      location: 'Kurla West, Mumbai',
      rating: 4.6,
      venueType: 'Indoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    }
  ]

  const popularSports = [
    {
      id: 1,
      name: 'Badminton',
      imageUrl: 'https://picsum.photos/seed/1/200/150'
    },
    {
      id: 2,
      name: 'Football',
      imageUrl: 'https://picsum.photos/seed/2/200/150'
    },
    {
      id: 3,
      name: 'Cricket',
      imageUrl: 'https://picsum.photos/seed/3/200/150'
    },
    {
      id: 4,
      name: 'Swimming',
      imageUrl: 'https://picsum.photos/seed/4/200/150'
    },
    {
      id: 5,
      name: 'Tennis',
      imageUrl: 'https://picsum.photos/seed/5/200/150'
    },
    {
      id: 6,
      name: 'Table Tennis',
      imageUrl: 'https://picsum.photos/seed/6/200/150'
    }
  ]

  return (
    <div>
      <div className='relative flex h-[50vh]'>
        {/* the bg container */}
        <div className='absolute top-0 w-full h-full'>
          <img
            className='object-cover'
            style={{ height: '100%', width: '100%' }}
            src='/homepage_img.webp'
            alt='the home background image of stadium'
          />
        </div>
        {/* the left container*/}
        <div className='h-full w-[100%] text-white bg-gradient-to-r from-black to-black/0 absolute top-0 left-0 flex justify-center flex-col p-4'>
          <form>
            <div className='flex justify-center items-center p-1 border-2 rounded-md w-fit'>
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
                className='outline-none border-none px-4 py-1 text-lg'
                type='text'
                name='city'
                placeholder='Ahmedabad'
              />
            </div>
          </form>
          <div className='mt-4'>
            <h1 className='text-2xl font-bold'>
              Find Players and Venue Nearby
            </h1>
            <p className='mt-2'>
              Seamlessly explore special venue to play with
              <br />
              sports enthuasts just like you!
            </p>
          </div>
        </div>
      </div>

      {/* the loaded venues */}
      <div>
        <div className='flex justify-between p-2'>
          <p>Book Venues</p>
          <p>
            <Link className='underline' to={'/venues'}>
              See all Venues {'>'}
            </Link>
          </p>
        </div>
        <div className='flex overflow-scroll gap-24 p-4'>
          {mockVenues.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        {/* the carousel buttons */}
        <div className='flex justify-center items-center p-4 gap-8'>
          <button className='border border-gray-300 p-4 rounded-full'>
            <FaChevronLeft />
          </button>
          <button className='border border-gray-300 p-4 rounded-full'>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* the sports available */}
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-xl font-bold mb-8'>Popular Sports</h2>
          <div className='flex space-x-6 overflow-x-auto'>
            {popularSports.map(sport => (
              <div
                key={sport.id}
                className='flex-none w-56 bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105'
              >
                <img
                  src={sport.imageUrl}
                  alt={sport.name}
                  className='w-full h-40 object-cover'
                />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold text-white'>
                    {sport.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className='mt-4'>
        <Footer />
      </div>
    </div>
  )
}
