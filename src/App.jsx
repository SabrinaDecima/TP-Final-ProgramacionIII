// Imports de react
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
// Librerias externas

// Helpers

// Componentes

// Estilos
import './App.css';
import { ToastContainer } from 'react-toastify';

import Login from './pages/Public/Login/Login';
import Home from './pages/Public/Home/Home';
import Dashboard from './pages/Private/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Protected from './routes/Protected';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleLogout = () => {
    setIsSignedIn(false);
  };

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home onLogin={handleSignIn} />} />
          <Route path="login" element={<Login onLogin={handleSignIn} />} />
          <Route element={<Protected isSignedIn={isSignedIn} />}>
            <Route
              path="/dashboard/*"
              element={<Dashboard onLogout={handleLogout} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
