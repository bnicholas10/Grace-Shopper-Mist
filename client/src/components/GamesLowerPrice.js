//admin can add games
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./css/gamesLowerPrice.css";

const GamesLowerPrice = ({ games }) => {
  var filteredGames = games.filter((low) => low.price <= 40);
  console.log(filteredGames);

  return (
    <div className="lowerPriced">
      <h1>GAMES UNDER $40.00</h1>
      <div className="lowerPricedContainer">
        {filteredGames.map((game) => {
          return (
            <div className="singleGameLower" key={game.id}>
              <a href={`/games/${game.id}`}>
                <div className="contentLower">
                  <div className="contentLeftLower">
                    <img src={game.image} alt="test Image" id="smallerImg" />
                    <h5>{game.name}</h5>
                    {/* <h5>{game.category}</h5> */}
                  </div>

                  <div className="contentRightLower">
                    <h5>${game.price}</h5>
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
export default GamesLowerPrice;
