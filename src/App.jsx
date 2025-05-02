// Imports de react
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
// Librerias externas

// Helpers

// Componentes

// Estilos
import "./App.css";
import { ToastContainer } from "react-toastify";

import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/routes/notFound/NotFound";
import Protected from "./components/routes/protected/Protected";

import GymClasses from "./components/clases/gymClasses/GymClasses"; // socios solicitan turnos
import Pagos from "./components/routes/pagos/Pagos"; // pagos de cuotas
import Historial from "./components/routes/historial/Historial"; // historial de clases
import Socios from "./components/routes/socios/Socios"; // admin que ve todos los socios
import GestionSocios from "./components/routes/gestionSocios/GestionSocios"; // gestion de socios para admin
import Admins from "./components/routes/admins/Admins"; //  gestionar admins, solo para superadmin

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleLogout = () => {
    setIsSignedIn(false);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="login" element={<Login onLogin={handleSignIn} />} />
          <Route element={<Protected isSignedIn={isSignedIn} />}>
            <Route
              path="/home/*"
              element={<Dashboard onLogout={handleLogout} />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
