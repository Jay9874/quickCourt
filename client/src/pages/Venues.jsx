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

  const venuesPerPage = 6
  const { fetchVenuesWithParams, venues, city, totalPages } = useVenueStore()

  function clearFilters() {
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

  return (
    <div className='max-w-7xl mx-auto px-5 py-8'>
      <div className='text-center mb-4'>
        <h1 className='text-4xl font-bold text-secondary-800 mb-3'>
          Sports Venues {city.length > 0 && <span>in <span className='text-gray-500'>{city}</span></span>}
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
        />

        <div className='flex-1'>
          {venues.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
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
        </div>
      </div>
    </div>
  )
}

export default Venues