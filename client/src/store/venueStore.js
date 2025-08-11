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
      set({ venues: res.data })
    }
    catch {
      toast.error('The venues could not be found in the city.')
    }
    finally {
      set({ loading: false })
    }
  }
}))

export default useVenueStore
