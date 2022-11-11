import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Games from "./components/Games";

function App() {
  const [games, setGames] = useState([]);
  // i want to fetch the actual books and save them in state
  const fetchGames = async () => {
    const response = await fetch("/api/games");
    const data = await response.json();
    setBooks(data.games);
  };

  console.log(books);

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <Link to="/games">Games</Link>
      <Routes>
        <Route path="/games" element={<Games />} />
      </Routes>
    </div>
  );
}

export default App;
