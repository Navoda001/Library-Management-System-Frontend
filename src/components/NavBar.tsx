
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router";
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router'

function CollapsibleExample() {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOnClck = () => {
    logout();
    navigate("/signin")
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <Navbar.Brand>LibMgmt - 2025</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav className="me-auto">
              {isAuthenticated ? (
                <>
                  <Nav.Link as={NavLink} to="/book">Book</Nav.Link>
                  <Nav.Link as={NavLink} to="/member">Members</Nav.Link>
                  <Nav.Link as={NavLink} to="/lending">Lendings</Nav.Link>
                  <Nav.Link as={NavLink} to="/staff">Staff</Nav.Link>
                  <Button variant="warning" onClick={handleOnClck}>Logout</Button>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/signin">SignIn</Nav.Link>
                  <Nav.Link as={NavLink} to="/signup">SignUp</Nav.Link>
                </>

              )}


            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;