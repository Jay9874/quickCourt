import { create } from 'zustand'
import axios from 'axios'

const useBookingStore = create((set, get) => ({
  bookings: [],
  loading: false,
  fetchBookings: async () => {
    try {
      set({ loading: true })
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/bookings`,
        { withCredentials: true }
      )
      console.log('the res: ', res.data)
      set({ bookings: res.data })
    } catch (err) {
      console.log('err at checking bookings')
      return null
    } finally {
      set({ loading: false })
    }
  }
}))
export default useBookingStore
