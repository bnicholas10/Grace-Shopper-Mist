import { useEffect, useState, Link } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchGames, fetchUser } from "./api";
// import "./index.css";
import Games from "./components/Games";
import GamesForm from "./components/GamesForm";
import Game from "./components/Game";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import AdminDash from "./components/AdminDash";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [games, setGames] = useState([]);

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

  const handleFetchGames = async () => {
    const allGames = await fetchGames();
    // console.log(allGames.data);
    setGames(allGames.data);
  };

  useEffect(() => {
    handleFetchUser(token);
    handleFetchGames();
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
          path={"/admin/*"}
          element={
            <AdminDash
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
        <Route
          path={"/register"}
          element={<Register setToken={setToken} setUser={setUser} />}
        />
        <Route path={"/profile"} element={<UserProfile />} />
        <Route
          path={"/games"}
          element={<Games token={token} games={games} />}
        />
        <Route
          path={"/games/:gameId/*"}
          element={<Game token={token} games={games} />}
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
