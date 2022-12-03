import { useState } from "react";

const createGame = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const isAdmin(
    {user && user.isAdmin ? (
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
      ) : (
    <div className="authError">
      <h1>You don't have authorization for this page</h1>
    </div>
))
};
export default createGame;