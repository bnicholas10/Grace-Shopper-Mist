import { Route, Routes, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGameById } from "../api";
import "./css/Game.css";

const Game = ({ token, games }) => {
  const params = useParams();
  const [game, setGame] = useState([]);

  const loadGame = async (gameId) => {
    const gameInfo = await fetchGameById(gameId);
    // console.log(gameInfo);
    setGame(gameInfo.data);
  };

  useEffect(() => {
    loadGame(params.gameId);
  }, [token]);

  return (
    <div className="gameContainer">
      <div className="gameView" id="test">
        <div className="gameInfo">
          <h1>{game.name}</h1>
          <p>{game.description}</p>

          <div className="gameInfoMore">
            <div className="gameInfoLeft">
              <h3>Publisher: </h3>
              <h3>Rating:</h3>
              <h3>Category: </h3>
              <h3>Price:</h3>
            </div>

            <div className="gameInfoRight">
              <h3>{game.publisher}</h3>

              <h3>{game.rating}</h3>

              <h3>{game.category}</h3>

              <h3>{game.price}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
