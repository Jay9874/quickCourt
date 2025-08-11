import { create } from 'zustand'
import axios from 'axios'

const useVenueStore = create((set, get) => ({
  loading: false,
  totalPages: 0,
  city: 'Ahmedabad',
  setCity: city => set({ city: city }),
  venues: [],
  fetchVenuesWithCity: async city => {
    try {
      set({ loading: true })
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/venues/city?city=${city}`,
        {
          withCredentials: true
        }
      )
      const { venues, totalPages } = res.data
      set({ venues: venues, totalPages: totalPages })
      return { venues, totalPages }
    } finally {
      set({ loading: false })
    }
  },

  fetchVenuesWithParams: async params => {
    try {
      set({ loading: true })
      const queryString = Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&')

      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/venues?${queryString}`,
        {
          withCredentials: true
        }
      )
      const { venues, totalPages } = res.data
      set({ venues: venues, totalPages: totalPages })
      return { venues, totalPages }
    } finally {
      set({ loading: false })
    }
  }
}))

export default useVenueStore
