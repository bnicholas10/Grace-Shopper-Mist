import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Games.css";

const Games = ({ token, games }) => {
  // console.log(games);

  return (
    <div className="gamesContainer">
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
            <div className="singleGame" key={game.id}>
              <a href={`/games/${game.id}`}>
                <div className="content">
                  <div className="contentLeft">
                    <h2>{game.name}</h2>
                    <h4>{game.category}</h4>
                  </div>

                  <div className="contentRight">
                    <h2>${game.price}</h2>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Games;
