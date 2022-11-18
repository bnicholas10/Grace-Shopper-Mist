import { useEffect, useState, Link } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./api";
import Games from "./components/Games";
import GamesForm from "./components/GamesForm";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const checkToken = () => {
    if (token === "" && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      console.log(`fetched token from local`);
    }
  };
  checkToken();

  const handleFetchUser = async (token) => {
    if (token) {
      const userInfo = await fetchUser(token);
      setUser(userInfo.user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    handleFetchUser(token);
  }, [token]);

  return (
    <div className="App">
      <Navbar token={token} setToken={setToken} user={user} setUser={setUser} />
      <Routes>
        <Route
          path={"/"}
          element={
            <Home
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path={"/login"}
          element={
            <Login
              setToken={setToken}
              setUser={setUser}
              user={user}
              token={token}
            />
          }
        />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/profile"} element={<UserProfile />} />
        <Route path={"/games"} element={<Games />} />
      </Routes>
    </div>
  );
};

export default App;
