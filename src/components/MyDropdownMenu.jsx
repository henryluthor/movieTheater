import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { useAuth } from "./AuthProvider";
import { useState } from "react";

const MyDropdownMenu = () => {
  const {user, logout} = useAuth();
  const [isLogginOut, setIsLoggingOut] = useState(false);

  // const isAdmin = user?.roles?.includes("Admin"); // This will fail if the backend ever send 'admin' instead of 'Admin'
  const isAdmin = user?.roles?.some(role => role.toLowerCase() === 'admin');

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  }

  if(!user || !user.isAuthenticated)
  {
    return null; // or button to login
  }


  return(
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="dark" disabled={isLogginOut} id="dropdown-admin">
          {isLogginOut ? (
            <>
            <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
            />
            Closing...
            </>
          ):(
            user?.email
          )}          
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>

          {isAdmin && (
            <>
            <Dropdown.Divider />
              <Dropdown.Header>Administration</Dropdown.Header>
              <Dropdown.Item as={Link} to="/admin">Admin Panel</Dropdown.Item>
            </>
          )}
          <Dropdown.Divider />
            <Dropdown.Item
            onClick={handleLogout}
            disabled={isLogginOut}
            className="d-flex align-items-center">
              {isLogginOut ? (
                <>
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
                />
                Closing...
                </>
              ) : "Logout"}
            </Dropdown.Item>          
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default MyDropdownMenu;