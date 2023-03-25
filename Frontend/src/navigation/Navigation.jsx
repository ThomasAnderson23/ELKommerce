import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
        <Navbar.Brand as={NavLink} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart">
              Cart
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/auth">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
