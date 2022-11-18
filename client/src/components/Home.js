import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
// import { login, register } from "./api/index"; //revisit where this lives

const Home = (props) => {
  const { user } = props;
  // useEffect(() => {
  //   const getToken = localStorage.getItem("token") ? true : false;
  //   console.log("is user logged in:", getToken);
  //   setIsLoggedIn(getToken);
  // }, []);

  return (
    <div id="home">
      <p id="homeMessage">Mist: Your One Stop Shop For All Things Games</p>
      {user && <p id="homeUser">Logged in as: {user.username}</p>}
      <p id="signature">
        Created By: Bernie Pereda, Devin Dodd, Diana Clemente, and Brett
        Nicholas
      </p>
    </div>
  );
};
export default Home;
