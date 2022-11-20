import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Games.css";

const Games = ({ token, games }) => {
  // console.log(games);

  return (
    <div>
      <h1>Games</h1>
      {token ? (
        <Link to={`/NewGame`}>
          <button>Add new game</button>
        </Link>
      ) : (
        <button>
          <Link to={"/Login"}>Login</Link>
        </button>
      )}

      <div className="gamesList">
        {games.map((game) => {
          return (
            <div className="game-preview" key={game.id}>
              <div className="content">
                <h2>{game.name}</h2>
                <p>{game.description}</p>
                <h3>
                  <strong>Publisher: </strong> {game.publisher}
                </h3>
                <h3>
                  <strong>Price: </strong>${game.price}
                </h3>
                <h4>
                  <strong>Rating: </strong>
                  {game.rating}
                </h4>
                <h4>
                  <strong>Category: </strong>
                  {game.category}
                </h4>
              </div>
              <Link to={`/games/${game.id}`}>
                <button> View Game </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Games;
