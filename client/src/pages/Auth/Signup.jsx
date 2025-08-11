import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import PasswordInput from '../../components/PasswordInput';

export default function SignupPage() {
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'player'
    });
    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword, role } = formData;

        if (!name) return toast.error('Name is required');
        else if (!email) return toast.error('Email is required');
        else if (password.length < 6) return toast.error('Minimum password length is 6');
        else if (!confirmPassword) return toast.error('Confirm Password is required');

        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        if (role !== 'player' && role !== 'facility') {
            return toast.error('Please select your role');
        }

        try {
            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            data.append('role', role);
            if (avatar) {
                data.append('avatar', avatar);
            }

            setLoading(true);

            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            toast.success('Signup successful! Check your email for OTP.');
            navigate('/verify', { state: { email } });
        }
        catch (error) {
            toast.error(error.response.data.message || 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md mt-10'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Create an Account</h2>
                <form onSubmit={handleSubmit} encType='multipart/form-data' className='space-y-4'>
                    <div>
                        <label className='block mb-1 font-medium'>Avatar</label>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleAvatarChange}
                            className='block w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-full file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100'
                        />
                        {avatarPreview && (
                            <img
                                src={avatarPreview}
                                alt='Avatar Preview'
                                className='w-24 h-24 rounded-full mt-3 object-cover border'
                            />
                        )}
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
                        <label className='block mb-1 font-medium'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <PasswordInput
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div>
                        <label className='block mb-1 font-medium'>Confirm Password</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block mb-1 font-medium'>Sign up as</label>
                        <select
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                            className='w-full px-3 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='player'>Player</option>
                            <option value='facility'>Facility Owner</option>
                        </select>
                    </div>

                    <button
                        disabled={isLoading}
                        type='submit'
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                            ? 'bg-gray-300 !cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>

                    <p className='text-center'>
                        Already have an account? <Link to='/login' className='text-blue-600'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}