import useAuthStore from '../../store/authStore'
import { NavLink, Outlet } from 'react-router-dom'

const ProfilePage = () => {
  const user = useAuthStore(state => state.user)

  return (
    <main className='container p-4 mx-auto max-w-4xl flex flex-col md:flex-row gap-8'>
      <section className='md:w-1/3 border border-gray-400 rounded-md p-6 shadow-lg flex flex-col items-center text-center'>
        <div className='w-24 h-24 bg-gray-600 mb-4'></div>
        <div className='mb-6'>
          <div className='text-xl font-bold mb-1'>{user?.name || '-'}</div>
          <div className='text-sm text-gray-400'>{user?.phone || '-'}</div>
          <div className='text-sm text-gray-400'>{user?.email || '-'}</div>
        </div>

        <NavLink
          to='edit'
          className={({ isActive }) =>
            [
              isActive
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300',
              'w-full font-semibold py-2 px-4 rounded-lg mb-3 transition-colors'
            ].join(' ')
          }
        >
          Edit Profile
        </NavLink>
        <NavLink
          to='bookings'
          className={({ isActive }) =>
            [
              isActive
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300',
              'w-full font-semibold py-2 px-4 rounded-lg mb-3 transition-colors'
            ].join(' ')
          }
        >
          All Bookings
        </NavLink>
      </section>
      {/* The router outlet */}

      <Outlet />
    </main>
  )
}

export default ProfilePage
