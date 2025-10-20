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
    // console.log("In handleChage, event.target.name:");
    // console.log(name);
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
    const token = localStorage.getItem("token");
    if (token && isTokenValid()) {
      setIsLoggedIn(true);
      const userFromLocalStorage = localStorage.getItem(
        "localStorageLoggedInUser"
      );
      if (userFromLocalStorage) {
        setLoginMessage("Welcome " + userFromLocalStorage);
      }
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    setIsPending(true);
    setLoginMessage("");

    try {
      // console.log("email to send:");
      // console.log(inputs.email);
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
      // console.log("token:");
      // console.log(responseJson.data.token);
      // console.log("responseJson.data.success:");
      // console.log(responseJson.data.success);
      console.log("responseJson.data.idRole:");
      console.log(responseJson.data.idRole);

      if (responseJson.data.success) {
        setLoginMessageColor("green");
        setLoginMessage("Welcome " + responseJson.data.email);
        setLoggedInUser(responseJson.data.email);
        localStorage.setItem("token", responseJson.data.token);
        localStorage.setItem(
          "localStorageLoggedInUser",
          responseJson.data.email
        );

        // Check if user have admin role
        if (responseJson.data.idRole == companyData.adminRoleId) {
          setIsAdmin(true);
        }
      } else {
        setLoginMessageColor("red");
        setLoginMessage(responseJson.message);
      }

      setIsLoggedIn(responseJson.data.success);
    } catch (error) {
      setLoginMessageColor("red");
      console.error(error.message);
      setLoginMessage(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      {loginMessage && <p>{loginMessage}</p>}
      <div className="dropdown">
        {isLoggedIn ? (
          <div>
            <p>It is logged in! Yeaaah! Show menu.</p>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome {loggedInUser}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <p>It is NOT logged in. Show form.</p>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              Login
            </button>
            <form onSubmit={submitForm} className="dropdown-menu p-4 LoginBlockContainer">
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormEmail2"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail2"
                  placeholder="email@example.com"
                  name="email"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormPassword2"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleDropdownFormPassword2"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="dropdownCheck2"
                  ></input>
                  <label className="form-check-label" htmlFor="dropdownCheck2">
                    Remember me
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
              <div className="mb-3" style={{color: loginMessageColor}}>
                {loginMessage}
              </div>
            </form>
          </div>
        )}

        {isPending && (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status">Loging in...</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginV2;
