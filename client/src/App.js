import { useState, createContext } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Home from "./components/Home";
import Login from "./components/Login";
import StudentDashBoard from "./components/StudentDashBoard";
import Book from "./components/Book";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EquipmentTable from "./components/EquipmentTable";

export const UserContext = createContext();

function App() {
  useMsalAuthentication(InteractionType.Popup);
  const [user, setUser] = useState("");

  function Render() {
    const { accounts } = useMsal();

    try {
      const username = accounts[0].username;
      setUser(username);
    } catch (e) {}
  }
  if (user !== "")
    return (
      <div className="App">
        <UserContext.Provider value={user}>
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <Header />
            <div className="flexs">
              {/* <hi className="mx-auto">Hello {user}</hi>  */}
              <Container>
                <Routes>
                  {/* <Route path="/" element={<EquipmentTable />}></Route> */}
                  <Route path="/book" element={<Book />}></Route>
                  <Route path="/dashboard" element={<StudentDashBoard />}></Route>
                </Routes>
              </Container>
            </div>
            <Footer />
          </AuthenticatedTemplate>
        </UserContext.Provider>
      </div>
    );
  else
    return (
      <>
        {Render()}
        <Login />
      </>
    );
}

export default App;
