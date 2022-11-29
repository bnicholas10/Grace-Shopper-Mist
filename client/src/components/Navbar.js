import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = (props) => {
  const { token, setToken, setUser, user } = props;
  const navigate = useNavigate();

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/");
    return;
  };

  return (
    <div id="navbar">
      <span id="title">Mist</span>
      {user && user.isAdmin && (
        <Link id="adminDashLink" to={"/admin"}>
          Admin Dashboard
        </Link>
      )}
      <div id="navlinks">
        <Link to={"/"}>Home</Link>
        <Link to={"/games"}>Games</Link>
        {token && <Link to={"/profile"}>Profile</Link>}
        {!token && <Link to={"/login"}>Log In</Link>}
        {token && (
          <Link to={"/"} onClick={logOut}>
            Log Out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
