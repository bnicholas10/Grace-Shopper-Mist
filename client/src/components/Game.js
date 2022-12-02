import { Route, Routes, useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addToCart, fetchCart, fetchGameById } from "../api";
import "./css/Game.css";

const Game = ({ token, games, user, setCart }) => {
  const params = useParams();
  const [game, setGame] = useState([]);
  const navigate = useNavigate();
  const loadGame = async (gameId) => {
    const gameInfo = await fetchGameById(gameId);
    // console.log(gameInfo);
    setGame(gameInfo.data);
  };

  const handleaddToCart = async (e) => {
    e.preventDefault();
    const result = await addToCart(game.id, user.id);
    if (!result) {
      console.log("something went wrong");
    } else {
      const cartItems = await fetchCart(token);
      setCart(cartItems.data);
      navigate("/cart");
    }
  };

  useEffect(() => {
    loadGame(params.gameId);
  }, [token]);

  return (
    <div className="gameContainer">
      <div className="gameView" id="test">
        <div className="gameImage">
          <img src={game.image} alt="test Image" />
        </div>

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
        <button id="addToCart" onClick={handleaddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Game;
