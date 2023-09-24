import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function EquipmentModal({ data1 }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const spareArray = [];
  const colorArray = [];
  const loanStatus = [];

  if (data1.rental_status === "avaliable") {
    //console.log("FIRST-" + data1.rental_status);
    //spareArray.push("Free To Book ------");
    spareArray.push("Free To Book ----- Click Here To Book Now");
    colorArray.push("success");
    loanStatus.push("Free To Book");
    //("Free To Book");
    //console.log(spareArray);
  } else if (data1.rental_status === "booked") {
    //console.log("SECOND-" + data1.rental_status);
    //spareArray.push("Currently Booked -");
    spareArray.push("Currently Booked -- Click Here To Reserve");
    colorArray.push("primary");
    loanStatus.push("Currently Booked - Reserve Avaliable");
    //("Booked");
  } else if (data1.rental_status === "pending") {
    //console.log("THIRD-" + data1.rental_status);
    //spareArray.push("Booking Pending -");
    spareArray.push("Approval Pending -- Click Here To Reserve");
    colorArray.push("warning");
    loanStatus.push("Approval Pending - Reserve Avaliable");
    //("Pending Booking");
  } else if (data1.rental_status === "overdue") {
    //console.log("THIRD-" + data1.rental_status);
    spareArray.push("Item Overdue ------ Click Here To Reserve");
    colorArray.push("danger");
    loanStatus.push("Item Overdue - Reserve Avaliable");
    //("Pending Booking");
  } else {
    //("Check With Administration");
    console.log("something has gone wrong/Modal");
    spareArray.push("--------- Contact Adminstration ---------");
    colorArray.push("dark");
    loanStatus.push("- Contact Adminstration -");
  }

  return (
    <>
      <Button variant={colorArray[0]} onClick={handleShow}>
        {spareArray[0]}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000000" }}>Equipment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "#000000" }}>
            <b>Name: </b>
            {data1.name}
          </p>
          <p style={{ color: "#000000" }}>
            <b>Description: </b> {data1.description}
          </p>
          <p style={{ color: "#000000" }}>
            <b>Location: </b> {data1.location}
          </p>
          <p style={{ color: "#000000" }}>
            <b>Loan Status: </b> {loanStatus[0]}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Book This Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EquipmentModal;
