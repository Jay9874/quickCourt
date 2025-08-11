import React, { useState, useEffect } from 'react'
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
  const [venuesPerPage] = useState(6)
  const { fetchVenuesWithParams, venues, city, totalPages } = useVenueStore()

  // Pagination
  // const indexOfLastVenue = currentPage * venuesPerPage
  // const indexOfFirstVenue = indexOfLastVenue - venuesPerPage
  // const currentVenues = filteredVenues.slice(
  //   indexOfFirstVenue,
  //   indexOfLastVenue
  // )
  // const totalPages = Math.ceil(filteredVenues.length / venuesPerPage)

  // const paginate = pageNumber => setCurrentPage(pageNumber)

  function clearFilters () {
    setFilters(initialFilters)
  }

  useEffect(() => {
    fetchVenuesWithParams({
      ...filters,
      page: currentPage,
      venuesPerPage
    })
  }, [])

  useEffect(() => {
    fetchVenuesWithParams({
      ...filters,
      page: currentPage,
      venuesPerPage
    })
  }, [filters, currentPage])

  return (
    <div className='max-w-7xl mx-auto px-5 py-8'>
      <div className='text-center mb-4'>
        <h1 className='text-4xl font-bold text-secondary-800 mb-3'>
          Sports Venues in <span className='text-gray-500'>{city}</span>
        </h1>
        <p className='text-lg text-secondary-600'>
          Change filter and discover nearby venues
        </p>
      </div>
      <div className='flex gap-8'>
        {/* Left Sidebar Filters */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
        />

        {/* Main Content */}
        <div className='flex-1'>
          {/* Results Count */}
          {/* <div className='mb-6 pb-4 border-b-2 border-secondary-200'>
            <p className='text-secondary-600'>
              Showing {filteredVenues.length} of {venues.length} venues
            </p>
          </div> */}

          {/* Venues Grid */}
          {venues.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
              {venues.map(venue => (
                <VenueCard key={venue.name} venue={venue} />
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

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
}

export default Venues
