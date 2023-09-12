import * as React from "react";
import Table from "react-bootstrap/Table";
import EquipmentModal from "./EquipmentModal";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../styles.css";

function EquipmentTable() {
  // function EquipmentTable(apiData) { //how to take data from another page
  /* This will probably be from the main page
    useEffect(() => {
      setData(data);
    }, []);

    function fetchData(){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=fa51d7d0a04b3ca2bff7a13a3863f53e&units=metric`)
            .then((response) => response.json())
            .then((data) => setData(data));};

    useEffect(() => {
      fetchData();
    }, []); 
    */
  // apidata template data below ///////////////////////////

  const data = [
    {
      item_id: 1,
      name: "Green Screen",
      description: "Awesome projector",
      code: 1,
      replacement_cost: 100.0,
      "purchase year": 10101999,
      status: 0,
      location: "Manakau Campus, Art Department",
      last_updated: 10 - 10 - 99,
      rental_status: "pending",
    },
    {
      item_id: 2,
      name: "Blue Screen",
      description: "Alright projector",
      code: 2,
      replacement_cost: 50.0,
      "purchase year": 10102023,
      status: 0,
      location: "Christchurch Campus, Media Department",
      last_updated: 10101999,
      rental_status: "pending",
    },
    {
      item_id: 3,
      name: "Yellow Camera",
      description: "Camera",
      code: 3,
      replacement_cost: 250.0,
      "purchase year": 11102023,
      status: 0,
      location: "Christchurch Campus, Media Department",
      last_updated: 10101999,
      rental_status: "booked",
    },
    {
      item_id: 4,
      name: "Red Camera",
      description: "Camera",
      code: 4,
      replacement_cost: 350.0,
      "purchase year": 11102023,
      status: 0,
      location: "Manakau Campus, Media Department",
      last_updated: 10101999,
      rental_status: "avaliable",
    },
    {
      item_id: 5,
      name: "Purple Camera",
      description: "Camera",
      code: 4,
      replacement_cost: 350.0,
      "purchase year": 11102023,
      status: 0,
      location: "Manakau Campus, Media Department",
      last_updated: 10101999,
      rental_status: "overdue",
    },
    {
      item_id: 6,
      name: "Multi-color Camera",
      description: "Camera",
      code: 4,
      replacement_cost: 350.0,
      "purchase year": 12102023,
      status: 0,
      location: "Manakau Campus, Art Department",
      last_updated: 11101999,
      rental_status: "avaliable",
    },
    {
      item_id: 7,
      name: "Black Camera",
      description: "Camera",
      code: 4,
      replacement_cost: 350.0,
      "purchase year": 12102023,
      status: 0,
      location: "Manakau Campus, Art Department",
      last_updated: 11101999,
      rental_status: "avaliable",
    },
    {
      item_id: 8,
      name: "Grey Camera",
      description: "Camera",
      code: 4,
      replacement_cost: 350.0,
      "purchase year": 12102023,
      status: 0,
      location: "Manakau Campus, Art Department",
      last_updated: 11101999,
      rental_status: "pending",
    },
  ];

  //const apiData = { apiData: [data] };
  const apiData = { apiData: data };
  // console.log("first");
  // console.log(apiData);

  // apidata template data above ///////////////////////////

  //// equipmentTable code below ////////////////////
  // original data from api fetch
  const [dataSet, setData] = useState(apiData);
  // data1 to populate table
  const [data1, setData1] = useState(dataSet);

  // variable for location
  const [varLocation, setVarLocation] = useState(null);

  // variable for booking status
  const [varBooking, setVarBooking] = useState(null);

  // variable for location search dropdown
  const [dropdownLocation, setdropdownLocation] = useState("All Locations");

  // variable for status search dropdwon
  const [dropdownBooking, setdropdownBooking] = useState("All Current Status");

  const [data2, setData2] = useState(apiData);

  // INTIAL POPULATION BELOW //////////////////////////////////////////////////////////////////
  //// code below to populate location dropdown ///////////////
  // just grab locations into locationArray
  const inilocationArray = data2.apiData.map(({ location }) => location);
  // get rid of duplicates
  const iniuniqueLocationArray = inilocationArray.filter((val, id, array) => array.indexOf(val) === id);
  // alphabetically the array
  iniuniqueLocationArray.sort((a, b) => a.localeCompare(b));
  //newMenuItems.sort((a, b) => a.name.localeCompare(b.name));  // maybe have another array or variablbe, since console logs show that it continually repeating.
  // variable for location dropdwon
  const [varLocationDropdown, setVarLocationDropdown] = useState(iniuniqueLocationArray);
  //
  //// equipmentDropdownLocation code above ////////////////////

  //// code below to populate status dropdown ///////////////
  // just grab locations into statusArray
  const inistatusArray = data2.apiData.map(({ rental_status }) => rental_status);
  // get rid of duplicates
  const iniuniqueStatusArray = inistatusArray.filter((val, id, array) => array.indexOf(val) === id);
  // alphabetically the array
  iniuniqueStatusArray.sort((a, b) => a.localeCompare(b));
  // variable for status dropdown
  const iniuniqueStatusArray3 = [];
  iniuniqueStatusArray.map((datas) => {
    if (datas === "avaliable") {
      iniuniqueStatusArray3.avaliable = "Free To Book";
    } else if (datas === "booked") {
      iniuniqueStatusArray3.booked = "Booked";
    } else if (datas === "overdue") {
      iniuniqueStatusArray3.overdue = "Overdue";
    } else if (datas === "pending") {
      iniuniqueStatusArray3.pending = "Approval Booking Pending";
    } else {
      iniuniqueStatusArray3.CheckAdministration = "Check Administration";
      console.log("Something as gone wrong with booking status of object");
    }
  });
  const [varStatusDropdown, setVarStatusDropdown] = useState(iniuniqueStatusArray3);
  //newMenuItems.sort((a, b) => a.name.localeCompare(b.name));  // maybe have another array or variablbe, since console logs show that it continually repeating.
  //// equipmentDropdownStatus code above ///////////////////////////////////////////////////////

  //reset everything function /////////////////
  function buttonReset() {
    setData1(dataSet);
    setVarLocation(null);
    setVarBooking(null);
    setdropdownLocation("All Locations");
    setdropdownBooking("All Current Status");
    repopulateDropdowns("reset");
    //handleShowStatus();  // test this
  }
  //// equipmentTable code above ////////////////////

  function repopulateDropdowns(incomingData) {
    // INTIAL POPULATION BELOW ///////////////////////////////////////////
    const result = { apiData: [] };
    if (incomingData === "reset") {
      setVarStatusDropdown(iniuniqueStatusArray3);
      setVarLocationDropdown(iniuniqueLocationArray);
    } else if (incomingData.location) {
      //handleCloseLocation();    // disable dropdown
      dataSet.apiData.forEach(function (item, index) {
        // use original data not data1, data1 information is delayed
        if (item.location === incomingData.location) {
          // DONt NOT USE - if (item.location === varLocation){ - IT DELAYS IT, setstate performed after function
          result.apiData.push(item);
        }
      });
      // just grab status into statusArray
      const statusArray = result.apiData.map(({ rental_status }) => rental_status);
      // get rid of duplicates
      const uniqueStatusArray = statusArray.filter((val, id, array) => array.indexOf(val) === id);
      // alphabetically the array
      uniqueStatusArray.sort((a, b) => a.localeCompare(b));
      const uniqueStatusArray3 = [];
      uniqueStatusArray.map((datas) => {
        if (datas === "avaliable") {
          uniqueStatusArray3.avaliable = "Free To Book";
        } else if (datas === "booked") {
          uniqueStatusArray3.booked = "Booked";
        } else if (datas === "overdue") {
          uniqueStatusArray3.overdue = "Overdue";
        } else if (datas === "pending") {
          uniqueStatusArray3.pending = "Approval Booking Pending";
        } else {
          uniqueStatusArray3.CheckAdministration = "Check Administration";
          console.log("Something as gone wrong with booking status of object");
        }
      });
      setVarStatusDropdown(uniqueStatusArray3);
    } else {
      console.log("Got To End Of repopulate dropdowns");
    }
  }

  function repopulate(incomingData) {
    console.log("repopulate");
    const result = { apiData: [] };
    //// location below //////////////////////////////////////////////////////////////////
    if (incomingData.location) {
      console.log("---LOCATION---");
      setVarLocation(incomingData.location); // CHECK THIS
      setdropdownBooking("Current Location Status Options");
      if (incomingData.location === null && varBooking === null) {
        setData1(dataSet);
      } else if (varBooking === null) {
        console.log("working");
        dataSet.apiData.forEach(function (item, index) {
          if (item.location === incomingData.location) {
            // DONt NOT USE - if (item.location === varLocation){ - IT DELAYS IT, setstate performed after function
            result.apiData.push(item); // having the apiData,, wird object array combo
          }
        });
        setData1(result);
      } else if (varLocation === null) {
        // this for when the location is reset but still need status information
        dataSet.apiData.forEach(function (item, index) {
          if (item.location === incomingData.location) {
            // DONt NOT USE - if (item.location === varLocation){ - IT DELAYS IT, setstate performed after function
            result.apiData.push(item);
          }
        });
        setData1(result);
      } else if (incomingData.location !== null && varBooking !== null) {
        dataSet.apiData.forEach(function (item, index) {
          if (item.location === incomingData.location) {
            // DONt NOT USE - if (item.location === varLocation){ - IT DELAYS IT, setstate performed after function
            result.apiData.push(item);
          }
        });
        setData1(result);
      } else {
        setData1(dataSet);
        //mabye have a modal pop up, saying found nothing
      }

      //// status below //////////////////////////////////////////////////////////////////
    } else if (incomingData.status) {
      console.log("---STATUS---");
      setVarBooking(incomingData.status);
      //setVarBooking("Current Location Booking Status");
      if (incomingData.status === null && varLocation === null) {
        setData1(dataSet);
      } else if (varLocation === null) {
        dataSet.apiData.forEach(function (item, index) {
          if (item.rental_status === incomingData.status) {
            // DO NOT USE - if (item.location === varLocation){ - IT DELAYS IT, setstate performed after function
            result.apiData.push(item); // having the apiData,, wird object array combo
          }
        });
        setData1(result);
      } else if (varLocation !== null && incomingData.status !== null) {
        console.log("working");
        console.log(incomingData.status);
        console.log(varLocation);
        dataSet.apiData.forEach(function (item, index) {
          if (item.location === varLocation && item.rental_status === incomingData.status) {
            // DONt NOT USE - if (item.location === varLocation){ - IT DELAYS IT, setstate performed after function
            result.apiData.push(item);
          }
        });
        console.log(result);
        setData1(result);
      } else {
        setData1(dataSet);
        console.log("working");
        //mabye have a modal pop up, saying found nothing
      }
    } else {
      console.log("something has gone wrong - repopulate function");
      console.log(dataSet);
    }
    repopulateDropdowns(incomingData);
  }

  const width_proportion = "80%";
  const marginStuff = "auto";
  const whiteColor = "#ffffff";
  const radiusVar = "6px";
  const styles = {
    box: {
      margin: marginStuff,
      width: width_proportion,
    },
    title: {
      color: whiteColor,
    },
    radius: radiusVar,
  };

  return (
    <div style={styles.box}>
      <h1 style={styles.title}>Equipment Available</h1>
      <br></br>
      <div className="columnLeft">
        <DropdownButton variant="success" id="dropdown-basic-button" title={dropdownLocation}>
          {varLocationDropdown.map((datas) => {
            return (
              <Dropdown.Item
                key={"arbitary1" + datas}
                onClick={() => {
                  repopulate({ location: datas });
                  setdropdownLocation(datas);
                }}
                value={datas}
              >
                {datas}
              </Dropdown.Item>
            );
          })}
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => buttonReset()}>Reset</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="columnLeft">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <div className="columnLeft">
        <DropdownButton variant="success" id="dropdown-basic-button" title={dropdownBooking}>
          {Object.entries(varStatusDropdown).map(([key, value]) => {
            return (
              <Dropdown.Item
                key={"arbitary2" + value}
                onClick={() => {
                  repopulate({ status: key });
                  setdropdownBooking("Current Location Status Options");
                }}
                value={key}
              >
                {value}
              </Dropdown.Item>
            );
          })}
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => buttonReset()}>Reset</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="columnLeft">&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <Button variant="success" onClick={() => buttonReset()}>
        Reset Search
      </Button>

      <br></br>
      <br></br>
      <Table
        bordered
        hover
        style={{
          borderCollapse: "collapsed",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>#</b>
            </th>
            <th style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Item</b>
            </th>
            <th style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Location</b>
            </th>
            <th style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Current Status/To Book</b>
            </th>
          </tr>
        </thead>
        <tbody>
          {data1.apiData?.map((datas) => {
            return (
              <tr key={"arbitary3" + datas.item_id}>
                <td>{datas.item_id}</td>
                <td>{datas.name}</td>
                <td>{datas.location}</td>
                <td>
                  <EquipmentModal data1={datas}></EquipmentModal>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}

export default EquipmentTable;
