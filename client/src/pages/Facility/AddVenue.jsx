import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import citiesData from '../../data/citiesData.json'

export default function AddVenue() {
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        city: 'Ahmedabad',
        address: '',
        description: '',
        sports: [],
        amenities: []
    });
    const [sportsInput, setSportsInput] = useState('');
    const [amenitiesInput, setAmenitiesInput] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (images.length + files.length > 5) {
            return toast.error('You can upload a maximum of 5 images');
        }

        const validFiles = files.filter(file => file.type.startsWith('image/'));
        if (validFiles.length !== files.length) {
            return toast.error('Only image files are allowed');
        }

        setImages(prev => [
            ...prev,
            ...validFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))
        ]);
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleTagInput = (e, type) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            e.preventDefault();
            const value = e.target.value.trim();
            const lowerValue = value.toLowerCase();

            if (formData[type].some(item => item.toLowerCase() === lowerValue)) {
                return toast.error(`${type === 'sports' ? 'Sport' : 'Amenity'} already added`);
            }

            setFormData(prev => ({
                ...prev,
                [type]: [...prev[type], value]
            }));

            if (type === 'sports') setSportsInput('');
            else setAmenitiesInput('');
        }
        else if (e.key === 'Backspace' && !e.target.value) {
            setFormData(prev => ({
                ...prev,
                [type]: prev[type].slice(0, -1)
            }));
        }
    };

    const removeTag = (type, index) => {
        setFormData(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            return toast.error('Please upload at least one image');
        }
        else if (!formData.name.trim()) {
            return toast.error('Name is required');
        }
        else if (!formData.city || !citiesData.includes(formData.city)) {
            return toast.error('Please select a valid city');
        }
        else if (!formData.address.trim()) {
            return toast.error('Address is required');
        }
        else if (!formData.description.trim()) {
            return toast.error('Description is required');
        }
        else if (formData.sports.length === 0) {
            return toast.error('Please add at least one sport');
        }
        else if (formData.amenities.length === 0) {
            return toast.error('Please add at least one amenity');
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append('name', formData.name);
            data.append('city', formData.city);
            data.append('address', formData.address);
            data.append('description', formData.description);
            formData.sports.forEach(sport => data.append('sports', sport));
            formData.amenities.forEach(amenity => data.append('amenities', amenity));
            images.forEach(({ file }) => data.append('images', file));

            await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/facility/add-venue`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            toast.success('Venue added successfully!');
            navigate('/facility/all-venues');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add venue');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-2xl mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Add Venue</h2>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label className='block mb-1 font-medium'>Images (max 5)</label>
                        <input
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handleImageChange}
                            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0 file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
                        />
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3'>
                            {images.map((img, i) => (
                                <div key={i} className='relative z-0'>
                                    <img
                                        src={img.preview}
                                        alt='preview'
                                        className='w-full aspect-square object-cover rounded-md border'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeImage(i)}
                                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium' htmlFor='city'>City</label>
                        <input
                            list='cities-list'
                            id='city'
                            name='city'
                            value={formData.city}
                            onChange={handleChange}
                            placeholder='Select Venue City'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <datalist id='cities-list'>
                            {citiesData.map(item => (
                                <option key={item} value={item} />
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Address</label>
                        <textarea
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            rows='2'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Description</label>
                        <textarea
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            rows='3'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Sports Supported</label>
                        <div className='flex flex-wrap gap-2 mb-2'>
                            {formData.sports.map((sport, i) => (
                                <span key={i} className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2'>
                                    {sport}
                                    <button type='button' onClick={() => removeTag('sports', i)}>×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            type='text'
                            value={sportsInput}
                            onChange={(e) => setSportsInput(e.target.value)}
                            onKeyDown={(e) => handleTagInput(e, 'sports')}
                            placeholder='Type and press Enter'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Amenities Offered</label>
                        <div className='flex flex-wrap gap-2 mb-2'>
                            {formData.amenities.map((amenity, i) => (
                                <span key={i} className='bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2'>
                                    {amenity}
                                    <button type='button' onClick={() => removeTag('amenities', i)}>×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            type='text'
                            value={amenitiesInput}
                            onChange={(e) => setAmenitiesInput(e.target.value)}
                            onKeyDown={(e) => handleTagInput(e, 'amenities')}
                            placeholder='Type and press Enter'
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                            ? 'bg-gray-300 !cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Adding Venue...' : 'Add Venue'}
                    </button>
                </form>
            </div>
        </div>
    )
}