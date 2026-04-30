import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import Spinner from "react-bootstrap/Spinner";
import NoPermit from "./NoPermit";

// To know what user you are editing once the form replaces the table you use the hook useParams
import { useParams, useNavigate  } from "react-router-dom";

const UserForm = () => {
  const { user } = useAuth();
  const { id } = useParams(); // Captures the ":id" from the URL
  const isEdit = Boolean(id); // If there is an id this form will be used to edit
  const navigate = useNavigate();

  // To know if logged-in user is Admin
  const isAdmin = user.roles.some(role => role.toLowerCase() === "admin");
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    roles: ["Customer"]
  });
  
  const [rolesLoading, setRolesLoading] = useState(true);
  const [roles, setRoles] = useState([]);

  const [userToEditLoading, setUserToEditLoading] = useState(true);

  const [userPosting, setUserPosting] = useState(false);

  const handleChange = (event) => {    
    // const name = event.target.name;
    // const value = event.target.value;
    const { name, value, type, checked } = event.target;

    // If input is a checkbox for roles, we need a special logic
    if(type === "checkbox" && name === "roles"){
      setInputs((prev) => {
        const currentRoles = prev.roles || [];
        const newRoles = checked
        ? [...currentRoles, value] // Add role
        : currentRoles.filter((r) => r !== value); // Remove role

        return { ...prev, [name]: newRoles}
      });

    }
    else{
      // Normal logic for text, simple select, etc
      setInputs((values) => ({...values, [name]:value}));
    }

  }

  useEffect(() => {
    // Delaying useEffect manually for testing
    // setTimeout(getRoles, 3000);

    getRoles();

    if(isEdit){
      // Aquí haces la llamada a tu API o buscas en tu estado global
      getUserToEdit(id);
    }
  },[id, isEdit]);


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

  const getUserToEdit = async (userToEditId) => {
    try{
      var response = await fetch("https://localhost:7046/api/SystemUser/" + userToEditId);
      var responseJson = await response.json();

      console.log("En getUserToEdit responseJson es");
      console.log(responseJson);      

      setInputs({
        email: responseJson.email || "",
        roles: responseJson.roles || []
      });

    }
    catch(error){
      console.error("An error ocurred while attempting to get user data for edition. " + error.message);
    }
    finally{
      setUserToEditLoading(false)
    }
  }

  const returning = () => {
    navigate("user-list"); // To return to user-list
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    setUserPosting(true);

    var endpointToFetch = "";
    const urlRegisterCustomer = "https://localhost:7046/api/SystemUser/register-customer";
    const urlCreateUser = "https://localhost:7046/api/SystemUser/create-user";
    const urlUpdateCustomer = "https://localhost:7046/api/SystemUser/update-customer";
    const urlUpdateUser = "https://localhost:7046/api/SystemUser/update-user";

    var requestInit;

    if(isAdmin){
      if(isEdit){
        // Is admin and mode is edit
        endpointToFetch = urlUpdateUser;
      }
      else{
        // Is admin but mode is NOT edit
        endpointToFetch = urlCreateUser;
      }

      requestInit = {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
          roles: inputs.roles
        })
      }
    }
    else{
      if(isEdit){
        // Is NOT admin but mode is edit
        endpointToFetch = urlUpdateCustomer;
      }
      else{
        // Is NOT admin and mode is NOT edit
        endpointToFetch = urlRegisterCustomer;
      }

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

      // After saving, you return programmatically to the table
      //navigate("/admin/users-list")
    }
    catch(error){
      console.error("An error ocurred while attempting to create user. " + error.message);
    }
    finally{
      setUserPosting(false);
    }
  }

  
  console.log("before return");

  // console.log("isEdit");
  // console.log(isEdit);

  // console.log("id is:");
  // console.log(id);
  
  console.log("inputs are:");
  console.log(inputs);

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
          value={inputs.email || ""}
          onChange={handleChange}
          // defaultValue={initialData?.email}
          ></input>

          {!isEdit && (
            <>
            <label htmlFor="password" className="form-label">Password</label>
            <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            onChange={handleChange}
            ></input>

            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
            id="confirmPassword"
            className="form-control"
            type="password"
            name="confirmPassword"
            ></input>
            </>
          )}
          

          {/* If logged-in user is Admin show roles checkboxes */}
          {isAdmin && (
            rolesLoading?(
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
              <label className="form-label">Roles</label>
              {roles.map((role, index) => (
                <div key={index} className="form-check text-start">
                  <input
                  id={role.id}
                  type="checkbox"
                  className="form-check-input"
                  name="roles"
                  value={role.name}
                  checked={inputs.roles?.includes(role.name) || false}
                  onChange={handleChange}
                  ></input>
                  <label className="form-check-label" htmlFor={role.id}>{role.name}</label>
                </div>
              ))}
              </>
            )
          )}

          <button type="submit" className="btn btn-primary" disabled={userPosting}>{userPosting ? "Posting user..." : "Submit"}</button>
          <button
          type="button"
          className="btn btn-secondary"
          onClick={returning}
          >Cancel and Return
          </button>
        </form>
      </div>
    ):(
      <NoPermit></NoPermit>
    )}
    </>
  );
}

export default UserForm;