import { Navigate, Outlet } from 'react-router';
import PropTypes from 'prop-types';

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

Protected.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  role: PropTypes.string.isRequired,
};

export default Protected;
