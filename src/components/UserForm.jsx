import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import Spinner from "react-bootstrap/Spinner";
import { useForm } from "react-hook-form";

const UserForm = () => {
  const { user } = useAuth();

  // To know if logged-in user is Admin
  const isAdmin = user.roles.some(role => role.toLowerCase() === "admin");
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    role: "Customer"
  });
  
  const [rolesLoading, setRolesLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({...values, [name]:value}));
  }

  useEffect(() => {
    // Delaying useEffect manually for testing
    // setTimeout(getRoles, 3000);

    getRoles();
  },[]);

  const getRoles = async () => {
    try{
      var response = await fetch("https://localhost:7046/api/Role");
      var responseJson = await response.json();
      setRoles(responseJson);
    }
    catch(error){
      console.error("An error ocurred while attempting to fetch roles. " + error.message);
    }
    finally{
      setRolesLoading(false);
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    var endpointToFetch = "";
    const urlRegisterCustomer = "https://localhost:7046/api/SystemUser/register-customer";
    const urlCreateAdminUser = "https://localhost:7046/api/SystemUser/create-admin-user";

    var requestInit;

    if(inputs.role === "Admin" || inputs.role === "admin")
    {
      endpointToFetch = urlCreateAdminUser;

      requestInit = {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
          role: inputs.role
        })
      }
    }
    else{
      endpointToFetch = urlRegisterCustomer;
      
      requestInit = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password
        })
      }
    }

    
    try{
      var response = await fetch(endpointToFetch, requestInit);
      var responseJson = await response.json();
    }
    catch(error){
      console.error("An error ocurred while attempting to create user. " + error.message);
    }
  }

  return(
    <>
    {user ? (
      <div>
        <form onSubmit={handleSubmit}>
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
          // {...register("password")}
          ></input>

          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
          id="confirmPassword"
          className="form-control"
          type="password"
          name="confirmPassword"
          ></input>

          {/* If logged-in user is Admin show role dropdown menu */}
          {isAdmin && (
            rolesLoading ? (
              <div>
              <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
              />
              Loading roles...
            </div>
            ):(
              <>
              <label htmlFor="role" className="form-label">Roles</label>
              <select id="role" className="form-select" name="role" onChange={handleChange}>
                {roles.map( (role, index) => (
                  <option key={index} value={role.name}>{role.name}</option>
                ))}
              </select>
              </>
            )
          )}

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    ):(
      <p>YOU DO NOT HAVE AUTHORIZATION TO SEE THIS</p>
    )}
    </>
  );
}

export default UserForm;