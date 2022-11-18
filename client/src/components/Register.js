import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
