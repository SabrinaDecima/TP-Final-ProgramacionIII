import { Navigate, Outlet } from "react-router"

const Protected = ({ isSignedIn, role, children }) => {
    if (!isSignedIn) {
      return <Navigate to="/login" replace />;
    }
  
    // Validando el acceso por rol
    if (role === "socio") {
      return <>{children}</>;
    }
    if (role === "admin") {
      return <>{children}</>;
    }
    if (role === "superadmin") {
      return <>{children}</>;
    }
  
    return <Navigate to="/login" replace />;
    
  };
  
export default Protected


  