import { Navigate, Outlet } from 'react-router';

const Protected = ({ isSignedIn, role }) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  if (role === 'member' || role === 'admin' || role === 'superadmin') {
    return <Outlet />;
  }
  // Si el rol no es válido, redirigir a not found
  return <Navigate to="/notfound" replace />;
};

export default Protected;
