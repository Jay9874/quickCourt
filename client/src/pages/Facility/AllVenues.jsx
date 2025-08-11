import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Loading from '../../components/Loading';

export default function AllVenues() {
    const [isLoading, setLoading] = useState(true);
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchMyVenues = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/facility/venues`, {
                    withCredentials: true
                });
                setVenues(res.data)
            }
            finally {
                setLoading(false);
            }
        }

        fetchMyVenues();
    }, [])

    return (
        <div className='max-w-2xl mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>My Venues</h2>
                {isLoading ? <Loading size={18} className='mx-auto' />
                    : venues.length === 0 ? 'No venues added yet'
                        : venues.map(venue => (
                            <div
                                key={venue._id}
                                className='p-4 flex items-center justify-between border-2 border-gray-400 rounded-lg'
                            >
                                <p className='text-lg font-semibold'>{venue.name}</p>
                                <div className='flex items-center gap-2'>
                                    <Link
                                        to={`/facility/court/${venue._id}`}
                                        state={{ venue }}
                                        className='text-green-600'
                                    >
                                        Manage Court
                                    </Link>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    )
}