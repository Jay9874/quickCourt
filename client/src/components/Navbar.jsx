import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
  const { user } = useAuthStore()

  const { isLoading, handleLogout } = useLogout()

  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const openModal = () => {
    document.body.style.overflow = 'hidden'
    setShowLogoutModal(true)
  }

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setShowLogoutModal(false)
  }

  const confirmLogout = () => {
    handleLogout()
    closeModal()
  }

  return (
    <>
      <div className='sticky z-10 top-0 border-b border-gray-300 bg-white'>
        <ul className='px-4 flex items-center justify-between'>
          <NavLink to='' className='py-1 flex items-center'>
            <img
              src='/logo.png'
              alt=''
              className='size-[50px] object-cover'
            />
            {user.role !== 'player' && (
              <>
                <div className='mr-2 h-[25px] border-l border-gray-200' />
                <p className='uppercase text-sm font-semibold'>{user.role}</p>
              </>
            )}
          </NavLink>
          <NavLink
            to={'venues'}
            className={({ isActive }) =>
              [
                isActive
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-blue-50 border-blue-50 hover:bg-blue-200 text-blue-500',
                'border rounded-lg py-1 px-4'
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
                    'border rounded-lg py-1 px-4'
                  ].join(' ')
                }
              >
                Dashboard
              </NavLink>
            )}
            <Link to={'profile/edit'}>
              <div className='size-[34px] rounded-full bg-blue-50 hover:bg-blue-200 border border-blue-500 overflow-hidden'>
                <img
                  src={user.avatar || '/user.png'}
                  alt=''
                  className='size-full object-cover'
                />
              </div>
            </Link>

            <button
              disabled={isLoading}
              onClick={openModal}
              className={`py-1 px-2 rounded-lg border font-light ${isLoading
                ? 'bg-gray-50 hover:bg-gray-200 text-gray-500 !cursor-not-allowed'
                : 'bg-red-50 hover:bg-red-200 text-red-500'
                }`}
            >
              Logout
            </button>
          </div>
        </ul>
      </div>

      {showLogoutModal && (
        <div
          className='fixed inset-0 flex items-center justify-center bg-black/90 z-10'
          onClick={closeModal}
        >
          <div
            className='bg-white rounded-lg p-6 w-80 max-w-full'
            onClick={e => e.stopPropagation()}
          >
            <h2 className='text-lg font-semibold mb-4'>Confirm Logout</h2>
            <p className='mb-6'>Are you sure you want to logout?</p>
            <div className='flex justify-end gap-4'>
              <button
                onClick={closeModal}
                className='px-4 py-2 rounded border border-gray-300 hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                disabled={isLoading}
                className={`px-4 py-2 rounded ${isLoading
                  ? 'bg-gray-50 text-gray-500 !cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
