import { Route, Routes, useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createGameFunc, fetchGameById, fetchGames } from "../api";
import "./css/Game.css";

const CreateGame = ({ user, token, game, setGames }) => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [publisher, setPublisher] = useState();
  const [description, setDescription] = useState();
  const [rating, setRating] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();

  //   const gameId = params.gameId;

  //   const loadGame = async (gameId) => {
  //     const gameInfo = await fetchGameById(gameId);
  //     console.log(gameInfo);
  //     // setGame(gameInfo.data);

  //     // console.log(gameInfo.data.id);
  //   };

  //   useEffect(() => {
  //     loadGame(params.gameId);
  //   }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    const newGame = await createGameFunc(
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

    if (!newGame) {
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
          <form onSubmit={handleCreate}>
            <div className="gameImage">
              <label>Image</label>
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
              <label>Name</label>
              <input
                type={"text"}
                placeholder="Enter New Value"
                value={name}
                onChange={(event) => {
                  event.preventDefault();
                  setName(event.target.value);
                }}
              />

              <label>Description</label>
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
                {/* <div className="gameInfoLeft">
                  <h3>Publisher: </h3>
                  <br />
                  <h3>Rating:</h3>
                  <br />
                  <h3>Category: </h3>
                  <br />
                  <h3>Price:</h3>
                </div> */}

                <div className="gameInfoRight">
                  <label>Publisher</label>
                  <input
                    type={"text"}
                    placeholder="Enter New Value"
                    value={publisher}
                    onChange={(event) => {
                      event.preventDefault();
                      setPublisher(event.target.value);
                    }}
                  />
                  <label>Rating</label>
                  <input
                    type={"text"}
                    placeholder="Enter New Value"
                    value={rating}
                    onChange={(event) => {
                      event.preventDefault();
                      setRating(event.target.value);
                    }}
                  />
                  <label>Category</label>
                  <input
                    type={"text"}
                    placeholder="Enter New Value"
                    value={category}
                    onChange={(event) => {
                      event.preventDefault();
                      setCategory(event.target.value);
                    }}
                  />
                  <label>Price</label>
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

export default CreateGame;
