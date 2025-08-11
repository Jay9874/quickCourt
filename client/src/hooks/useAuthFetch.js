import axios from 'axios'
import useUserStore from '../store/authStore'

export const useAuthFetch = () => {
    const { setUser, clearUser, setAuthenticating, setAuthenticated } = useUserStore();

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/me`, {
                withCredentials: true
            });

            setUser(res.data.user);
            setAuthenticated(true);
        }
        catch {
            clearUser();
        }
        finally {
            setAuthenticating(false);
        }
    };

    return { fetchUser };
};