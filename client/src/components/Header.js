import React, { useContext } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import mainLogo from "../img/Whitecliff_Logo.png";
import { FiUser } from "react-icons/fi";
import { useMsal } from "@azure/msal-react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext } from "../App";

const Header = () => {
  const user = useContext(UserContext);
  const isStudent = useContext(UserContext);
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup();
  };
  return (
    <>
      <header className="mainHeader">
        <Navbar className="bg-black py-1" expand="lg" variant="dark" collapseOnSelect>
          <Container>
            <Navbar.Brand href="#home" className="header">
              <a href="home">
                <img alt="mainLogo" src={mainLogo} width="150" height="80" className="d-inline-block align-bottom header" />
              </a>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="text">
              <Nav className="me-auto " activeKey="" as="ul">
                <Nav.Item>
                  <Nav.Link as={Link} to={"/"}>
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to={"/book"}>
                    Book
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {isStudent[1] ? (
                    <Nav.Link as={Link} to={"/student"}>
                      Dashboard
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to={"/teacher"}>
                      Teacher
                    </Nav.Link>
                  )}
                </Nav.Item>
              </Nav>

              <Nav>
                <NavDropdown title={<FiUser className=" text userIcon" />} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.2">{user}</NavDropdown.Item>
                  <NavDropdown.Item href="" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
