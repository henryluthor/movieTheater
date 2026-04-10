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
    try{
      var response = await fetch("https://localhost:7046/api/Auth/authenticated", {
        method: "GET",
        credentials: "include"
      });

      if(response.ok){
        var responseJson = await response.json();
        setUser(responseJson);
      }      
    }
    catch(error){
      console.log("Error at authentication: " + error.message);
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

  return(
    <AuthContext.Provider value={{user, setUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook to use easily in any component
export const useAuth = () => useContext(AuthContext);