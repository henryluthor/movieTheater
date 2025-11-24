import React, {useState, useEffect } from "react";
import axios from 'axios';

const LoginV5 = () => {
  const [inputs, setInputs] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value}));
	}

  useEffect(() => {
    console.log("useEffect triggered");

    axios.get('https://localhost:7046/api/Auth/authenticated', { withCredentials: true})
    .then(response => {
      console.log("useEffect response:");
      console.log(response);
      if(response.data.authenticated){
        setAuthenticated(true);
        setLoggedInUser(response.data.email);
      }
    })
    .catch(error => {
      console.error("error:");
      console.error(error);
    });
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    try{
      // Original line var response = await fetch("https://localhost:7046/api/Login",{
      var response = await fetch("https://localhost:7046/api/Auth/login",{
				method: "POST",
        credentials: "include",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					email: inputs.email,
					password: inputs.password
				})
			});

      console.log("submit response");
      console.log(response);
      console.log("submit response.data");
      console.log(response.data);

			var responseJson = await response.json();

      console.log("submit responseJson");
      console.log(responseJson);
      console.log("submit responseJson.authenticated");
      console.log(responseJson.authenticated);

      if(responseJson.authenticated){
        setAuthenticated(true);
        setLoggedInUser(responseJson.data.email);
      }
      else{
        setLoggedInUser(null);
      }
      setLoginMessage(responseJson.message);
    }
    catch(error){
      console.error("An error ocurred while attempting to login. " + error.message);
    }
  }

  if(authenticated){
    return(
      <div>
        <p>Bienvenido, {loggedInUser}</p>
      </div>
    );
  }
  else{
    return(
      <div>
        <p>Mostrar form</p>
        <form onSubmit={submitForm}>
          <label>Email</label>
          <input
          type="email"
          name="email"
          onChange={handleChange}></input>
          <label>Password</label>
          <input
          type="password"
          name="password"
          onChange={handleChange}></input>
          <button>Login</button>
          <p>{loginMessage}</p>
        </form>
      </div>
    );
  }
}

export default LoginV5;