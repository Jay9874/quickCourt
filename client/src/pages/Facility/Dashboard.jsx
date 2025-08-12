import { IoIosPeople } from "react-icons/io";
import { BsBookmarkCheck } from "react-icons/bs";
import { TbSoccerField } from "react-icons/tb";

export default function FacilityDashboard() {
    return (
        <div className="max-w-2xl mx-auto px-2 grid grid-cols-2 gap-8">
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-purple-200 rounded-lg'>
                <IoIosPeople size={40} />
                <p className='text-3xl'>0</p>
                <p className='font-semibold'>Total Bookings</p>
            </div>
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-cyan-200 rounded-lg'>
                <IoIosPeople size={40} />
                <p className='text-3xl'>0</p>
                <p className='font-semibold'>Active Courts</p>
            </div>
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-yellow-200 rounded-lg'>
                <BsBookmarkCheck size={40} />
                <p className='text-3xl'>0</p>
                <p className='font-semibold'>Earnings</p>
            </div>
            <div className='p-4 w-full flex flex-col items-center justify-center gap-4 bg-pink-200 rounded-lg'>
                <TbSoccerField size={40} />
                <p className='text-3xl'>0</p>
                <p className='font-semibold'>Booking Calendar</p>
            </div>
        </div>
    )
}