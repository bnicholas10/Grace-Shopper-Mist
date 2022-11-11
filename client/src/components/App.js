import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Games from "./Games";
import GamesForm from "./GamesForm";
import Home from "./Home";
import UserProfile from "./UserProfile";
//import Routines from "./Routines";
//import MyRoutines from "./MyRoutines";
//import RoutinesForm from "./RoutinesForm";

const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const validToken = localStorage.getItem("token");
    if (validToken) setIsLoggedIn(true);
  }, []);

  return (
    <BrowserRouter>
      <>
        <h1>Mist: Your One Stop Shop For All Things Games</h1>
        <div id="navbar">
          <Link to="/Home">Homepage</Link>
          <Link to="/Games">Game List</Link>
          {/* <Link to="/Routines">Routine List</Link> */}
          <Link to="/UserProfile">User Profile/Cart </Link>
        </div>
        <Routes>
          <Route
            path="/UserProfile"
            element={
              isLoggedIn ? <UserProfile /> : <p>Log In to See Profile/Cart</p>
            }
          />
          <Route path="/games" element={<Games />} />
          {/* <Route path="Routines" element={<Routines />} /> */}
          <Route
            path="Home"
            element={
              <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/GamesForm"
            element={isLoggedIn ? <GamesForm /> : <p>Log In to Add New Game</p>}
          />
          {/* <Route
            path="/RoutinesForm"
            element={
              isLoggedIn ? (
                <RoutinesForm />
              ) : (
                <p>Log In to Create New Routine</p>
              )
            }
          /> */}
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
