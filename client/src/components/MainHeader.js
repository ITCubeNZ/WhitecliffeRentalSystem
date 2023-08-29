import React from "react";
import { Navbar, Container } from "react-bootstrap";
import mainLogo from "../img/Whitecliff_Logo.png";
import "../App.css";

const MainHeader = () => {
  return (
    <header className="mainHeader">
      <Navbar className="bg-black py-1" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home" className="header">
            <img alt="mainLogo" src={mainLogo} width="150" height="80" className="d-inline-block align-bottom header" /> Whitecliffe
          </Navbar.Brand>
          <Navbar.Brand id="basic-navbar-nav" className="justify-content-end header ">
            <Navbar.Text className="title ">
              <p>Equipment Loan System</p>
            </Navbar.Text>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainHeader;
