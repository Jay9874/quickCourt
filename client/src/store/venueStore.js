import { create } from 'zustand'
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
    finally {
      set({ loading: false })
    }
  }
}))

export default useVenueStore
