import React from 'react'
import FilterInput from './FilterInput'

const sportOptions = [
  { value: '', label: 'All Sports' },
  { value: 'Basketball', label: 'Basketball' },
  { value: 'Tennis', label: 'Tennis' },
  { value: 'Soccer', label: 'Soccer' },
  { value: 'Volleyball', label: 'Volleyball' },
  { value: 'Badminton', label: 'Badminton' },
  { value: 'Swimming', label: 'Swimming' },
  { value: 'Cricket', label: 'Cricket' }
]

const priceOptions = [
  { value: '', label: 'All Prices' },
  { value: 'low', label: 'Low (Rs 0-1500)' },
  { value: 'medium', label: 'Medium (Rs 1501-2500)' },
  { value: 'high', label: 'High (Rs 2501+)' }
]

const venueTypeOptions = [
  { value: '', label: 'All Types' },
  { value: 'Indoor', label: 'Indoor' },
  { value: 'Outdoor', label: 'Outdoor' }
]

const ratingOptions = [
  { value: '', label: 'All Ratings' },
  { value: '4', label: '4+ Stars' },
  { value: '3', label: '3+ Stars' },
  { value: '2', label: '2+ Stars' }
]

export const FilterSidebar = ({ filters, setFilters, clearFilters }) => {
  function onFilterChange (e) {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='flex-shrink-0 bg-secondary-50 p-2 rounded-xl shadow-soft h-fit sticky top-24'>
      <h3 className='text-xl font-bold text-secondary-800 mb-6 pb-4 border-b-2 border-secondary-200'>
        Filters
      </h3>

      <div className='space-y-6'>
        <FilterInput
          label='Search by Venue Name'
          type='text'
          value={filters.searchTerm}
          onChange={onFilterChange}
          name='searchTerm'
          placeholder='Search venues...'
        />

        <FilterInput
          label='Sport Type'
          type='select'
          value={filters.selectedSport}
          onChange={onFilterChange}
          name='selectedSport'
          options={sportOptions}
        />

        <FilterInput
          label='Price Range'
          type='select'
          value={filters.selectedPrice}
          onChange={onFilterChange}
          name='selectedPrice'
          options={priceOptions}
        />

        <FilterInput
          label='Venue Type'
          type='select'
          value={filters.selectedVenueType}
          onChange={onFilterChange}
          name='selectedVenueType'
          options={venueTypeOptions}
        />

        <FilterInput
          label='Rating'
          type='select'
          value={filters.selectedRating}
          onChange={onFilterChange}
          name='selectedRating'
          options={ratingOptions}
        />

        <button
          onClick={clearFilters}
          className='py-1 px-2 border bg-red-100 text-red-500 border-red-700 rounded-md'
        >
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar
