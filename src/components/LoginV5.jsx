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
    console.log("useEffect triggered in LoginV5");

    // With axios
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
      // console.error("Error:");
      // console.error(error);
    });

    // With fetch
    // const fetchData = async () => {
    //   try{
    //     var response = await fetch("https://localhost:7046/api/Auth/authenticated", {
    //     method: "GET",
    //     credentials: "include"
    //     });

    //     console.log("Use effect response:");
    //     console.log(response);

    //     if(response.data.authenticated){
    //       setAuthenticated(true);
    //       setLoggedInUser(response.data.email);
    //     }

    //     var responseJson = await response.json();
    //     console.log("Use effect responseJson:");
    //     console.log(responseJson);
    //   }
    //   catch(error){
    //     console.log("Error:");
    //     console.log(error);
    //   }      
    // };

    // fetchData();

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

      var responseJson = await response.json();
      console.log("submit responseJson");
      console.log(responseJson);
      console.log("submit responseJson.authenticated");
      console.log(responseJson.authenticated);
      console.log("responseJson.email");
      console.log(responseJson.email);

      if(responseJson.authenticated){
        setAuthenticated(true);
        setLoggedInUser(responseJson.email);
      }
      else{
        setAuthenticated(false);
        setLoggedInUser(null);
      }
      setLoginMessage(responseJson.message);
    }
    catch(error){
      // TO DO: SHOW ERROR IN DOM TO NOTIFY USER OF ERROR AT LOGIN
      console.error("An error ocurred while attempting to login. " + error.message);
    }
  }

  
  const logout = async () => {
    try{
      await fetch('https://localhost:7046/api/Auth/logout',{
        method: 'POST',
        credentials: "include"
      });

      setAuthenticated(false);
    }
    catch(error){
      console.log("Error loggin out: " + error)
    }
  }

  if(authenticated){
    return(
      <div>
        <div>
          <p>Welcome, {loggedInUser}</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }
  else{
    return(
      <div>
        <form onSubmit={submitForm}>
          <label htmlFor="email" className="form-label">Email</label>
          <input
          id="email"
          className="form-control"
          type="email"
          name="email"
          onChange={handleChange}></input>
          <label htmlFor="password" className="form-label">Password</label>
          <input
          id="password"
          className="form-control"
          type="password"
          name="password"
          onChange={handleChange}></input>
          <button className="btn btn-primary m-3">Login</button>
          <p>{loginMessage}</p>
        </form>
      </div>
    );
  }
}

export default LoginV5;