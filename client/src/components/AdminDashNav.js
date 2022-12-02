import { Link } from "react-router-dom";
import "./css/AdminDashNav.css";

const AdminDashNav = () => {
  return (
    <div id="AdminDashNavBar">
      <div className="topBar">
        <div>
          <Link>User Management</Link>
        </div>
        <div>
          <Link>Game Management</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashNav;
