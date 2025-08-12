import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'sonner'

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
      toast.success('Successfully loaded all the venues')
      return { venues, totalPages }
    } catch (err) {
      set({ venues: [], totalPages: 0 })
      toast.error('Could not all the venues')
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
      console.log('the data is: ', venues)
      set({ venues: venues, totalPages: totalPages })
      if (venues.length > 0) {
        toast.success('Successfully loaded all the venues.')
      } else {
        toast.info('No venues matched your query.')
      }
      return { venues, totalPages }
    } catch (err) {
      set({ venues: [], totalPages: 0 })
      toast.error('Could not find venues with these parameters')
    } finally {
      set({ loading: false })
    }
  }
}))

export default useVenueStore
