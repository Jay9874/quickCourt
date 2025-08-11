import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthFetch } from './hooks/useAuthFetch';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import FacilitySidebar from './components/Sidebar/FacilitySidebar';
import AdminSidebar from './components/Sidebar/AdminSidebar';
import Home from './pages/Home';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import VerificationPage from './pages/Auth/Verify';
import ForgotPasswordPage from './pages/Auth/Forgot';
import ResetPasswordPage from './pages/Auth/Reset';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';
import CourtBooking from './pages/CourtBooking';
import MyBookings from './pages/MyBookings';
import ProfilePage from './pages/Profile';
import PlayerTestPage from './pages/Player/PlayerTest';
import FacilityDashboard from './pages/Facility/Dashboard';
import AddVenue from './pages/Facility/AddVenue';
import AdminTestPage from './pages/Admin/AdminTest';

function App() {
  const { fetchUser } = useAuthFetch();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/venues' element={<Venues />} />
          <Route path='/venues/:id' element={<VenueDetail />} />
          <Route path='/booking/:venueId' element={<CourtBooking />} />
          <Route path='/profile' element={<ProfilePage />} >
            <Route path='bookings' element={<MyBookings />} />

          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/verify' element={<VerificationPage />} />
          <Route path='/forgot' element={<ForgotPasswordPage />} />
          <Route path='/reset/:token' element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['player']} />}>
          <Route path='/player' element={<PlayerTestPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['facility']} />}>
          <Route path='/facility' element={<Layout Sidebar={FacilitySidebar} />}>
            <Route index element={<FacilityDashboard />} />
            <Route path='add-venue' element={<AddVenue />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/admin' element={<Layout Sidebar={AdminSidebar} />}>
            <Route index element={<AdminTestPage />} />
          </Route>
        </Route>

        <Route path='*' element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App