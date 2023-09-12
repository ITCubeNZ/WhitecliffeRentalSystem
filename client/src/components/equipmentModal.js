import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EquipmentModal({data1}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);     
  const spareArray = [];
  const colorArray = [];
  if (data1.rental_status === "avaliable"){
    //console.log("FIRST-" + data1.rental_status);
    //spareArray.push("Free To Book ------");
    spareArray.push("Free To Book ----- Click Here To Book Now");
    colorArray.push("success");
    //("Free To Book");
    //console.log(spareArray);
} else if (data1.rental_status === "booked") {
    //console.log("SECOND-" + data1.rental_status);
    //spareArray.push("Currently Booked -");
    spareArray.push("Currently Booked -- Click Here To Reserve");
    colorArray.push("primary");
    //("Booked");
} else if (data1.rental_status === "pending"){
    //console.log("THIRD-" + data1.rental_status);
    //spareArray.push("Booking Pending -");
    spareArray.push("Approval Pending -- Click Here To Reserve");
    colorArray.push("warning");
    //("Pending Booking");
  } else if (data1.rental_status === "overdue"){
    //console.log("THIRD-" + data1.rental_status);
    spareArray.push("Item Overdue ------ Click Here To Reserve");
    colorArray.push("danger");
    //("Pending Booking");
} else {
    //("Check With Administration");
    console.log("something has gone wrong/Modal");
    spareArray.push("--------- Contact Adminstration ---------");
    colorArray.push("dark");
};

  return (
    <>
        <Button variant={colorArray[0]} onClick={handleShow} >
                  {spareArray[0]}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Equipment Details</Modal.Title>
          </Modal.Header>
        <Modal.Body>

          <p >
            <b>Name: </b>{data1.name}
          </p>
          <p >
            <b>Description: </b> {data1.description}
          </p>
          <p >
            <b>Location: </b> {data1.location}
          </p>
          <p >
            <b>Rental Status: </b> {data1.rental_status}
          </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}

export default EquipmentModal;