import { Navigate, Outlet } from "react-router"

const Protected = ({isSignedIn, Outlet}) => {
    if (!isSignedIn) {
        return <Navigate to="/login" replace/>
    }
  
    return Outlet
}

export default Protected