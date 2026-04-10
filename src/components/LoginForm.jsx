import { useState } from "react";
import { useAuth } from "./AuthProvider";


const LoginForm = () => {
  const {setUser} = useAuth();
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value}));
	}


  const submitForm = async (ev) => {
    ev.preventDefault();

    try{
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
      setUser(responseJson);
    }
    catch(error){
      // TO DO: SHOW ERROR IN DOM TO NOTIFY USER OF ERROR AT LOGIN
      console.error("An error ocurred while attempting to login. " + error.message);
    }
  }

  return(
    <div>
      <form onSubmit={submitForm}>
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          className="form-control"
          type="email"
          name="email"
          onChange={handleChange}
        ></input>
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          className="form-control"
          type="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button className="btn btn-primary m-3">Login</button>
      </form>
      <p>Not registered? Create an account here</p>
    </div>
  )
}

export default LoginForm;