//admin can add games
import { useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./css/gamesLowerPrice.css";

const GamesLowerPrice = ({ games }) => {
  var filteredGames = games.filter((low) => low.price <= 40);
  // console.log(filteredGames);

  return (
    <div className="lowerPriced">
      <h1 id="lowerGamesTitle">GAMES UNDER $40.00</h1>
      <div className="lowerPricedContainer">
        {filteredGames.map((game) => {
          if (game.isActive === true) {
            return (
              <div className="lowerGamesCard" key={game.id}>
                <img src={game.image} alt="test Image" />
                <div className="lowerGameInfo">
                  <Link to={`/games/${game.id}`}>{game.name}</Link>
                  <h5>${game.price}</h5>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default GamesLowerPrice;
