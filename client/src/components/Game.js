import { Route, Routes, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../App";
import { useNavigate } from "react-router-dom";

const Game = ({ token, games }) => {
  const params = useParams();

  console.log(params);

  const getGame = async () => {};

  var selectedGame = games.filter((game) => game.id === params.gameId)[0];

  console.log(selectedGame);

  if (!selectedGame) {
    return <p></p>;
  }

  console.log("JFGKJFGDKJD");
  console.log(selectedGame);

  return (
    <div>
      <h1>Title: {selectedGame.name}</h1>
      <p>Description: {selectedGame.description}</p>
      <h3>Seller: {selectedGame.publisher}</h3>
      <h3>Price: {selectedGame.price}</h3>
      <h3>Location: {selectedGame.rating}</h3>
      <h3>Location: {selectedGame.category}</h3>
    </div>
  );
};

export default Game;
