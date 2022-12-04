import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "./css/Login.css";

const Login = (props) => {
  const { setToken, setUser, user, token } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginUser(username, password);
    // console.log("RESULT: ", result);
    if (!result || !result.success) {
      setError(result.error.message);
      setTimeout(() => {
        setError("");
      }, 2500);
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
        <div className="form__group field">
          <input
            type={"input"}
            placeholder="Username *"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            id="username"
          />
        </div>
        <div className="form__group field">
          <input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
          />
        </div>
        <button type="submit">Log In</button>
        <Link to={"/register"}>Sign up</Link>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Login;
