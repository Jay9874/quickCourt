import { NavLink } from 'react-router-dom';

const FacilitySidebar = ({ onLinkClick }) => {
  return (
    <div className='space-y-4 p-4'>
      <NavLink
        to='all-venues'
        onClick={onLinkClick}
        className={({ isActive }) =>
          [
            isActive
              ? 'text-white bg-gray-600 hover:bg-gray-700'
              : 'bg-white hover:bg-gray-200',
            'w-full block rounded-3xl py-1 px-4'
          ].join(' ')
        }
      >
        All Venues
      </NavLink>
      <NavLink
        to='add-venue'
        onClick={onLinkClick}
        className={({ isActive }) =>
          [
            isActive
              ? 'text-white bg-gray-600 hover:bg-gray-700'
              : 'bg-white hover:bg-gray-200',
            'w-full block rounded-3xl py-1 px-4'
          ].join(' ')
        }
      >
        Add Venue
      </NavLink>
    </div>
  )
}

export default FacilitySidebar