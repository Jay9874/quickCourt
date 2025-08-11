import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const sportOptions = [
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Tennis', label: 'Tennis' },
    { value: 'Soccer', label: 'Soccer' },
    { value: 'Volleyball', label: 'Volleyball' },
    { value: 'Badminton', label: 'Badminton' },
    { value: 'Swimming', label: 'Swimming' },
    { value: 'Cricket', label: 'Cricket' },
    { value: 'Football', label: 'Football' },
]

export default function Court() {
    const location = useLocation();
    const navigate = useNavigate();
    const { venueId } = useParams();

    const venue = location.state?.venue;

    const [isLoading, setLoading] = useState(false);
    const [courts, setCourts] = useState(venue?.courts ?? [])

    const [courtInput, setCourtInput] = useState({
        name: '',
        description: '',
        sport: '',
        price: '',
        available: true,
    })

    const [editIndex, setEditIndex] = useState(null)

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setCourtInput(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const isValid = () => {
        return (
            courtInput.name.trim() &&
            courtInput.description.trim() &&
            courtInput.sport.trim() &&
            courtInput.price !== '' && !isNaN(Number(courtInput.price))
        )
    }

    const handleAddOrUpdate = e => {
        e.preventDefault()

        if (!isValid()) return

        if (editIndex !== null) {
            setCourts(prev => {
                const updated = [...prev]
                updated[editIndex] = { ...courtInput, price: Number(courtInput.price) }
                return updated
            })
            setEditIndex(null)
        }
        else {
            setCourts(prev => [...prev, { ...courtInput, price: Number(courtInput.price) }])
        }

        setCourtInput({
            name: '',
            description: '',
            sport: '',
            price: '',
            available: true,
        })
    }

    const handleEdit = index => {
        setCourtInput(courts[index])
        setEditIndex(index)
    }

    const handleDelete = index => {
        setCourts(prev => prev.filter((_, i) => i !== index))
        if (editIndex === index) {
            setCourtInput({
                name: '',
                description: '',
                sport: '',
                price: '',
                available: true,
            })
            setEditIndex(null)
        }
    }

    const handleSave = async () => {
        try {
            if (courts.length === 0) {
                toast.error('Add at least one court before saving')
                return
            }

            setLoading(true);

            await axios.patch(
                `${import.meta.env.VITE_SERVER_URL}/api/facility/venues/${venueId}/courts`,
                { courts },
                { withCredentials: true }
            )

            toast.success('Courts saved successfully');
            navigate('/facility');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save courts')
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='max-w-2xl mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Manage Court</h2>

                <form className='space-y-4' onSubmit={handleAddOrUpdate}>
                    <div>
                        <label className='block mb-1 font-medium'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={courtInput.name}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded'
                            required
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Description</label>
                        <input
                            type='text'
                            name='description'
                            value={courtInput.description}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded'
                            required
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Sport</label>
                        {/* <input
                            type='text'
                            name='sport'
                            value={courtInput.sport}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded'
                            required
                        /> */}
                        <select
                            name='sport'
                            value={courtInput.sport}
                            onChange={handleChange}
                            className='w-full px-3 py-2.5 border rounded'
                        >
                            {sportOptions.map(item => (
                                <option key={item.label} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Price Per Hour (in ₹)</label>
                        <input
                            type='number'
                            name='price'
                            value={courtInput.price}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded'
                            required
                            min='0'
                            step='0.01'
                        />
                    </div>

                    <div className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            name='available'
                            checked={courtInput.available}
                            onChange={handleChange}
                            id='available'
                        />
                        <label htmlFor='available' className='font-medium'>Available</label>
                    </div>

                    <button
                        type='submit'
                        disabled={!isValid()}
                        className={`w-full py-2 rounded text-white ${isValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {editIndex !== null ? 'Update Court' : 'Add Court'}
                    </button>
                </form>

                {courts.length > 0 && (
                    <>
                        <div className='mt-8'>
                            <h3 className='text-xl font-semibold mb-4'>Courts List</h3>
                            <ul>
                                {courts
                                    .map((court, index) => ({ court, index }))
                                    .filter(({ index }) => index !== editIndex)
                                    .map(({ court, index }) => (
                                        <li
                                            key={index}
                                            className='border p-4 rounded mb-3 flex justify-between items-start'
                                        >
                                            <div>
                                                <p><strong>Name:</strong> {court.name}</p>
                                                <p><strong>Description:</strong> {court.description}</p>
                                                <p><strong>Sport:</strong> {court.sport}</p>
                                                <p><strong>Price Per Hour:</strong> ₹{court.price.toFixed(2)}</p>
                                                <p><strong>Available:</strong> {court.available ? 'Yes' : 'No'}</p>
                                            </div>
                                            <div className='flex flex-col items-end gap-2'>
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    className='p-2 bg-yellow-400 rounded text-white hover:bg-yellow-500'
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(index)}
                                                    className='p-2 bg-red-500 rounded text-white hover:bg-red-600'
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <button
                            disabled={isLoading}
                            onClick={handleSave}
                            className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                                ? 'bg-gray-300 !cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isLoading ? 'Saving...' : 'Save Courts'}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}