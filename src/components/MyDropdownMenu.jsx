import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "./AuthProvider";
import { Button } from "react-bootstrap";

const MyDropdownMenu = () => {
  const {user, logout} = useAuth();

  // const isAdmin = user?.roles?.includes("Admin"); // This will fail if the backend ever send 'admin' instead of 'Admin'
  const isAdmin = user?.roles?.some(role => role.toLowerCase() === 'admin');

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }

  if(!user || !user.isAuthenticated)
  {
    return null; // or button to login
  }

  return(
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-admin">
          {user?.email}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/profile">My Profile</Dropdown.Item>

          {isAdmin && (
            <>
            <Dropdown.Divider />
              <Dropdown.Header>Administration</Dropdown.Header>
              <Dropdown.Item href="#/users">Manage Users</Dropdown.Item>
              <Dropdown.Item href="#/reports">See Reports</Dropdown.Item>            
            </>
          )}
          <Dropdown.Divider />
            <Dropdown.Item as={Button} onClick={handleLogout}>Logout</Dropdown.Item>          
        </Dropdown.Menu>
      </Dropdown>      
    </div>
  );
}

export default MyDropdownMenu;