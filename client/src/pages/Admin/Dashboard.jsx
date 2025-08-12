import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosPeople } from "react-icons/io";
import { BsBookmarkCheck } from "react-icons/bs";
import { TbSoccerField } from "react-icons/tb";
import Loading from '../../components/Loading';

export default function AdminDashboard() {
    const [isLoading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        const fetchAdminDashboard = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/admin/dashboard`, {
                    withCredentials: true
                });
                setDashboardData(res.data)
            }
            finally {
                setLoading(false);
            }
        }

        fetchAdminDashboard();
    }, [])

    if (isLoading) {
        return <Loading size={18} className='my-2 mx-auto' />;
    }
    return (
        <div className="max-w-2xl mx-auto px-2 grid grid-cols-2 gap-8">
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-purple-200 rounded-lg'>
                <IoIosPeople size={40} />
                <p className='text-3xl'>{dashboardData.totalUsers}</p>
                <p className='font-semibold'>Total Users</p>
            </div>
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-cyan-200 rounded-lg'>
                <IoIosPeople size={40} />
                <p className='text-3xl'>{dashboardData.totalFacility}</p>
                <p className='font-semibold'>Total Facility Owners</p>
            </div>
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-yellow-200 rounded-lg'>
                <BsBookmarkCheck size={40} />
                <p className='text-3xl'>0</p>
                <p className='font-semibold'>Total Bookings</p>
            </div>
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-pink-200 rounded-lg'>
                <TbSoccerField size={40} />
                <p className='text-3xl'>{dashboardData.totalActiveCourts}</p>
                <p className='font-semibold'>Total Active Courts</p>
            </div>
        </div>
    )
}