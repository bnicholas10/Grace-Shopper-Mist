//admin can add games
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGame } from "./api/games";

const GamesForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <form
      id={"newGamesForm"}
      onSubmit={(event) => {
        event.preventDefault();
        createGame(name, description);
      }}
    >
      New Game:
      <label>New Game Name</label>
      <input
        type={"text"}
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label>Game Description</label>
      <input
        type={"text"}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <button>Submit The New Game</button>
    </form>
  );
};
export default GamesForm;
