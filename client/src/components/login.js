import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "./css/Login.css";

const Login = (props) => {
  const { setToken, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    const result = await loginUser(username, password);
    console.log("RESULT: ", result);
    if (!result || !result.success) {
      setError("An Error Occurred!");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      localStorage.setItem("token", result.data.token);
      setToken(result.data.token);
      setUser(result.data.user);
      console.log(`fetched token from server`);
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div id="loginField">
      <h1 id="loginText">Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username *"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password *"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">LOG IN</button>
        <Link to={"/register"}>Sign up</Link>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Login;
