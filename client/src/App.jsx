import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthFetch } from './hooks/useAuthFetch';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import VerificationPage from './pages/Auth/Verify';
import ForgotPasswordPage from './pages/Auth/Forgot';
import Venues from './pages/Venues';
import VenueDetail from './pages/VenueDetail';

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
          <Route path='/player' element={<Home />} />
          <Route path='/facility' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/verify' element={<VerificationPage />} />
          <Route path='/forgot' element={<ForgotPasswordPage />} />
          <Route path='/venues' element={<Venues/>}/>
          <Route path='/venues/:id' element={<VenueDetail />} />
          
        </Route>
        <Route path='*' element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App