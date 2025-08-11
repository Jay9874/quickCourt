import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from './store/authStore';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

export default function ProtectedRoute() {
    const { isAuthenticated, isAuthenticating } = useUserStore();
    const location = useLocation();

    if (isAuthenticating) {
        return <Loading size={18} className='my-2 mx-auto' />;
    }

    const authPages = ['/login', '/signup', '/verify', '/forgot'];

    if (isAuthenticated && authPages.includes(location.pathname)) {
        return <Navigate to='/' replace />;
    }

    if (!isAuthenticated && !authPages.includes(location.pathname)) {
        return <Navigate to='/login' replace />;
    }

    if (!isAuthenticated && authPages.includes(location.pathname)) {
        return <Outlet />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}