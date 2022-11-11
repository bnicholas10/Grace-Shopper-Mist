import React, { useEffect, useState } from "react";
import { getAllActivities } from "./api/games";
import GamesForm from "./GamesForm";

// const cardStyle = {
//   backgroundColor: "blue",
//   color: "#CCC",
//   padding: "20px",
//   margin: "20px",
// };

const GamesList = () => {
  const [gamesList, setGames] = useState([]);
  const token = localStorage.getItem("token");

  const fetchGames = async () => {
    const gamess = await getAllGames();
    setGames(games);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <div id="forms">
        {token ? <GamesForm /> : <p>Please Log In to Create a New Game</p>}
      </div>
      <div>
        {games.map((game) => {
          return (
            <div id="cardStyle" style={cardStyle} key={game.id}>
              <p>Name:{game.name}</p>
              <p>Description:{game.description}</p>
            </div>
          );
        })}
      </div>
      )
    </>
  );
};
export default Games;
