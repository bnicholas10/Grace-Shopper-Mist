import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Games.css";
import GamesLowerPrice from "./GamesLowerPrice";

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

      <div className="main">
        <div className="gamesList">
          <h1>ALL GAMES</h1>
          {games.map((game) => {
            return (
              <div className="singleGame" key={game.id}>
                <a href={`/games/${game.id}`}>
                  <div className="content">
                    <div className="contentLeft">
                      <img src={game.image} alt="test Image" />
                      <h5>{game.name}</h5>
                      {/* <h4>{game.category}</h4> */}
                    </div>

                    <div className="contentRight">
                      <h5>${game.price}</h5>
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
        <div className="side">
          <GamesLowerPrice games={games} />
        </div>
      </div>
    </div>
  );
};
export default Games;
