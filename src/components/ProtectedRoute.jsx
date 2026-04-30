import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider";
import NoPermit from "./NoPermit";

const ProtectedRoute = ({children, requiredRole}) => {
  const { user, authLoading } = useAuth();

  if(!authLoading){
    // If there is no user, redirect to login
    if(!user || !user.isAuthenticated){
      return <Navigate to="/login" replace />
    }

    // If there is required role and user does not have it, show the component for "not authorized"
    if(requiredRole && !user.roles.includes(requiredRole)){
      return <NoPermit />
    }

    return children;
  }

}

export default ProtectedRoute;