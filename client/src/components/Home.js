import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
// import { login, register } from "./api/index"; //revisit where this lives

const Home = (props) => {
  const { user } = props;
  return (
    <div id="home">
      <p id="homeMessage">Mist: Your One Stop Shop For All Things Games</p>
      {user && <p id="homeUser">Logged in as: {user.username}</p>}
      <p id="signature">
        Created By: Bernie Pereda, Brett Nicholas, Diana Clemente, and Devin
        Dodd
      </p>
    </div>
  );
};
export default Home;
