import React from 'react'
import FilterInput from './FilterInput'

export const FilterSidebar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedSport, 
  setSelectedSport, 
  selectedPrice, 
  setSelectedPrice, 
  selectedVenueType, 
  setSelectedVenueType, 
  selectedRating, 
  setSelectedRating, 
  onClearFilters 
}) => {
  const sportOptions = [
    { value: "", label: "All Sports" },
    { value: "Basketball", label: "Basketball" },
    { value: "Tennis", label: "Tennis" },
    { value: "Soccer", label: "Soccer" },
    { value: "Volleyball", label: "Volleyball" },
    { value: "Badminton", label: "Badminton" },
    { value: "Swimming", label: "Swimming" },
    { value: "Cricket", label: "Cricket" }
  ]

  const priceOptions = [
    { value: "", label: "All Prices" },
    { value: "low", label: "Low (Rs 0-1500)" },
    { value: "medium", label: "Medium (Rs 1501-2500)" },
    { value: "high", label: "High (Rs 2501+)" }
  ]

  const venueTypeOptions = [
    { value: "", label: "All Types" },
    { value: "Indoor", label: "Indoor" },
    { value: "Outdoor", label: "Outdoor" }
  ]

  const ratingOptions = [
    { value: "", label: "All Ratings" },
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
    { value: "2", label: "2+ Stars" }
  ]

  return (
    <div className="w-80 flex-shrink-0 bg-secondary-50 p-6 rounded-xl shadow-soft h-fit sticky top-24">
      <h3 className="text-xl font-bold text-secondary-800 text-center mb-6 pb-4 border-b-2 border-secondary-200">
        Filters
      </h3>
      
      <div className="space-y-6">
        <FilterInput
          label="Search by Venue Name"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search venues..."
        />

        <FilterInput
          label="Sport Type"
          type="select"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          options={sportOptions}
        />

        <FilterInput
          label="Price Range"
          type="select"
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          options={priceOptions}
        />

        <FilterInput
          label="Venue Type"
          type="select"
          value={selectedVenueType}
          onChange={(e) => setSelectedVenueType(e.target.value)}
          options={venueTypeOptions}
        />

        <FilterInput
          label="Rating"
          type="select"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          options={ratingOptions}
        />

        <button 
          onClick={onClearFilters}
          className="w-full btn-danger"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar
