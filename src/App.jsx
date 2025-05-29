// Imports de react
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
// Librerias externas
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

// Helpers

// Componentes

// Estilos
import './App.css';

import Login from './pages/Public/Login/Login';
import Home from './pages/Public/Home/Home';
import Dashboard from './pages/Private/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Protected from './routes/Protected';
import Classes from './pages/Private/Classes/Classes';
import Profile from './pages/Private/Profile/Profile';
import Historical from './pages/Private/Historical/Historical';
import Layout from './components/Layout';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');

  // Sincroniza el estado global con el accessToken
  const syncAuthState = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setRole(decodedToken.role || null);
        setEmail(decodedToken.email || '');
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

  // Efecto que escucha cambios en el accessToken
  useEffect(() => {
    syncAuthState();
    const onStorage = (e) => {
      if (e.key === 'accessToken') syncAuthState();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Login: fuerza actualización del estado global
  const handleSignIn = () => {
    syncAuthState();
  };

  // Logout: limpia todo
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
          <Route element={<Protected role={role} isSignedIn={isSignedIn} />}>
            <Route
              path="/gimnasio/*"
              element={
                <Layout onLogout={handleLogout} userEmail={email} role={role} />
              }
            >
              <Route index element={<Dashboard role={role} />} />
              <Route path="clases" element={<Classes />} />
              <Route path="pagos" element={<Profile />} />
              <Route path="historial" element={<Historical />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
