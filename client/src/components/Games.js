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
      <div id="gamesPageHeading">
        <h1 id="gamesPageTitle">Games</h1>
        <div className="navbar">
          <form onSubmit={handleSearch}>
            <input
              id="filterInput"
              type="text"
              placeholder="Search Games"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </form>
        </div>
      </div>

      <div className="main">
        <div className="gamesList">
          <h1>ALL GAMES</h1>
          {test.map((game) => {
            if (game.isActive === true) {
              return (
                <div className="gamesGameCard" key={game.id}>
                  <img src={game.image} alt="Image" />
                  <div id="allGamesGameInfo">
                    <Link to={`/games/${game.id}`}>{game.name}</Link>
                    <p>Publisher: {game.publisher}</p>
                    <p>Rating: {game.rating}</p>
                    <p>Genre: {game.category}</p>
                    <p>${game.price}</p>
                  </div>
                </div>
              );
            }
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
