import { NavLink } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const { user } = useAuthStore();

  const { isLoading, handleLogout } = useLogout();

  return (
    <div className='sticky z-10 top-0 border-b-1 border-gray-300 bg-white'>
      <ul className='px-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <NavLink to='' className='py-1'>
            <img
              src='/logo.png'
              alt=''
              className='size-[50px] object-cover'
            />
          </NavLink>
          {user.role !== 'player' && (
            <>
              <div className='mr-2 h-[25px] border-l border-gray-200' />
              <p className='uppercase text-sm font-semibold'>{user.role}</p>
            </>
          )}
        </div>

        <NavLink
          to='venues'
          className={({ isActive }) =>
            [
              isActive
                ? 'text-white bg-amber-600 hover:bg-amber-700'
                : 'hover:bg-gray-200',
              'rounded-lg py-1 px-4 cursor-pointer'
            ].join(' ')
          }
        >
          Venue
        </NavLink>

        <div className='flex items-center gap-4'>
          {user.role !== 'player' && (
            <NavLink
              to={`/${user.role}`}
              className={({ isActive }) =>
                [
                  isActive
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-blue-50 border-blue-50 hover:bg-blue-200 text-blue-500',
                  'border rounded-lg py-1 px-4 cursor-pointer'
                ].join(' ')
              }
            >
              Dashboard
            </NavLink>
          )}
          <div className='size-[34px] rounded-full bg-blue-50 hover:bg-blue-200 border border-blue-500 overflow-hidden'>
            <img
              src={user.avatar || '/user.png'}
              alt=''
              className='size-full object-cover'
            />
          </div>
          <button
            disabled={isLoading}
            onClick={handleLogout}
            className={`py-1 px-2 rounded-lg border font-light ${isLoading ? 'bg-gray-50 hover:bg-gray-200 text-gray-500 !cursor-not-allowed' : 'bg-red-50 hover:bg-red-200 text-red-500 cursor-pointer'}`}
          >
            Logout
          </button>
        </div>
      </ul>
    </div>
  )
}
