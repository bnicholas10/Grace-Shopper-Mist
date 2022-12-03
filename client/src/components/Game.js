import { Route, Routes, useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { addToCart, fetchCart, fetchGameById } from "../api";
import EditGame from "./EditGame";
import "./css/Game.css";

const Game = ({ token, games, user, setCart, setGames, cart }) => {
  const params = useParams();
  const [game, setGame] = useState([]);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [display, setDisplay] = useState(true);
  const [error, setError] = useState("");

  const loadGame = async (gameId) => {
    const gameInfo = await fetchGameById(gameId);
    // console.log(gameInfo);
    setGame(gameInfo.data);
  };

  const handleaddToCart = async (e) => {
    e.preventDefault();
    const result = await addToCart(game.id, user.id);
    if (!result.success) {
      setError(result.error.message);
      setTimeout(() => {
        setError("");
      }, 2500);
    } else {
      const cartItems = await fetchCart(token);
      setCart(cartItems.data);
      navigate("/cart");
    }
  };

  useEffect(() => {
    loadGame(params.gameId);
  }, [token]);

  const handleForm = async (event) => {
    event.preventDefault();
    setClicked(true);
    setDisplay(false);
  };

  return (
    <div className="gameContainer">
      <p id="gameError">{error}</p>
      {display === true ? (
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
          <div className="gameButtons">
            {user && user.isAdmin && (
              <button className="editGameButton" onClick={handleForm}>
                Edit Game
              </button>
            )}
            {user && (
              <button className="addToCart" onClick={handleaddToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      ) : null}
      {user && user.isAdmin === true && clicked === true ? (
        <div>
          <EditGame user={user} game={game} token={token} setGames={setGames} />
        </div>
      ) : null}
    </div>
  );
};

export default Game;
