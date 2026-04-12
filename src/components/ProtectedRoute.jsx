import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider";
import NoPermit from "./NoPermit";

const ProtectedRoute = ({children, requiredRole}) => {
  const { user, authLoading } = useAuth();
  console.log("user in ProtectedRoute:");
  console.log(user);
  console.log("authLoading in ProtectedRoute:");
  console.log(authLoading);

  if(!authLoading){
    // If there is no user, redirect to login
    if(!user || !user.isAuthenticated){
    console.log("Entered there is no user in ProtectedRoute")
    return <Navigate to="/login" replace />
    // return <Navigate to="/" replace />
    }

    // If there is required role and user does not have it, show the component for "not authorized"
    if(requiredRole && !user.roles.includes(requiredRole)){
      return <NoPermit />
    }

    return children;
  }

  //////////////////////////////////////////////

  // If there is no user, redirect to login
  // if(!user || !user.isAuthenticated){
  //   console.log("Entered there is no user in ProtectedRoute")
  //   return <Navigate to="/login" replace />
  //   // return <Navigate to="/" replace />
  // }

  // If there is required role and user does not have it, show the component for "not authorized"
  // if(requiredRole && !user.roles.includes(requiredRole)){
  //   return <NoPermit />
  // }

  // return children;
}

export default ProtectedRoute;