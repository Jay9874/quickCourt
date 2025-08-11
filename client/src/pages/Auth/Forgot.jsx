import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) return toast.error('Email is required');

        try {
            setIsLoading(true);
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/forgot`, { email });
            toast.success('Password reset link sent to your email');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md mt-10'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Recover Account</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        disabled={isLoading}
                    />
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-200 
                            ${isLoading ? 'bg-gray-300 !cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>

                    <div className='flex items-center justify-between gap-4'>
                        <Link to='/login' className='text-blue-600'>Login</Link>
                        <Link to='/signup' className='text-blue-600'>Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}