// App.jsx

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

import './App.css';

import Login from './pages/Public/Login';
import Register from './pages/Public/Register';
import Home from './pages/Public/Home';
import Dashboard from './pages/Private/Dashboard/Dashboard';
import NotFound from './routes/NotFound';
import Protected from './routes/Protected';
import Classes from './pages/Private/Classes';
import Historical from './pages/Private/Historical';
import Layout from './components/Layout';
import ForgotPassword from './pages/Public/ForgotPassword';
import { getToken, removeToken } from './services/authService';
import Pagos from './pages/Private/Pagos';
import Members from './pages/Private/Members';
import AdminClases from './pages/Private/AdminClases';
import AdminHistorial from './pages/Private/AdminHistorial';
import MembersSA from './pages/Private/MembersSA';
import Movimientos from './pages/Private/Dashboard/Movimientos';
import { ClassesReservedProvider } from './context/ClassesReservedContext'; // ✅ Importado

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const syncAuthState = () => {
    const accessToken = getToken();
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        setRole(decodedToken.role || null);
        setEmail(decodedToken.email || '');
        setId(decodedToken.id || '');
        setIsSignedIn(true);
      } catch (error) {
        setRole(null);
        setEmail('');
        setIsSignedIn(false);
        removeToken();
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
    removeToken();
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
          <Route
            path="home"
            element={
              isSignedIn ? (
                <Navigate to="/gimnasio" replace />
              ) : (
                <Home onLogin={handleSignIn} />
              )
            }
          />
          <Route
            path="login"
            element={
              isSignedIn ? (
                <Navigate to="/gimnasio" replace />
              ) : (
                <Login onLogin={handleSignIn} />
              )
            }
          />
          <Route path="/recuperar" element={<ForgotPassword />} />
          <Route
            path="registro"
            element={
              isSignedIn ? <Navigate to="/gimnasio" replace /> : <Register />
            }
          />
          <Route element={<Protected role={role} isSignedIn={isSignedIn} />}>
            {/* 🔽 Envolver las rutas protegidas en el Provider */}
            <Route
              path="/gimnasio/*"
              element={
                <ClassesReservedProvider> {/* ✅ Contexto envolviendo */}
                  <Layout
                    onLogout={handleLogout}
                    userEmail={email}
                    role={role}
                    id={id}
                  />
                </ClassesReservedProvider>
              }
            >
              <Route index element={<Dashboard role={role} />} />
              <Route path="clases" element={<Classes id={id} />} />
              <Route path="pagos" element={<Pagos id={id} />} />
              <Route path="historial" element={<Historical id={id} />} />
              <Route path="members" element={<Members />} />
              <Route path="admin-clases" element={<AdminClases />} />
              <Route path="admin-historial" element={<AdminHistorial />} />
              <Route path="members-management" element={<MembersSA />} />
              <Route path="movimientos" element={<Movimientos />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;