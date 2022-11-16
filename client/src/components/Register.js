import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "./css/Register.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, password);
    const result = await registerUser(username, password);
    console.log(result);
    if (!result || !result.success) {
      setError("An Error Occurred!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div id="registerField">
      <h1 id="registerText">Sign up</h1>
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
        <input
          type="password"
          placeholder="Confirm password *"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign up</button>
        <Link to={"/login"}>Already signed up? Log in here</Link>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default Register;
