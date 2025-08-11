import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import axios from 'axios'

export default function EditProfile () {
  const user = useAuthStore(state => state.user)
  const setUser = useAuthStore(state => state.setUser)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/profile`,
        {
          name,
          email,
          phone,
          oldPassword: oldPassword || undefined,
          newPassword: newPassword || undefined
        },
        { withCredentials: true }
      )
      setUser(res.data.user)
      setMessage('Profile updated successfully!')
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Failed to update profile. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPhone(user?.phone || '')
    setOldPassword('')
    setNewPassword('')
    setMessage('')
    setError('')
  }
  return (
    <section className='flex-1 border border-gray-400 rounded-md p-6 shadow-lg'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className='w-20 h-20 bg-gray-600 rounded-full mx-auto mb-2'></div>

        <label className='text-sm font-medium'>Full Name</label>
        <input
          type='text'
          placeholder='Full Name'
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className='p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
        />

        <label className='text-sm font-medium'>Email</label>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className='p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
        />

        <label className='text-sm font-medium'>Phone</label>
        <input
          type='tel'
          placeholder='Phone'
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          className='p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all'
        />

        <label className='text-sm font-medium'>Old Password</label>
        <div className='relative'>
          <input
            type={showOldPassword ? 'text' : 'password'}
            placeholder='Old Password'
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-10'
          />
          <span
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400'
            onClick={() => setShowOldPassword(v => !v)}
          >
            {showOldPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <label className='text-sm font-medium'>New Password</label>
        <div className='relative'>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder='New Password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className='w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all pr-10'
          />
          <span
            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400'
            onClick={() => setShowNewPassword(v => !v)}
          >
            {showNewPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {message && <div className='text-green-500 mt-1'>{message}</div>}
        {error && <div className='text-red-500 mt-1'>{error}</div>}

        <div className='flex gap-4 mt-2'>
          <button
            type='reset'
            className='flex-1 hover:bg-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={loading}
          >
            Reset
          </button>
          <button
            type='submit'
            className='flex-1 bg-green-600 hover:bg-green-700 font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  )
}
