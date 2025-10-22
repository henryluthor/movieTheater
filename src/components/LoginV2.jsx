import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import companyData from "../companyData.json";
import "./LoginV2.css";

const LoginV2 = () => {
  const [inputs, setInputs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginMessage, setLoginMessage] = useState(null);
  const [loginMessageColor, setLoginMessageColor] = useState("green");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function isTokenValid() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      return Date.now() < expirationTime;
    }
    return false;
  }

  useEffect(() => {
    console.log("useEffect has been triggered");
    
    const token = localStorage.getItem("token");
    if (token && isTokenValid()) {
      setIsLoggedIn(true);
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    setIsPending(true);

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
      console.log("responseJson.data.idRole:");
      console.log(responseJson.data.idRole);

      setIsLoggedIn(responseJson.data.success);

      if (responseJson.data.success) {
        setLoginMessageColor("green");
        localStorage.setItem("token", responseJson.data.token);
        localStorage.setItem("localStorageLoggedInUser", responseJson.data.email);

        // Check if user have admin role
        if (responseJson.data.idRole == companyData.adminRoleId) {
          setIsAdmin(true);
        }
      } 
      else {
        setLoginMessageColor("red");
        setLoginMessage(responseJson.message);
      }
      
    } 
    catch (error) {
      setLoginMessageColor("red");
      console.error(error.message);
      setLoginMessage(error.message);
    } 
    finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          YEAH! IT IS LOGGED IN
        </div>
      ) : (
        <div>
          IS NOT LOGGED IN
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              Login
            </button>
            <div className="dropdown-menu">
            <form onSubmit={submitForm} className="px-4 py-3">
              <div className="mb-3">
                <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label>
                <input name="email" type="email" className="form-control" onChange={handleChange} id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                <input name="password" type="password" className="form-control" onChange={handleChange} id="exampleDropdownFormPassword1" placeholder="Password"/>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="dropdownCheck"/>
                  <label className="form-check-label" htmlFor="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Sign in</button>
            </form>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">New around here? Sign up</a>
            <a className="dropdown-item" href="#">Forgot password?</a>
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginV2;
