import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import useAuthStore from '../store/authStore';

export const useLogout = () => {
    const [isLoading, setLoading] = useState(false);
    const { clearUser } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);

            await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
                withCredentials: true
            });

            clearUser();
            toast.success('Logged out successfully!');
            navigate('/login');
        }
        catch (error) {
            toast.error('Failed to logout');
        }
        finally {
            setLoading(false);
        }
    };

    return { isLoading, handleLogout };
};