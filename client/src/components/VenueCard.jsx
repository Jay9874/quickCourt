import { Link } from 'react-router-dom'
import { CiMapPin } from 'react-icons/ci'
import { FcSportsMode } from "react-icons/fc";
import VenueTag from './VenueTag'
// import StarRating from './StarRating'

const VenueCard = ({ venue }) => {
  const tags = [
    {
      icon: 'hello',
      tag: 'Badminton'
    }
  ]

  return (
    <div className='w-48 shrink-0 bg-gray-50 border border-gray-200 p-2 rounded-md'>
      {/* Image container */}
      <div className='w-full'>
        <img src={venue.images[0]} alt='venue view' className='rounded' />
      </div>
      {/* info container */}
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <p>{venue.name}</p>
          <span>⭐️</span>
          <span>{'(6)'}</span>
        </div>
        <div className='flex items-center'>
          <CiMapPin color='red' />
          <span>{venue.city}</span>
        </div>
        <div>
          <span>₹</span>
          <span>250</span>
          <span>Per Hour</span>
        </div>
        {venue.courts && (
          <div className='flex flex-wrap items-center gap-1'>
            <FcSportsMode />
            {venue.courts.map((court, index) => (
              <VenueTag key={index} tag={court.sport} />
            ))}
          </div>
        )}
        <div className='flex justify-center items-center mt-2'>
          <Link
            to={`/venues/${venue._id}`}
            state={{ venue }}
            className='bg-white border-1 border-gray-200 text-green-600 p-2 rounded-md'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VenueCard