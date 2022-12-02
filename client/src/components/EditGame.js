import { Route, Routes, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { editGameFunc, fetchGameById } from "../api";
import "./css/Game.css";

const EditGame = ({ user, token }) => {
  const params = useParams();
  const [game, setGame] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState();
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const gameId = params.gameId;

  const loadGame = async (gameId) => {
    const gameInfo = await fetchGameById(gameId);
    console.log(gameInfo);
    setGame(gameInfo.data);

    console.log(gameInfo.data.id);
  };

  useEffect(() => {
    loadGame(params.gameId);
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();
    const updatedGame = await editGameFunc(
      gameId,
      name,
      price,
      publisher,
      description,
      rating,
      category,
      image
    );

    console.log(updatedGame);
  };

  return (
    <div className="gameContainer">
      {user && user.isAdmin ? (
        <div className="gameView" id="test">
          <form onSubmit={handleEdit}>
            <div className="gameImage">
              <h1>New Image</h1>
              <input
                type={"text"}
                placeholder="Enter New Value"
                value={image}
                onChange={(event) => {
                  event.preventDefault();
                  setImage(event.target.value);
                }}
              />
            </div>

            <div className="gameInfo">
              <h1>Name</h1>
              <label>{game.name}</label>
              <input
                type={"text"}
                placeholder="Enter New Value"
                value={name}
                onChange={(event) => {
                  event.preventDefault();
                  setName(event.target.value);
                }}
              />
              <h1>Description</h1>
              <label>{game.description}</label>
              <input
                type={"text"}
                placeholder="Enter New Value"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />

              <div className="gameInfoMore">
                <div className="gameInfoLeft">
                  <h3>Publisher: </h3>
                  <br />
                  <h3>Rating:</h3>
                  <br />
                  <h3>Category: </h3>
                  <br />
                  <h3>Price:</h3>
                </div>

                <div className="gameInfoRight">
                  <h3>{game.publisher}</h3>
                  <input
                    type={"text"}
                    placeholder="Enter New Value"
                    value={publisher}
                    onChange={(event) => {
                      setPublisher(event.target.value);
                    }}
                  />
                  <h3>{game.rating}</h3>
                  <input
                    placeholder="Enter New Value"
                    value={rating}
                    onChange={(event) => {
                      setRating(event.target.value);
                    }}
                  />
                  <h3>{game.category}</h3>
                  <input
                    placeholder="Enter New Value"
                    value={category}
                    onChange={(event) => {
                      setCategory(event.target.value);
                    }}
                  />
                  <h3>${game.price}</h3>
                  <input
                    placeholder="Enter New Value"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="authError">
          <h1>You don't have authorization for this page</h1>
        </div>
      )}
    </div>
  );
};

export default EditGame;
