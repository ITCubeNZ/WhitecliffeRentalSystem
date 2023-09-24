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

function Book(apiData) {
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

  const [bookingStatus, setBookingStatus] = useState("NoBook");
  const [firstBookSwitch, setFirstBookSwitch] = useState("NoBook");
  const [secondBookSwitch, setSecondBookSwitch] = useState("NoBook");
  const [bookingButton, setBookingButton] = useState("First Week To Add To Booking");
  const [confirmationButton, setconfirmationButton] = useState("Please Choose The First Week To Book");

  // check below if the second choice is the same as the first choice

  // below the variables are used for the first week chosen
  const [firstWeekChoice, setfirstWeekChoice] = useState([]); // this is used to display the first choice in the calendar plugin, (purple color) - const firstWeekChoiceInbetween = [[firstInbetween, secondInbetween]];  // needs to be - instead of /, otherwise the range programming is one day off
  const [firstWeekChoiceFirstDate, setFirstWeekChoiceFirstDate] = useState(""); // first date chosen in '-'
  const [firstWeekChoiceSecondDate, setFirstWeekChoiceSecondDate] = useState(""); // second date chosen

  // below the variables are used for the second week chosen
  const [secondWeekChoice, setsecondWeekChoice] = useState([]); // this is used to display the first choice in the calendar plugin, (purple color) - const secondWeekChoiceInbetween = [[firstInbetween, secondInbetween]];  // needs to be - instead of /, otherwise the range programming is one day off
  const [secondWeekChoiceFirstDate, setSecondWeekChoiceFirstDate] = useState(""); // first date chosen
  const [secondWeekChoiceSecondDate, setSecondWeekChoiceSecondDate] = useState(""); // second date chosen

  // variable below captures the date with / instead of -, so it can be checked if the user presses the second week being the same as the first week
  const [firstDateFormated, setfirstDateFormated] = useState(""); // '/' instead of '-'
  const [getThatDate, setGetThatDate] = useState("");

  // Modal Code ///////////////////////////////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal Code Datepicker Date Below ////////
  const [value1, setValue1] = useState(new DateObject()); // perhaps get date from server

  // Color For Confirm Booking Button
  const [confirmColor, setConfirmColor] = useState("primary");
  // Color for add week button
  const [addWeek, setAddWeek] = useState("warning");

  function addBookings() {
    console.log(bookingButton);
    console.log("check here");
    console.log(bookingStatus);
    const firstSelectedDateUnformat = dates[0];
    let dating = "";
    if (typeof firstSelectedDateUnformat !== "undefined") {
      dating = firstSelectedDateUnformat.format();
    }

    if (typeof firstSelectedDateUnformat === "undefined") {
      // at the first if the user has not clicked on a date
      alert("Please Choose A Week");
    } else if (dating === firstDateFormated && bookingStatus === "FirstBook") {
      // after user has clicked on one week, this pops up if they chose the same week as the second week  (getThatFormat === firstDateFormated)
      alert("You Have Already Chosen This Week, Please Choose Another");
      console.log("here1");
      console.log(firstSelectedDateUnformat.format());
    } else {
      console.log("here2");
      console.log(firstSelectedDateUnformat.format());
      const firstSelectedDateSlashed = firstSelectedDateUnformat.format();
      const secondSelectedDateUnformat = dates[1];
      const secondSelectedDateSlashed = secondSelectedDateUnformat.format();
      setfirstDateFormated(firstSelectedDateSlashed); // this capture the date in / and is used to compare it with a second date chosen
      const firstInbetween = firstSelectedDateSlashed.replaceAll("/", "-");
      const secondInbetween = secondSelectedDateSlashed.replaceAll("/", "-");

      if (bookingStatus === "SecondBook") {
        // reseting (i think)
        const resetOne = [
          ["First Week/ First Date ", "Second Date"], // needs to be - instead of /, otherwise the range programming is one day off
        ];
        const resetTwo = [
          ["Second Week/ First Date", "Second Date"], // needs to be - instead of /, otherwise the range programming is one day off
        ];
        setfirstWeekChoice(resetOne); // make this a array
        setsecondWeekChoice(resetTwo);
        setFirstWeekChoiceFirstDate("");
        setFirstWeekChoiceSecondDate("");
        setSecondWeekChoiceFirstDate("");
        setSecondWeekChoiceSecondDate("");
        console.log("SecondBook");
        setBookingStatus("NoBook");
        setFirstBookSwitch("NoBook");
        setSecondBookSwitch("NoBook");
        setBookingButton("First Week To Add To Booking");
        setconfirmationButton("Please Choose The First Week To Book");
        setConfirmColor("primary");
        setAddWeek("warning");
      } else if (bookingStatus === "FirstBook") {
        // second choice
        console.log("FirstBook");
        const secondWeekChoiceInbetween = [
          [firstInbetween, secondInbetween], // needs to be - instead of /, otherwise the range programming is one day off
        ];
        setSecondWeekChoiceFirstDate(firstInbetween);
        setSecondWeekChoiceSecondDate(secondInbetween);
        setsecondWeekChoice(secondWeekChoiceInbetween);
        setBookingStatus("SecondBook");
        setSecondBookSwitch("SecondBook");
        setBookingButton("You Have Chosen Two Weeks.  Click Here To Reset If You Want To Change Your Decision");
        setconfirmationButton("Click Here To Confirm 2 Week Booking - You May Also Reset (Button Above) To Restart");
        setConfirmColor("success");
        setAddWeek("danger");
      } else if (bookingStatus === "NoBook") {
        // first choice
        console.log("NoBook"); // might put the code below into a function
        const firstWeekChoiceInbetween = [
          [firstInbetween, secondInbetween], // needs to be - instead of /, otherwise the range programming is one day off
        ];
        setFirstWeekChoiceFirstDate(firstInbetween);
        setFirstWeekChoiceSecondDate(secondInbetween);
        setfirstWeekChoice(firstWeekChoiceInbetween);
        setBookingStatus("FirstBook");
        setFirstBookSwitch("FirstBook");
        setBookingButton("Second Week To Add To Booking");
        setconfirmationButton("Click Here To Confirm Week Booking - You May Also Choose Another Week Above");
        setConfirmColor("success");
        setAddWeek("warning");
      }
    }
  }

  // const [confirmationButton, setconfirmationButton] = useState("Please Choose The First Week To Book");
  function confirmBookingsModal() {
    if (bookingStatus === "SecondBook") {
      //alert("Two Week Booked");
      handleShow();
    } else if (bookingStatus === "FirstBook") {
      //alert("One Week Booked");
      handleShow();
    } else if (bookingStatus === "NoBook") {
      alert("You Need To Choose A Week");
    }
  }

  function reset() {
    alert("reset");
    const resetOne = [
      ["First Week/ First Date ", "Second Date"], // needs to be - instead of /, otherwise the range programming is one day off
    ];
    const resetTwo = [
      ["Second Week/ First Date", "Second Date"], // needs to be - instead of /, otherwise the range programming is one day off
    ];
    setfirstWeekChoice(resetOne); // make this a array
    setsecondWeekChoice(resetTwo);
    setFirstWeekChoiceFirstDate("");
    setFirstWeekChoiceSecondDate("");
    setSecondWeekChoiceFirstDate("");
    setSecondWeekChoiceSecondDate("");
    setBookingStatus("NoBook");
    setFirstBookSwitch("NoBook");
    setSecondBookSwitch("NoBook");
    setBookingButton("First Week To Add To Booking");
    setconfirmationButton("Please Choose The First Week To Book");
    setConfirmColor("primary");
    setAddWeek("warning");
  }

  function finalConfirmBooking() {
    handleClose();
    alert("Item Booked");
    reset();
    // API Code Confirm Code Will Be Here
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
            <Modal.Title style={{ color: "#000000" }}>Equipment Booking Details</Modal.Title>
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
            <p style={{ color: "#000000" }}>
              <b>Second Week To Book - : </b>{" "}
              {secondWeekChoice?.map((date, index) => (
                <li>
                  {date[0]} to {date[1]}
                </li>
              ))}
            </p>
            <p style={{ backgroundColor: "#212529", color: "#ffffff" }}>
              <b>Pick Up - </b>
            </p>
            <p style={{ color: "#000000" }}>
              <b>Date/Time To Pick Up - : </b>
              <DatePicker format="MM/DD/YYYY HH:mm:ss" value={value1} onChange={setValue1} plugins={[<TimePicker position="bottom" hStep={2} mStep={3} sStep={4} />]} />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={finalConfirmBooking}>
              Confirm Booking
            </Button>
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
              <b>Student Details</b>
            </td>
            <td style={{ backgroundColor: "#212529", color: "#ffffff" }}></td>
          </tr>

          <tr>
            <td>First Name</td>
            <td>{studentSQL.f_name}</td>
          </tr>

          <tr>
            <td>Last Name</td>
            <td>{studentSQL.l_name}</td>
          </tr>

          <tr>
            <td>Student ID</td>
            <td>{studentSQL.student_id}</td>
          </tr>

          <tr>
            <td>Phone</td>
            <td>{studentSQL.phone}</td>
          </tr>

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
                minDate={new DateObject().add(7, "days")} // THIS IS FOR CLIENT
                maxDate={new DateObject().add(9, "months")}
                onChange={(dateObjects, ranges) => {
                  setDates(dateObjects); // end points of range
                  setAllDates(getAllDatesInRange(dateObjects)); // all dates within range
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
                      disabled: true,
                      style: { color: "#505168" },
                      onClick: () => alert("This Week Has Been Booked"),
                    };

                  // YELLOW PENDING COLORS //////////////////////////////////////////////////
                  const monthlyPending = monthIndexPending[currentMonth.index];
                  const yellowPendingArray = indexCalendarColoring(monthlyPending);
                  if (yellowPendingArray)
                    return {
                      disabled: true,
                      style: { color: "#ffca00" },
                      onClick: () => alert("This Week Has Been Booked And Waiting For Tutor Approval"),
                    };

                  // RED OVERDUE COLORS /////////////////////////////////////////////////
                  const monthlyOverdue = monthIndexOverdue[currentMonth.index];
                  const isRedOverdue = indexCalendarColoring(monthlyOverdue);
                  if (isRedOverdue)
                    return {
                      disabled: true,
                      style: { color: "#fe3f24" },
                      onClick: () => alert("The Item is Overdue - Check with administration"),
                    };

                  // FIRST WEEK //////////////////////////////////////  breakpoint
                  let firstDateReservedOne = selectedDate[0]?.format();
                  let firstDateReservedTwo = selectedDate[1]?.format();
                  console.log(firstDateReservedOne);
                  console.log(firstDateReservedTwo);

                  if (firstBookSwitch === "FirstBook") {
                    console.log("working");
                    const firstWeekChoiceRange = getDatesArray(firstWeekChoice);
                    const firstWeekChoiceRangeArray = firstWeekChoiceRange.flat(2); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.  Array of Arrays to one array.  https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
                    const firstWeekChoiceArray = indexBooking(firstWeekChoiceRangeArray);
                    console.log(firstWeekChoiceArray);
                    const firstWeek = firstWeekChoiceArray[currentMonth.index];
                    const isfirstWeek = indexCalendarColoring(firstWeek);
                    if (isfirstWeek)
                      return {
                        disabled: true,
                        style: { color: "#67032f" }, //"#fe3f24"
                        onClick: () => alert("First Week Chosen, You Can Choose Another Week"),
                      };
                  }

                  if (secondBookSwitch === "SecondBook") {
                    console.log("working");
                    const secondWeekChoiceRange = getDatesArray(secondWeekChoice);
                    const secondWeekChoiceRangeArray = secondWeekChoiceRange.flat(2); //The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.  Array of Arrays to one array.  https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
                    const secondWeekChoiceArray = indexBooking(secondWeekChoiceRangeArray);
                    console.log(secondWeekChoiceArray);
                    const secondWeek = secondWeekChoiceArray[currentMonth.index];
                    const issecondWeek = indexCalendarColoring(secondWeek);
                    if (issecondWeek)
                      return {
                        disabled: true,
                        style: { color: "#67032f" }, //"#fe3f24"
                        onClick: () => alert("Second Week Chosen"),
                      };
                  }

                  return props;
                }}
              />
            </td>
          </tr>

          <tr>
            <td>First Week Chosen -</td>
            <td>
              {firstWeekChoice?.map((date) => (
                <li>
                  {date[0]} to {date[1]}
                </li>
              ))}
            </td>
          </tr>

          <tr>
            <td>Second Week Chosen -</td>
            <td>
              {secondWeekChoice?.map((date, index) => (
                <li>
                  {date[0]} to {date[1]}
                </li>
              ))}
            </td>
          </tr>

          <tr>
            <td>Add The Above Week To Booking</td>
            <td>
              <Button variant={addWeek} onClick={addBookings}>
                {bookingButton}
              </Button>{" "}
            </td>
          </tr>

          <tr>
            <td>Confirm Booking</td>
            <td>
              <Button variant={confirmColor} onClick={confirmBookingsModal}>
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
                onClick={reset}
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

export default Book;

/*import React from "react";

const Book = () => {
  return (
    <div>
      <h1>Booking Page</h1>
    </div>
  );
};

export default Book;*/
