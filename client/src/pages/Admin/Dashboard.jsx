import { useState, useEffect } from 'react'
import axios from 'axios';

export default function AdminDashboard() {
    const [isLoading, setLoading] = useState(true);
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchAdminDashboard = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/admin/dashboard`, {
                    withCredentials: true
                });
                setVenues(res.data)
            }
            finally {
                setLoading(false);
            }
        }

        fetchAdminDashboard();
    }, [])

    return (
        <div>AdminDashboard</div>
    )
}