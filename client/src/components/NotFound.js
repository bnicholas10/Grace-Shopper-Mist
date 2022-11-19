import { Link } from "react-router-dom";
import "./css/NotFound.css";

const NotFound = () => {
  return (
    <div id="MissingPage">
      <h1>Oops! There doesn't seem to be anything here.</h1>
      <p>Click here to return to the home page:</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default NotFound;
