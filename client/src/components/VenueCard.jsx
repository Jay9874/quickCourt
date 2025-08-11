import React from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'

const VenueCard = ({ venue }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={venue.image} 
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-secondary-800 leading-tight">
          {venue.name}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {venue.sports.map((sport, index) => (
            <span 
              key={index} 
              className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              {sport}
            </span>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary-600">Starting from:</span>
            <span className="text-lg font-bold text-success-600">
              Rs {venue.pricePerHour}/hour
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-secondary-600">
            <span className="text-lg">📍</span>
            <span className="text-sm">{venue.location}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <StarRating rating={venue.rating} />
            <span className="text-sm font-semibold text-secondary-700">
              {venue.rating}/5
            </span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(`/venues/${venue.id}`)}
          className="w-full btn-success"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default VenueCard
