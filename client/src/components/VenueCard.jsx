import { Link } from 'react-router-dom'
import { CiMapPin } from 'react-icons/ci'
import { FcSportsMode } from "react-icons/fc";
import VenueTag from './VenueTag'

const VenueCard = ({ venue }) => {
  return (
    <div className='w-48 mx-auto sm:mx-0 shrink-0 flex flex-col bg-gray-50 border border-gray-200 p-2 rounded-md'>
      <div className='w-full flex flex-grow'>
        <img src={venue.images[0]} alt='venue view' className='rounded' />
      </div>

      <div className='mt-2 flex flex-col gap-2'>
        <div className='flex justify-between'>
          <p className='font-semibold'>{venue.name}</p>
          <div>
            <span>⭐️</span>
            <span>{'(6)'}</span>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <CiMapPin color='red' />
          <span className='text-sm'>{venue.city}</span>
        </div>
        {venue.courts.length > 0 && (
          <div className='flex flex-wrap items-center gap-1'>
            <FcSportsMode />
            {venue.courts.map((court, index) => (
              <VenueTag key={index} tag={court.sport} />
            ))}
          </div>
        )}
        <div className='flex justify-between items-center whitespace-nowrap'>
          <p className='text-sm'>₹{Math.min(...venue.courts.map(s => s.price))}/Hour</p>
          <Link
            to={`/venues/${venue._id}`}
            state={{ venue }}
            className='bg-white border-1 border-gray-200 text-green-600 p-2 text-sm rounded-md'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VenueCard