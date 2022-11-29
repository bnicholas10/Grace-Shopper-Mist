import { Link } from "react-router-dom";
import "./css/AdminDashNav.css";

const AdminDashNav = () => {
  return (
    <div id="AdminDashNavBar">
      <Link>User Management</Link>
      <Link>Add Game</Link>
      <Link>Edit/Remove Game</Link>
    </div>
  );
};

export default AdminDashNav;
