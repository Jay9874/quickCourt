import { create } from 'zustand'
import { toast } from 'sonner'
import axios from 'axios'

const useVenueStore = create((set, get) => ({
  loading: false,
  venues: [],
  fetchVenues: async city => {
    try {
      set({ loading: true })
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/venues?city=${city}`,
        {
          withCredentials: true
        }
      )
      toast.success('Loaded all the venues successfully!')
      set({ venues: res.data })
    } catch (error) {
      console.log('err while finding venues: ', error)
      toast.error('The venues could not be found in the city.')
    } finally {
      set({ loading: false })
    }
  }
}))

export default useVenueStore
