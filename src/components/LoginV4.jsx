import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import companyData from "../companyData.json";

const LoginV3 = () => {
	const [inputs, setInputs] = useState([]);
	const [token, setToken] = useState(null);
	const [isTokenValid, setIsTokenValid] = useState(false);
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [loginMessage, setLoginMessage] = useState(null);
	const [loginMessageColor, setLoginMessageColor] = useState(null);	

	const handleChange = (event) => {
			const name = event.target.name;
			const value = event.target.value;
			setInputs((values) => ({ ...values, [name]: value}));
	}

	useEffect(() => {
		// Check if token is valid, if valid check if user has role admin
		if(token){
			const decodedToken = jwtDecode(token);
			const expirationTime = decodedToken.exp * 1000;
			setIsTokenValid(Date.now() < expirationTime);
		}
		else{
			setIsTokenValid(false);
			setLoggedInUser(false);
			setIsAdmin(false);
		}

		// Now if token is valid check if user has role admin
		if(isTokenValid){
			// Check if user has role admin
		}
		else{
			setIsAdmin(false);
		}
	}, [token]);


	const submitForm = async (e) => {
		e.preventDefault();
		setIsPending(true);

		// New
		setLoginMessage(null);

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
				// Login successful
				setToken(responseJson.data.token);
				setLoggedInUser(responseJson.data.email);
				setLoginMessage(null);
				setLoginMessageColor(null);

				// Check if user has admin role
				setIsAdmin(responseJson.data.idRole == companyData.adminRoleId);
			}
			else{
				// Login was not successful
				setToken(null);
				setLoggedInUser(null);
				setIsAdmin(false);
				setLoginMessage(responseJson.message);
				setLoginMessageColor("red");
			}
		}
		catch(error){
			console.error("An error ocurred while attempting to login. " + error.message);
			setLoginMessage("An error ocurred while attempting to login. " + error.message);
			setLoginMessageColor("red");
		}
		finally{
			setIsPending(false);
		}
	}

	return(
		<div>
			{/* <p>THIS IS LOGIN V3</p> */}
			{/* if token is valid show paragraph, else show form */}
			{isTokenValid ? (
				<div>
					<p>THERE IS A VALID TOKEN</p>
				</div>
			):(
				<div>
					{/* <p>SHOW FORM</p> */}
					<form onSubmit={submitForm}>
						<label htmlFor="exampleDropdownFormEmail1" className="form-label">Email</label>
						<input
						type="email" 
						className="form-control" 
						id="exampleDropdownFormEmail1" 
						placeholder="email@example.com" 
						name="email"
						onChange={handleChange}
						disabled={isPending}></input>
						<label htmlFor="exampleDropdownFormPassword1">Password</label>
						<input 
						type="password" 
						className="form-control" 
						id="exampleDropdownFormPassword1" 
						placeholder="Password" 
						name="password"
						onChange={handleChange}
						disabled={isPending}></input>
						<button className="btn btn-primary" disabled={isPending}>Login</button>
						{isPending &&
						<button className="btn btn-primary" type="button" disabled>
							<span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
							<span role="status">Logging in...</span>
						</button>
						}
						{loginMessage &&
						<div>
							<p style={{ color: loginMessageColor}}>{loginMessage}</p>							
						</div>
						}
					</form>
				</div>
			)}
		</div>
	);
}

export default LoginV3;