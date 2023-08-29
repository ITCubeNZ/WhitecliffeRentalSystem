import React from "react";
import Button from "react-bootstrap/Button";
import { useMsal } from "@azure/msal-react";
import MainHeader from "./MainHeader";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import "../App.css";

function LoginButton() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup();
    //setIsAuthenticated(true);
  };

  return (
    <>
      <MainHeader />
      <div className="flexs">
        <Container className="text-center py-5  ">
          <Button className="loginButton " variant="dark" onClick={handleLogin}>
            Login
          </Button>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default LoginButton;
