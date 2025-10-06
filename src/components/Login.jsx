import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
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
    const token = localStorage.getItem('token');
    if(token && isTokenValid()) {
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
    setLoginMessage("");

    try {
      var response = await fetch("https://localhost:7046/api/Login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      });

      var responseJson = await response.json();
      // console.log("responseJson");
      // console.log(responseJson);
      // console.log("token:");
      // console.log(responseJson.data.token);
      // console.log("responseJson.data.success:");
      // console.log(responseJson.data.success);

      if(responseJson.data.success) {
        setLoginMessage("Welcome " + responseJson.data.email);
        localStorage.setItem('token', responseJson.data.token);
        localStorage.setItem('localStorageLoggedInUser', responseJson.data.email);
        // localStorage.setItem('tokenExpiration', Date.now() + 60000);
      }
      else {
        setLoginMessage(responseJson.message);
      }

      setIsLoggedIn(responseJson.data.success);
      // console.log("isLoggedIn:");
      // console.log(isLoggedIn); // false, why?
      
    }
    catch (error) {
      console.error(error.message);
      setLoginMessage(error.message);
    }
    finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {/* <h1>This is the Login component</h1>
      <p>This is an example of a component for making a login process.</p> */}

      {!isLoggedIn && (
        <form onSubmit={submitForm}>
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange}></input>
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange}></input>
          <button className="btn btn-primary my-3">Login</button>
        </form>
      )}

      {isPending && (
        <button className="btn btn-primary" type="button" disabled>
          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Loading...</span>
        </button>
      )}

      {loginMessage && <p>{loginMessage}</p>}
    </div>
  );
};

export default Login;
