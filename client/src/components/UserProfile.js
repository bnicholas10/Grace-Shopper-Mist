import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { fetchUser, updateUser } from "../api";
import "./css/UserProfile.css";

const UserProfile = (props) => {
  const { user, setUser, purchased, token } = props;
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  let fields = {};
  if (updatedName) {
    fields.name = updatedName;
  }
  if (updatedEmail) {
    fields.email = updatedEmail;
  }
  if (updatedPassword) {
    fields.password = updatedPassword;
  }

  const handleSelfEdit = async (e) => {
    e.preventDefault();
    if (!updatedEmail && !updatedName && !updatedPassword) {
      setError("Please enter info to update");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }

    const result = await updateUser(token, fields);
    // console.log("EDIT RESULT: ", result);
    if (!result || !result.success) {
      setError(result.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setSuccess("User Updated");
      const userInfo = await fetchUser(token);
      setUser(userInfo.user);
      setUpdatedName("");
      setUpdatedEmail("");
      setUpdatedPassword("");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    }
  };

  // const handleFetchUser = async (token) => {
  //   if (token) {
  //     const userInfo = await fetchUser(token);
  //     setUser(userInfo.user);
  //   } else {
  //     setUser(null);
  //   }
  // };

  return (
    <div id="profilePage">
      {user ? (
        <div id="userProfile">
          <h1>{user.username}'s Profile</h1>
          <div id="contentParent">
            <div id="purchases" className="profileContent">
              <h1>Purchased Games</h1>
              {purchased.map((game, i) => {
                return (
                  <div key={i} className="purchasedGameCard">
                    <img src={game.image} alt="Image" />

                    <div id="cartGameInfo">
                      <Link to={`/games/${game.id}`}>{game.name}</Link>
                      <p>Publisher: {game.publisher}</p>
                      <p>Rating: {game.rating}</p>
                      <p>${game.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div id="editUser" className="profileContent">
              <h1>Edit user info</h1>
              <form onSubmit={handleSelfEdit}>
                <input
                  placeholder="Name"
                  onChange={(e) => setUpdatedName(e.target.value)}
                  value={updatedName}
                />
                <input
                  placeholder="Email"
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  value={updatedEmail}
                />
                <input
                  placeholder="Password"
                  onChange={(e) => setUpdatedPassword(e.target.value)}
                  value={updatedPassword}
                />
                <button>Submit</button>
                <p className="success">{success}</p>
                <p className="error">{error}</p>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div id="profileLoginMessage">
          <h1>Please log in to view your profile</h1>
          <Link to={"/login"}>Log In</Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
