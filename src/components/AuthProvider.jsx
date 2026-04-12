import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null) // Here you store { email, roles: [] }
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  },[]);

  // Calling the endpoint
  const checkAuthStatus = async () => {
    console.log("checkAuthStatus triggered");
    
    try{
      var response = await fetch("https://localhost:7046/api/Auth/authenticated", {
        method: "GET",
        credentials: "include"
      });
      
      if(response.ok){
        var responseJson = await response.json();
        setUser(responseJson);
        console.log("responseJson in checkAuthStatus:");
        console.log(responseJson);
      }
    }
    catch(error){
      console.error("Error at authentication: " + error.message);
      setUser(null);
    }
    finally{
      setAuthLoading(false);
    }


    // With axios
    // axios.get('https://localhost:7046/api/Auth/authenticated', { withCredentials: true})
    // .then(response => {
    //   setUser(response);
    // })
    // .catch(error => {
    //   console.log("Error at authentication: " + error.message);
    //   setUser(null);
    // })
    // .finally(() => {
    //   setAuthLoading(false);
    // });

  }

  const logout = async () => {
    try{
      await fetch('https://localhost:7046/api/Auth/logout',{
        method: 'POST',
        credentials: "include"
      });

      setUser(null);
    }
    catch(error){
      console.error("An error ocurred while attempting to logout. " + error.message);
    }
  }

  return(
    <AuthContext.Provider value={{user, setUser, authLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to use easily in any component
export const useAuth = () => useContext(AuthContext);