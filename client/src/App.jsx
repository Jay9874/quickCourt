import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthFetch } from './hooks/useAuthFetch';
import ProtectedRoute from './ProtectedRoute';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import VerificationPage from './pages/Verify';

function App() {
  const { fetchUser } = useAuthFetch();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Home />} />
          <Route path="/facility" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify" element={<VerificationPage />} />
        </Route>
        <Route path="*" element={<>Not Found</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App