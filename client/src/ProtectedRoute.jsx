import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Loading from './components/Loading';
import Navbar from './components/Navbar';

export default function ProtectedRoute() {
    const { isAuthenticated, isAuthenticating } = useAuthStore();
    const location = useLocation();

    if (isAuthenticating) {
        return <Loading size={18} className='my-2 mx-auto' />;
    }

    const authPages = ['/login', '/signup', '/verify', '/forgot', '/reset'];
    const isAuthPage = authPages.some(path => location.pathname.startsWith(path));

    if (isAuthenticated && isAuthPage) {
        return <Navigate to='/' replace />;
    }

    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to='/login' replace />;
    }

    if (!isAuthenticated && isAuthPage) {
        return <Outlet />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}