import { useState, useEffect } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import useVenueStore from '../store/venueStore'
import VenueCard from '../components/VenueCard'

const initialFilters = {
  searchTerm: '',
  selectedSport: '',
  selectedPrice: '',
  selectedVenueType: '',
  selectedRating: ''
}

export const Venues = () => {
  const [filters, setFilters] = useState(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const [venuesPerPage, setVenuesPerPage] = useState(5)
  const { fetchVenuesWithParams, venues, city, totalPages } = useVenueStore()

  const [showFilters, setShowFilters] = useState(true)

  function clearFilters () {
    setFilters(initialFilters)
    setCurrentPage(1)
  }

  useEffect(() => {
    fetchVenuesWithParams({
      ...filters,
      city,
      page: currentPage,
      venuesPerPage
    })
  }, [filters, currentPage])

  function toggleFilter () {
    setShowFilters(!showFilters)
  }

  return (
    <div className='max-w-7xl mx-auto px-5 py-8'>
      {/* Filter toggler */}
      <div className='h-14 w-14 sm:hidden fixed z-3 bottom-[2rem] right-[2rem] border border-gray-400 rounded-full bg-gray-300 shadow-md'>
        <button onClick={toggleFilter} className='w-full h-full p-4'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {' '}
              <path
                d='M19 3H5C3.89543 3 3 3.89543 3 5V6.17157C3 6.70201 3.21071 7.21071 3.58579 7.58579L9.41421 13.4142C9.78929 13.7893 10 14.298 10 14.8284V20V20.2857C10 20.9183 10.7649 21.2351 11.2122 20.7878L12 20L13.4142 18.5858C13.7893 18.2107 14 17.702 14 17.1716V14.8284C14 14.298 14.2107 13.7893 14.5858 13.4142L20.4142 7.58579C20.7893 7.21071 21 6.70201 21 6.17157V5C21 3.89543 20.1046 3 19 3Z'
                stroke='#323232'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              ></path>{' '}
            </g>
          </svg>
        </button>
      </div>
      <div className='text-center mb-4'>
        <h1 className='text-4xl font-bold text-secondary-800 mb-3'>
          Sports Venues{' '}
          {city.length > 0 && (
            <span>
              in <span className='text-gray-500'>{city}</span>
            </span>
          )}
        </h1>
        <p className='text-lg text-secondary-600'>
          Change filter and discover nearby venues
        </p>
      </div>
      <div className='flex gap-8'>
        <FilterSidebar
          filters={filters}
          setFilters={newFilters => {
            setFilters(newFilters)
            setCurrentPage(1)
          }}
          clearFilters={clearFilters}
          showFilters={showFilters}
        />

        <div className='flex-1'>
          {venues.length > 0 ? (
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
              {venues.map(venue => (
                <VenueCard key={venue._id || venue.name} venue={venue} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-secondary-50 rounded-xl'>
              <p className='text-secondary-600 text-lg mb-6'>
                No venues found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className='py-1 px-2 border bg-red-100 text-red-500 border-red-700 rounded-md'
              >
                Clear All Filters
              </button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => {
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page)
              }
            }}
          />

          {/* Results per page */}
          <div className='flex justify-between mt-4'>
            <div>
              <span className='text-lg'>Results per page: </span>
              <input
                className='w-14 border border-gray-400 rounded-md py-1 px-2'
                type='number'
                name='perPage'
                value={venuesPerPage}
                onChange={e => setVenuesPerPage(e.target.value)}
              />
            </div>
            <div>
              <span className='text-lg'>
                Showing venues: {(currentPage - 1) * venuesPerPage} -{' '}
                {currentPage * venuesPerPage}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Venues
