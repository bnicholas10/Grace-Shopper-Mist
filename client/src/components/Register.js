import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "./css/Register.css";

const Register = (props) => {
  const { setToken, setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerUser(name, email, username, password);
    console.log("RESULT: ", result);
    if (!result || !result.success) {
      if (result.error) {
        setError(result.error.message);
      } else if (!result.error) {
        setError("An unexpected error has occured!");
      }
      setTimeout(() => {
        setError("");
      }, 2500);
    } else {
      localStorage.setItem("token", result.data.token);
      setToken(result.data.token);
      setUser(result.data.user);
      console.log(`fetched token from server`);
      setName("");
      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div id="registrationField">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name *"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          placeholder="E-mail *"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
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
        <button>Register</button>
        <Link to={"/login"}>Log in</Link>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Register;
