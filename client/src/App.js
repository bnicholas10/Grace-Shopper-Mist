import { useEffect, useState, Link } from "react";
import { Routes, Route } from "react-router-dom";
import Games from "./components/Games";
import GamesForm from "./components/GamesForm";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const validToken = localStorage.getItem("token");
    if (validToken) setIsLoggedIn(true);
  }, []);

  return (
    <div className="App">      
      <Routes>
        <Route
          path={"/"}
          element={
            <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/UserProfile"
          element={
            isLoggedIn ? <UserProfile /> : <p>Log In to See Profile/Cart</p>
          }
        />
        <Route path="/games" element={<Games />} />
        {/* <Route path="Routines" element={<Routines />} /> */}

        <Route
          path="/GamesForm"
          element={isLoggedIn ? <GamesForm /> : <p>Log In to Add New Game</p>}
        />
      </Routes>
    </div>
  );
};

export default App;
