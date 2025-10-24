import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import companyData from "../companyData.json";

const LoginV2 = () => {
  const [inputs, setInputs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);
  const [loginMessageColor, setLoginMessageColor] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function isTokenValid(){
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      return Date.now() < expirationTime;
    }
    return false;
  }

  useEffect(() => {
    setIsLoggedIn(isTokenValid());
    // const token = localStorage.getItem('token');
    // if(token && isTokenValid()) {
    if(isTokenValid()) {
      const loggedInUserFromLocalStorage = localStorage.getItem('localStorageLoggedInUser');
      const isAdminFromLocalStorage = localStorage.getItem('localStorageIsAdmin');
      if(loggedInUserFromLocalStorage) {
        setLoginMessage(null);
        setLoggedInUser(loggedInUserFromLocalStorage);
        setIsAdmin(isAdminFromLocalStorage);
      }
    }
    else{
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('localStorageLoggedInUser');
      localStorage.removeItem('localStorageIsAdmin');
      setLoggedInUser(null);
      setIsAdmin(null);
    }
    
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try{
      var response = await fetch("https://localhost:7046/api/Login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });

      var responseJson = await response.json();
      // console.log("responseJson:");
      // console.log(responseJson);

      setIsLoggedIn(responseJson.data.success);

      if(responseJson.data.success){
        setLoginMessageColor(null);
        setLoginMessage(null);
        setLoggedInUser(responseJson.data.email);
        localStorage.setItem('token', responseJson.data.token);
        localStorage.setItem('localStorageLoggedInUser', responseJson.data.email);

        // Check if user has admin role
        if(responseJson.data.idRole == companyData.adminRoleId){
          setIsAdmin(true);
          localStorage.setItem('localStorageIsAdmin', true);
        }
      }
      else{
        // Login was not successful
        setLoginMessageColor("red");
        setLoginMessage(responseJson.message);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('localStorageLoggedInUser');
        localStorage.removeItem('localStorageIsAdmin');
        setLoggedInUser(null);
        setIsAdmin(null);
      }
    }
    catch(error){
      console.error("An error ocurred while attempting to login. " + error.message);
      setLoginMessageColor("red");
      setLoginMessage("An error ocurred while attempting to login. " + error.message);

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('localStorageLoggedInUser');
      localStorage.removeItem('localStorageIsAdmin');
    }
    finally{
      setIsPending(false);
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('localStorageLoggedInUser');
    localStorage.removeItem('localStorageIsAdmin');
    setLoggedInUser(null);
    setIsAdmin(null);
  }

  return (
    <div>
      {loggedInUser && <p>Welcome {loggedInUser}</p>}
      {isLoggedIn ? (
        <div>
          {/* <p>YEAH! IT IS LOGGED IN!</p> */}
          <button onClick={logout}>Log out</button>
          {isAdmin && 
          <div>
            HOW THIS FOR ADMIN USERS
          </div>}
          <div>SHOW THIS FOR REGULAR USERS</div>
        </div>
      ):(
        <div>
          {/* <p>It is NOT logged in.</p> */}
          <form onSubmit={submitForm}>
            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email</label>
            <input 
            type="email" 
            className="form-control" 
            id="exampleDropdownFormEmail1" 
            placeholder="email@example.com" 
            name="email"
            onChange={handleChange}></input>
            <label htmlFor="exampleDropdownFormPassword1">Password</label>
            <input 
            type="password" 
            className="form-control" 
            id="exampleDropdownFormPassword1" 
            placeholder="Password" 
            name="password"
            onChange={handleChange}></input>
            <button className="btn btn-primary">Login</button>
            {isPending &&
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Logging in...</span>
            </button>
            }
          </form>
        </div>
      )}
      {loginMessage &&
      <div>
        <p style={{color: loginMessageColor}}>{loginMessage}</p>
      </div>
      }
    </div>
  )
};

export default LoginV2;
