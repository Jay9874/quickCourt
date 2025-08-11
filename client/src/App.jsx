import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthFetch } from './hooks/useAuthFetch';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import VerificationPage from './pages/Auth/Verify';
import ForgotPasswordPage from './pages/Auth/Forgot';
import ResetPasswordPage from './pages/Auth/Reset';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';
import PlayerTestPage from './pages/Player/PlayerTest';
import FacilityTestPage from './pages/Facility/FacilityTest';
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
          <Route path='/facility' element={<FacilityTestPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/admin' element={<AdminTestPage />} />
        </Route>

        <Route path='*' element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App