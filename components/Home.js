import React, { useEffect, useState } from "react";
import { login, register } from "./api/index"; //revisit where this lives

const Home = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const waitRegister = await register(username, password);
    console.log(waitRegister, "user registered");
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const waitLogin = await login(loginUsername, loginPassword);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("curUser");
    console.log("user logged out");
  };

  useEffect(() => {
    const getToken = localStorage.getItem("token") ? true : false;
    console.log("is user logged in:", getToken);
    setIsLoggedIn(getToken);
  }, []);

  return (
    <>
      <form id={"loginButtons"} onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type={"text"}
          value={loginUsername}
          onChange={(event) => {
            setLoginUsername(event.target.value);
          }}
          placeholder={"Enter username"}
        />

        <label>Password:</label>
        <input
          type={"text"}
          value={loginPassword}
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
          placeholder={"Enter password"}
        />

        <button>Login</button>
      </form>
      <form id={"loginButtons"} onSubmit={handleRegister}>
        <label>Username:</label>
        <input
          type={"text"}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder={"Enter username"}
        />
        <label>Password:</label>
        <input
          type={"text"}
          min={8}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder={"Enter password"}
        />

        <button>Register</button>
      </form>

      <button
        onClick={(event) => {
          event.preventDefault();
          logout();
        }}
      >
        Logout
      </button>
    </>
  );
};
export default Home;
