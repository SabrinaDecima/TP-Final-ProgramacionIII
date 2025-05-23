import { Navigate, Outlet } from 'react-router';

const Protected = ({ isSignedIn, role, children }) => {
  if (!isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  // Validando el acceso por rol
  // if (role === "socio" || role === "admin" || role === "superadmin") {
  //   return <>{children}</>;
  // }

  return <Outlet />;
};

export default Protected;
