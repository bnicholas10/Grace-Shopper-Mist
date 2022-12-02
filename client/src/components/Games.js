import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Games.css";
import GamesLowerPrice from "./GamesLowerPrice";

const gameSearch = (games, text) => {
  text = text.toLowerCase();

  const { name } = games;

  const searches = [name];
  for (const query of searches) {
    if (query.toLowerCase().includes(text)) {
      return true;
    }
  }
};

const Games = ({ token, games }) => {
  const [searchTerm, setSearchTerm] = useState("");

  var test = searchTerm
    ? games.filter((game) => gameSearch(game, searchTerm))
    : games;

  const handleSearch = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="gamesContainer">
      <h1>Games</h1>

      <div className="navbar">
        <div className="navbarSearch">
          <form onSubmit={handleSearch}>
            <fieldset>
              <label id="filter">Search </label>
              <input
                id="filterInput"
                type="text"
                placeholder="Type here to search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);

                  // console.log(event.target.value);
                }}
              />
            </fieldset>
          </form>
        </div>
      </div>

      <div className="main">
        <div className="gamesList">
          <h1>ALL GAMES</h1>
          {test.map((game) => {
            return (
              <div className="singleGame" key={game.id}>
                <a href={`/games/${game.id}`}>
                  <div className="content">
                    <div className="contentLeft">
                      <img src={game.image} alt="test" />
                      <h5>{game.name}</h5>
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
