import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthFetch } from '../../hooks/useAuthFetch';
import PasswordInput from '../../components/PasswordInput';

export default function LoginPage() {
    const navigate = useNavigate();

    const { fetchUser } = useAuthFetch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email) return toast.error('Email is required');
        if (!password) return toast.error('Password is required');

        try {
            setLoading(true);

            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                email, password
            }, { withCredentials: true });

            toast.success('Login successful!');

            const fetchedUser = await fetchUser();

            if (fetchedUser?.role === 'player') navigate('/');
            else if (fetchedUser?.role === 'facility') navigate('/facility');
            else if (fetchedUser?.role === 'admin') navigate('/admin');
            else navigate('/');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md mt-10'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Login to Your Account</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
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

                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                            ? 'bg-gray-300 !cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <div className='flex flex-col items-center'>
                        <p>
                            Don't have an account? <Link to='/signup' className='text-blue-600'>Signup</Link>
                        </p>
                        <Link to='/forgot' className='text-blue-600'>Forgot Password</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}