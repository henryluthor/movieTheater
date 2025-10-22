import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const LoginV2 = () => {
  const [inputs, setInputs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    // const token = localStorage.getItem('token');
    // if(token && isTokenValid()) {
    if(isTokenValid()) {
      setIsLoggedIn(true);
      const userFromLocalStorage = localStorage.getItem('localStorageLoggedInUser');
      if(userFromLocalStorage) {
        setLoginMessage("Welcome " + userFromLocalStorage);
      }
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
      console.log("responseJson:");
      console.log(responseJson);
      setIsLoggedIn(responseJson.data.success);

      if(responseJson.data.success){
        setLoginMessageColor(null);
        setLoginMessage("Welcome " + responseJson.data.email);
        localStorage.setItem('token', responseJson.data.token);
        localStorage.setItem('localStorageLoggedInUser', responseJson.data.email);
      }
      else{
        setLoginMessageColor("red");
        setLoginMessage(responseJson.message);
      }
    }
    catch(error){
      console.error("An error ocurred while attempting to login. " + error.message);
      setLoginMessageColor("red");
      setLoginMessage("An error ocurred while attempting to login. " + error.message);
    }
    finally{
      setIsPending(false);
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {/* <p>YEAH! IT IS LOGGED IN!</p> */}
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
