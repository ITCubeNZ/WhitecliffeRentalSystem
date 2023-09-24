import * as React from "react";
import "../styles.css";
import DatePicker, { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import { useState, useEffect } from "react";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Button from "react-bootstrap/Button";
import "react-multi-date-picker/styles/backgrounds/bg-gray.css";
import Modal from "react-bootstrap/Modal";
import "../green.css";
import "../styles.css";

// object {}
// array []

function BookingForStudent(apiData) {
  // student SQL // Student API here
  const studentSQL = {
    student_id: 12346,
    f_name: "Biblo",
    l_name: "Baggins",
    degree: "Software",
    whitecliffe_id: 123,
    username: "Billy",
    password: "TheOneRing",
    phone: 5556325,
    email: "bbaggins@hotmail.com",
    last_updated: 20230906,
  };

  // item SQL // Item API here
  const itemSQL = {
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
  };

  // rental SQL  This record to be made
  /*
const rentalSQL =
  [
  {
    "rental_id":  ,
    "student_id":  ,
    "staff_id":  ,
    "item_id":  ,
    "approved":  ,
    "rental_date":  ,
    "return_date":  ,
    "return_condition:  ,
    "last_updated": 
  }
  ]
*/
  // staff SQL

  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };

  const getDatesArray = (arraySQL) => {
    const SQLRange = [];
    for (let i = 0; i < arraySQL.length; i++) {
      const RangeUnArray = [];
      const range = dateRange(new Date(arraySQL[i][0]), new Date(arraySQL[i][1]));
      console.log(arraySQL.length);
      console.log(i);
      console.log(range);
      console.log(range.map((date) => date.toISOString().slice(0, 10)));
      RangeUnArray.push(range.map((date) => date.toISOString().slice(0, 10)));
      SQLRange.push(RangeUnArray);
    }
    return SQLRange;
  };

  const indexBooking = (rangeArray) => {
    const indexBooked = {
      // booked
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
    };
    console.log(indexBooked);
    console.log(indexBooked[1]);
    for (let i = 0; i < rangeArray.length; i++) {
      const [year, month, day] = rangeArray[i].split("-");
      var year1 = Number(year);
      var month1 = Number(month);
      var day1 = Number(day);
      console.log(month1);
      for (let i = 0, y = 1; i < 12; i++, y++) {
        if (month1 === y) {
          //console.log("trial");
          //alert(month1);
          //alert(i);
          console.log(month1);
          console.log(i);
          indexBooked[i].push(day1);
        }
      }
    }
    return indexBooked;
  };

  // start - booked SQL ////////////////////////////////////////////////////////////////////////////////////////////////////
  const bookedSQL = [
    ["2023-09-24", "2023-09-30"],
    ["2023-10-01", "2023-10-07"],
    ["2023-11-12", "2023-11-18"], // needs to be - instead of /, otherwise the range programming is one day off
  ];
  const bookedRange = getDatesArray(bookedSQL);
  const bookedRangeArray = bookedRange.flat(2); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.  Array of Arrays to one array.  https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
  const monthIndexBooked = indexBooking(bookedRangeArray);
  console.log(monthIndexBooked);
  // end - booked SQL ////////////////////////////////////////////////////////////////////////////////////////////////////

  // pending SQL ////////////////////////////////////////////////////////////////////////////////////////////////////
  const pendingSQL = [
    ["2023-10-15", "2023-10-21"],
    ["2023-12-10", "2023-12-16"], // one off
  ];
  const pendingRange = getDatesArray(pendingSQL);
  const pendingRangeArray = pendingRange.flat(2); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.  Array of Arrays to one array.  https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
  const monthIndexPending = indexBooking(pendingRangeArray);
  console.log(monthIndexPending);
  // pending SQL ////////////////////////////////////////////////////////////////////////////////////////////////////
  // overdue SQL /////////////////////////////////////////////////////////////////////
  const overdueSQL = [
    ["2023-10-22", "2023-10-28"],
    ["2023-11-19", "2023-11-25"],
    ["2023-12-24", "2023-12-30"],
  ];
  const overdueRange = getDatesArray(overdueSQL);
  const overdueRangeArray = overdueRange.flat(2); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.  Array of Arrays to one array.  https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
  console.log("hereeee");
  console.log(overdueRangeArray);
  const monthIndexOverdue = indexBooking(overdueRangeArray);
  console.log(monthIndexOverdue);
  // overdue SQL /////////////////////////////////////////////////////////////////////

  const [dataStudent, setData] = useState("hello");
  const [value, setValue] = useState(new DateObject()); // perhaps get date from server

  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);

  //const [firstBookSwitch, setFirstBookSwitch] = useState("NoBook");
  //const [secondBookSwitch, setSecondBookSwitch] = useState("NoBook");
  //const [bookingButton, setBookingButton] = useState("First Week To Add To Booking");

  const [addingButton, setAddingButton] = useState("Confirm The Above Week");
  const [confirmationButton, setconfirmationButton] = useState("Confirm The Above Week Booking");

  // check below if the second choice is the same as the first choice

  const [bookingStatus, setBookingStatus] = useState("First");
  const [addWeekStatus, setAddWeekStatus] = useState("1st");

  // below the variables are used for the first week chosen
  const [firstWeekChoice, setfirstWeekChoice] = useState([]); // this is used to display the first choice in the calendar plugin, (purple color) - const firstWeekChoiceInbetween = [[firstInbetween, secondInbetween]];  // needs to be - instead of /, otherwise the range programming is one day off
  //const [firstWeekChoiceFirstDate, setFirstWeekChoiceFirstDate] = useState("");  // first date chosen in '-'
  //const [firstWeekChoiceSecondDate, setFirstWeekChoiceSecondDate] = useState("");  // second date chosen

  // Modal Code ///////////////////////////////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal Code Datepicker Date Below ////////
  const [value1, setValue1] = useState(new DateObject()); // perhaps get date from server

  // Color for add week button
  const [addWeekColor, setAddWeekColor] = useState("primary");
  // Color For Confirm Booking Button
  const [confirmColor, setConfirmColor] = useState("primary");

  function addWeek() {
    if (addWeekStatus === "2nd") {
      const firstSelectedDateUnformat = dates[0];
      const firstSelectedDateSlashed = firstSelectedDateUnformat.format();
      const secondSelectedDateUnformat = dates[1];
      const secondSelectedDateSlashed = secondSelectedDateUnformat.format();
      const firstInbetween = firstSelectedDateSlashed.replaceAll("/", "-");
      const secondInbetween = secondSelectedDateSlashed.replaceAll("/", "-");
      const firstWeekChoiceInbetween = [
        [firstInbetween, secondInbetween], // needs to be - instead of /, otherwise the range programming is one day off
      ];
      setfirstWeekChoice(firstWeekChoiceInbetween);
      setConfirmColor("success");
      setBookingStatus("Second");
    } else {
      alert("Please Choose A Week");
    }
  }

  function confirmBooking() {
    if (bookingStatus === "Second") {
      handleShow();
      setBookingStatus();
    } else {
      alert("Please Confirm A Week");
    }
  }

  function resetStuff() {
    if (addWeekStatus === "1st") {
      setAddWeekColor("primary");
      setConfirmColor("primary");
      setBookingStatus();
    } else {
      setAddWeekColor("warning");
      setConfirmColor("primary");
      setBookingStatus();
    }
  }

  function CustomRangeInput({ onFocus, value, separator }) {
    let values = value.split(separator);
    let from = values[0] || ""; // start of week
    let to = values[1] || ""; // end of week or 2 weeks
    value = from && to ? from + " - " + to : from;

    return <input onFocus={onFocus} value={value} readOnly />;
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
    //backgroundcolor: backGroundColorBlack
  };

  //firstWeekChoiceFirstDate
  //firstWeekChoiceSecondDate
  //firstWeekChoice

  //secondWeekChoiceFirstDate
  //secondWeekChoiceSecondDate
  //secondWeekChoice

  //style={styles.box}
  return (
    <div style={styles.box}>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Equipment Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Item Details - </b>
            </p>
            <p style={{ color: "#000000" }}>
              <b>Item Name: </b> {itemSQL.name}
            </p>
            <p style={{ color: "#000000" }}>
              <b>Item ID: </b> {itemSQL.item_id}
            </p>
            <p style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Booked For - </b>
            </p>
            <p style={{ color: "#000000" }}>
              <b>Name: </b> {studentSQL.f_name} {studentSQL.l_name}
            </p>
            <p style={{ color: "#000000" }}>
              <b>Student ID: </b> {studentSQL.student_id}
            </p>
            <p style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Weeks Booked - </b>
            </p>
            <p style={{ color: "#000000" }}>
              <b>First Week To Book - : </b>{" "}
              {firstWeekChoice?.map((date) => (
                <li>
                  {date[0]} to {date[1]}
                </li>
              ))}
            </p>

            <p style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Pick Up - </b>
            </p>
            <p>
              <b>Date/Time To Pick Up - : </b>
              <DatePicker format="MM/DD/YYYY HH:mm:ss" value={value1} onChange={setValue1} plugins={[<TimePicker position="bottom" hStep={2} mStep={3} sStep={4} />]} />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success">Confirm Booking</Button>
          </Modal.Footer>
        </Modal>
      </>

      <h1 style={styles.title}>Equipment Available</h1>

      <br></br>
      <br></br>

      <table className="table" style={styles.box} bordered hover>
        <tbody>
          <tr>
            <td style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Item Details</b>
            </td>
            <td style={{ backgroundColor: "#212529", color: "#ffffff" }}></td>
          </tr>

          <tr>
            <td>item_id</td>
            <td>{itemSQL.item_id}</td>
          </tr>

          <tr>
            <td>Name</td>
            <td>{itemSQL.name}</td>
          </tr>

          <tr>
            <td>Description</td>
            <td>{itemSQL.description}</td>
          </tr>

          <tr>
            <td style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Booking</b>
            </td>
            <td style={{ backgroundColor: "#212529", color: "#ffffff" }}></td>
          </tr>

          <tr>
            <td>Choose Week Here - </td>
            <td>
              <DatePicker
                className="green"
                value={value}
                range // makes the choice in range
                render={<CustomRangeInput />}
                weekPicker // limits range weekly
                minDate={new DateObject().subtract(3, "months")} // THIS IS FOR CLIENT
                maxDate={new DateObject().add(9, "months")}
                onChange={(dateObjects, ranges) => {
                  setDates(dateObjects); // end points of range
                  setAllDates(getAllDatesInRange(dateObjects)); // all dates within range
                  setAddWeekColor("warning");
                  setAddWeekStatus("2nd");
                }}
                // when getting the api data, makes sure it is only within a year, because you can't put current year in the calendar
                mapDays={({ date, today, selectedDate, currentMonth, isSameDate }) => {
                  let props = {};
                  props.style = {
                    borderRadius: "10px",
                  };

                  const indexCalendarColoring = (monthlyColors) => {
                    let isArray = [];
                    for (let i = 0; i < monthlyColors.length; i++) {
                      const y = monthlyColors[i];
                      //if ([y].includes(date.day)) props.style.color = "#505168";  // red color "#fe3f24"  grey/green color "#3C493F" probalby don't need this because of disabled function below
                      isArray.push(y); // isGreyBookedArray this returns single numbers, [8,9,10,11,12,13,14]
                    }
                    let isFinishBooked = isArray.includes(date.day); // this returns true or false
                    return isFinishBooked;
                  };

                  //GREEN AVALIABLE COLORS - this makes everything green, the next function fill in the red and yellow colors
                  for (let i = 0; i < 32; i++) {
                    if ([i].includes(date.day)) props.style.color = "#00b093"; // green
                  }

                  // GREY BOOKED COLORS ///////////////////////////////////////////////
                  const monthlyBooked = monthIndexBooked[currentMonth.index];
                  const isGreyBooked = indexCalendarColoring(monthlyBooked);
                  if (isGreyBooked)
                    return {
                      //disabled: true,
                      style: { color: "#505168" },
                      onClick: () => alert("This Week Has Been Booked"),
                    };

                  // YELLOW PENDING COLORS //////////////////////////////////////////////////
                  const monthlyPending = monthIndexPending[currentMonth.index];
                  const yellowPendingArray = indexCalendarColoring(monthlyPending);
                  if (yellowPendingArray)
                    return {
                      //disabled: true,
                      style: { color: "#ffca00" },
                      onClick: () => alert("This Week Has Been Booked And Waiting For Tutor Approval"),
                    };

                  // RED OVERDUE COLORS /////////////////////////////////////////////////
                  const monthlyOverdue = monthIndexOverdue[currentMonth.index];
                  const isRedOverdue = indexCalendarColoring(monthlyOverdue);
                  if (isRedOverdue)
                    return {
                      //disabled: true,
                      style: { color: "#fe3f24" },
                      onClick: () => alert("The Item is Overdue - Check with administration"),
                    };

                  // FIRST WEEK //////////////////////////////////////  breakpoint
                  let firstDateReservedOne = selectedDate[0]?.format();
                  let firstDateReservedTwo = selectedDate[1]?.format();
                  console.log(firstDateReservedOne);
                  console.log(firstDateReservedTwo);

                  return props;
                }}
              />
            </td>
          </tr>

          <tr>
            <td>Week Chosen -</td>
            <td>
              {firstWeekChoice?.map((date) => (
                <li>
                  {date[0]} to {date[1]}
                </li>
              ))}
            </td>
          </tr>

          <tr>
            <td>Confirm Week</td>
            <td>
              <Button variant={addWeekColor} onClick={addWeek}>
                {addingButton}
              </Button>{" "}
            </td>
          </tr>

          <tr>
            <td>Confirm Booking</td>
            <td>
              <Button variant={confirmColor} onClick={confirmBooking}>
                {confirmationButton}
              </Button>{" "}
            </td>
          </tr>

          <tr>
            <td>Reset Booking</td>
            <td>
              <Button
                variant="danger 
              "
                onClick={resetStuff}
              >
                Reset Bookings
              </Button>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookingForStudent;
