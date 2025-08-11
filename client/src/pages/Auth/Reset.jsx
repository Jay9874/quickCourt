import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import PasswordInput from '../../components/PasswordInput';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const { token } = useParams();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) return toast.error('Password is required');
        if (password.length < 6) return toast.error('Minimum 6 characters');
        if (password !== confirmPassword) return toast.error('Passwords do not match');

        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/reset/${token}`, { password });
            toast.success('Password reset successful');
            navigate('/login');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md mt-10'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Reset Password</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                        <label className='block mb-1 font-medium'>Confirm Password</label>
                        <PasswordInput
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-200 
                            ${isLoading ? 'bg-gray-300 !cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {isLoading ? 'Updating...' : 'Reset Password'}
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