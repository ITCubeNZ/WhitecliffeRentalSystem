import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
const Footer = () => {
  return (
    <footer className="sticky-top page-footer font-small blue pt-2 footer bg-black text-white">
      <Container>
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-2">
              <p>Get in Touch: +08000-1234-324</p>
              <p>Privacy Policy</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

            <div className="col-md-3 mb-md-0 mb-2 ">
              <p>artschool@whitecliffe.co.nz</p>
              <p>Rental Terms & Conditions</p>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-0">© 2023 Copyright: IT Cube</div>
      </Container>
    </footer>
  );
};

export default Footer;
