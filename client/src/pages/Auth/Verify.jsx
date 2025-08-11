import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

export default function VerificationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [isLoading, setIsLoading] = useState(false);
    const inputsRef = useRef([]);

    const email = location.state?.email;

    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!email) {
            navigate('/signup');
            toast.error('Email not found');
            return;
        }

        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            toast.error('Please enter complete OTP');
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
                { email, otp: otpValue }
            );
            toast.success(res.data.message);
            navigate('/login');
        }
        catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto px-2'>
            <div className='p-6 bg-white rounded-xl shadow-md mt-10'>
                <h2 className='text-2xl font-semibold mb-6 text-center'>Enter OTP</h2>
                <form onSubmit={handleVerify} className='space-y-4'>
                    <div className='flex justify-center gap-2.5 mx-[20px]'>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type='text'
                                maxLength='1'
                                value={digit}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputsRef.current[index] = el)}
                                className='size-[50px] text-[20px] text-center border border-[#ccc] rounded-[5px]'
                                disabled={isLoading}
                            />
                        ))}
                    </div>
                    <button
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-200 ${isLoading
                            ? 'bg-gray-300 !cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            }`}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    )
}