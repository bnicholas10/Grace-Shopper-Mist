import { useEffect, useState, Link } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchCart, fetchGames, fetchUser } from "./api";
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
import Cart from "./components/Cart";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);

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
    setGames(allGames.data);
  };

  const handleFetchCart = async (token) => {
    if (!token) {
      return;
    }
    const cartItems = await fetchCart(token);
    console.log("CART ITEMS: ", cartItems.data);
    setCart(cartItems.data);
  };

  useEffect(() => {
    handleFetchUser(token);
    handleFetchGames();
    handleFetchCart(token);
  }, [token]);

  return (
    <div className="App">
      <Navbar
        token={token}
        setToken={setToken}
        user={user}
        setUser={setUser}
        setCart={setCart}
      />
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
        <Route
          path={"/cart"}
          element={<Cart cart={cart} setCart={setCart} user={user} />}
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
