import React from "react";
import Button from "react-bootstrap/Button";
import { useMsal } from "@azure/msal-react";
import MainHeader from "./MainHeader";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import "../App.css";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const handleLogin = () => {
    instance.loginPopup();
    navigate("/");
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
