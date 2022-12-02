import { Route, Routes, useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { editGameFunc, fetchGameById, fetchGames } from "../api";
import "./css/Game.css";

const EditGame = ({ user, token, game, setGames }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState(game.name);
  const [price, setPrice] = useState(game.price);
  const [publisher, setPublisher] = useState(game.publisher);
  const [description, setDescription] = useState(game.description);
  const [rating, setRating] = useState(game.rating);
  const [category, setCategory] = useState(game.category);
  const [image, setImage] = useState(game.image);

  const gameId = params.gameId;

  const loadGame = async (gameId) => {
    const gameInfo = await fetchGameById(gameId);
    console.log(gameInfo);
    // setGame(gameInfo.data);

    // console.log(gameInfo.data.id);
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
      image,
      user,
      token
    );

    if (!updatedGame) {
      console.log("something went wrong");
    } else {
      const allGames = await fetchGames();
      setGames(allGames.data);
      navigate("/admin");
    }
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
                  event.preventDefault();
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
                      event.preventDefault();
                      setPublisher(event.target.value);
                    }}
                  />
                  <h3>{game.rating}</h3>
                  <input
                    type={"text"}
                    placeholder="Enter New Value"
                    value={rating}
                    onChange={(event) => {
                      event.preventDefault();
                      setRating(event.target.value);
                    }}
                  />
                  <h3>{game.category}</h3>
                  <input
                    type={"text"}
                    placeholder="Enter New Value"
                    value={category}
                    onChange={(event) => {
                      event.preventDefault();
                      setCategory(event.target.value);
                    }}
                  />
                  <h3>${game.price}</h3>
                  <input
                    // type={"text"}
                    placeholder="Enter New Value"
                    value={price}
                    onChange={(event) => {
                      event.preventDefault();
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
