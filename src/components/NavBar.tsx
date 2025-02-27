import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Navbar.Brand href="#home">LibMgmt - 2025</Navbar.Brand>
          </Nav>
          <Nav>
          <Nav className="me-auto">
            <Nav.Link href="#book">Book</Nav.Link>
            <Nav.Link href="#staff">Staff</Nav.Link>
            <Nav.Link href="#members">Members</Nav.Link>
            <Nav.Link href="#lending">Lendings</Nav.Link>
          </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;