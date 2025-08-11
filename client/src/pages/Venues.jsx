import React, { useState, useEffect } from 'react'
import FilterSidebar from '../components/FilterSidebar'
import VenueCard from '../components/VenueCard'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import useVenueStore from '../store/venueStore'

export const Venues = () => {
  const [venues, setVenues] = useState([])
  const [filteredVenues, setFilteredVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [venuesPerPage] = useState(6)
  const { fetchVenues, currVenue, city, setCity } = useVenueStore()

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedVenueType, setSelectedVenueType] = useState('')
  const [selectedRating, setSelectedRating] = useState('')

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
    {
      id: 5,
      name: 'Community Swimming Pool',
      sports: ['Swimming'],
      pricePerHour: 1200,
      location: 'Santacruz East, Mumbai',
      rating: 4.0,
      venueType: 'Indoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Park Cricket Ground',
      sports: ['Cricket'],
      pricePerHour: 3000,
      location: 'Worli, Mumbai',
      rating: 4.7,
      venueType: 'Outdoor',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVenues(mockVenues)
      setFilteredVenues(mockVenues)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterVenues()
  }, [
    searchTerm,
    selectedSport,
    selectedPrice,
    selectedVenueType,
    selectedRating,
    venues
  ])

  const filterVenues = () => {
    let filtered = venues.filter(venue => {
      const matchesSearch =
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSport =
        !selectedSport || venue.courts.map(item => item.sport.includes(selectedSport))

      const matchesPrice =
        !selectedPrice ||
        (selectedPrice === 'low' && venue.pricePerHour <= 1500) ||
        (selectedPrice === 'medium' &&
          venue.pricePerHour > 1500 &&
          venue.pricePerHour <= 2500) ||
        (selectedPrice === 'high' && venue.pricePerHour > 2500)

      const matchesVenueType =
        !selectedVenueType || venue.venueType === selectedVenueType

      const matchesRating =
        !selectedRating || venue.rating >= parseInt(selectedRating)

      return (
        matchesSearch &&
        matchesSport &&
        matchesPrice &&
        matchesVenueType &&
        matchesRating
      )
    })

    setFilteredVenues(filtered)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedSport('')
    setSelectedPrice('')
    setSelectedVenueType('')
    setSelectedRating('')
  }

  // Pagination
  const indexOfLastVenue = currentPage * venuesPerPage
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage
  const currentVenues = filteredVenues.slice(
    indexOfFirstVenue,
    indexOfLastVenue
  )
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-5 py-8'>
        <LoadingSpinner size='lg' text='Loading venues...' />
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-5 py-8'>
      <div className='text-center mb-10'>
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
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSport={selectedSport}
          setSelectedSport={setSelectedSport}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedVenueType={selectedVenueType}
          setSelectedVenueType={setSelectedVenueType}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          onClearFilters={clearFilters}
        />

        {/* Main Content */}
        <div className='flex-1'>
          {/* Results Count */}
          <div className='mb-6 pb-4 border-b-2 border-secondary-200'>
            <p className='text-secondary-600'>
              Showing {filteredVenues.length} of {venues.length} venues
            </p>
          </div>

          {/* Venues Grid */}
          {/* {currentVenues.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
              {currVenue.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20 bg-secondary-50 rounded-xl'>
              <p className='text-secondary-600 text-lg mb-6'>
                No venues found matching your criteria.
              </p>
              <button onClick={clearFilters} className='btn-danger'>
                Clear all filters
              </button>
            </div>
          )} */}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
          />
        </div>
      </div>
    </div>
  )
}

export default Venues
