import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "./AuthProvider";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useAuth();
  const isAdmin = user.roles.some(role => role.toLowerCase() === "admin");

  return(
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {isAdmin &&
              <NavDropdown title="Users">
                <NavDropdown.Item as={Link} to="users">Show users</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="users/new">Create user</NavDropdown.Item>                
              </NavDropdown>
              }
              <Nav.Link href="#customerOptions">Customer options</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Children components are renderized here */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPanel;