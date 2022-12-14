import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  fetchCartandPurchased,
  fetchGames,
  fetchUser,
  fetchAllUsers,
} from "./api";
// import "./index.css";
import Games from "./components/Games";
import EditGame from "./components/EditGame";
import CreateGame from "./components/CreateGame";
import Game from "./components/Game";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import AdminDash from "./components/AdminDash";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const checkToken = () => {
    if (token === "" && localStorage.getItem("token")) {
      console.log("fetched token from local");
      setToken(localStorage.getItem("token"));
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

  const handleFetchUsers = async (token) => {
    if (!token) {
      return;
    }

    const result = await fetchAllUsers(token, user);
    // console.log(result);
    if (result.success) {
      setAllUsers(result.data.users);
    }
  };

  const handleFetchGames = async () => {
    const allGames = await fetchGames();
    setGames(allGames.data);
  };

  const handleFetchCartandPurchased = async (token) => {
    if (!token) {
      return;
    }
    const result = await fetchCartandPurchased(token);
    setCart(result.data.cartItems);
    setPurchased(result.data.purchasedItems);
  };

  useEffect(() => {
    handleFetchUser(token);
    handleFetchUsers(token, user);
    handleFetchGames();
    handleFetchCartandPurchased(token);
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
              games={games}
              setGames={setGames}
              allUsers={allUsers}
              setAllUsers={setAllUsers}
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
        <Route
          path={"/profile"}
          element={
            <UserProfile
              user={user}
              setUser={setUser}
              purchased={purchased}
              token={token}
            />
          }
        />
        <Route
          path={"/games"}
          element={<Games token={token} games={games} setGames={setGames} />}
        />
        <Route
          path={"/games/:gameId/*"}
          element={
            <Game
              token={token}
              games={games}
              setGames={setGames}
              user={user}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path={"/cart"}
          element={
            <Cart cart={cart} setCart={setCart} user={user} token={token} />
          }
        />
        <Route
          path={"/cart/checkout"}
          element={
            <Checkout
              cart={cart}
              setCart={setCart}
              setPurchased={setPurchased}
              token={token}
            />
          }
        />
        <Route
          path={"/editgame/:gameId/*"}
          element={
            <EditGame
              token={token}
              setToken={setToken}
              user={user}
              setGames={setGames}
            />
          }
        />
        <Route
          path={"/creategame"}
          element={
            <CreateGame
              token={token}
              setToken={setToken}
              user={user}
              setGames={setGames}
            />
          }
        />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
