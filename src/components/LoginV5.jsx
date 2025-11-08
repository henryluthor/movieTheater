import React, {useState, useEffect } from "react";
import axios from 'axios';

const LoginV5 = () => {
  const [inputs, setInputs] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value}));
	}

  useEffect(() => {
    console.log("useEffect triggered");

    axios.get('https://localhost:7046/api/Auth/authenticated', { withCredentials: true})
    .then(response => {
      console.log("response:");
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
      var response = await fetch("https://localhost:7046/api/Login",{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					email: inputs.email,
					password: inputs.password
				})
			});

			var responseJson = await response.json();

      if(responseJson.data.success){
        setLoggedInUser(responseJson.data.email);
      }
      else{
        setLoggedInUser(null);
      }
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
        </form>
      </div>
    );
  }
}

export default LoginV5;