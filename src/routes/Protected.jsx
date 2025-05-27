import { Navigate, Outlet } from 'react-router';

const Protected = ({ isSignedIn, role }) => {
  console.log(role);
  if (!isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  // Validando el acceso por rol
  if (role === 'socio' || role === 'admin' || role === 'superadmin') {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default Protected;
