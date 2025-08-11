import { useEffect, useState } from "react";
import axios from "axios";

export const useBookings = () => {
    console.log("useBookings hook initialized");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/bookings/me`, {
        withCredentials: true,
      });
      console.log("Bookings fetched:", res.data.bookings);
      setBookings(res.data.bookings || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, refetch: fetchBookings };
};
