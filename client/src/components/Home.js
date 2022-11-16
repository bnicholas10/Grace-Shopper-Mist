import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
// import { login, register } from "./api/index"; //revisit where this lives

const Home = (props) => {
  // useEffect(() => {
  //   const getToken = localStorage.getItem("token") ? true : false;
  //   console.log("is user logged in:", getToken);
  //   setIsLoggedIn(getToken);
  // }, []);

  return (
    <div id="home">
      <p id="homeMessage">Mist: Your One Stop Shop For All Things Games</p>
      <div id="homeNavBar">
        <Link to={"/login"}>Log In</Link>
        <Link to={"/games"} id="homeGamesButton">
          Games
        </Link>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};
export default Home;
