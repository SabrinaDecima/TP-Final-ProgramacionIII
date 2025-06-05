import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

import './App.css';

import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';
import Home from './pages/Public/Home/Home';
import Dashboard from './pages/Private/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Protected from './routes/Protected';
import Classes from './pages/Private/Classes/Classes';
import Historical from './pages/Private/Historical/Historical';
import Layout from './components/Layout';
import ForgotPassword from './pages/Public/ForgotPassword/ForgotPassword';
import Pagos from './pages/Private/pagos/Pagos';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');


  const syncAuthState = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setRole(decodedToken.role || null);
        setEmail(decodedToken.email || '');
        setId(decodedToken.id || '')
        setIsSignedIn(true);
      } catch (error) {
        setRole(null);
        setEmail('');
        setIsSignedIn(false);
        localStorage.removeItem('accessToken');
        console.error('Token inválido o expirado:', error);
      }
    } else {
      setRole(null);
      setEmail('');
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    syncAuthState();
    const onStorage = (e) => {
      if (e.key === 'accessToken') syncAuthState();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleSignIn = () => {
    syncAuthState();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsSignedIn(false);
    setRole(null);
    setEmail('');
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home onLogin={handleSignIn} />} />
          <Route path="login" element={<Login onLogin={handleSignIn} />} />
          <Route path="/recuperar" element={<ForgotPassword />} />
          <Route path="registro" element={<Register />} />
          <Route element={<Protected role={role} isSignedIn={isSignedIn} />}>
            <Route
              path="/gimnasio/*"
              element={
                <Layout onLogout={handleLogout} userEmail={email} role={role} id={id} />
              }
            >
              <Route index element={<Dashboard role={role} />} />
              <Route path="clases" element={<Classes id={id} />} />
              <Route path="pagos" element={<Pagos id={id}/>} />
              <Route path="historial" element={<Historical id={id} />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;