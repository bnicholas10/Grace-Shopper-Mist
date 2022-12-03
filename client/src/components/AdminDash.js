import { Route, Routes } from "react-router-dom";
import AdminDashNav from "./AdminDashNav";
import "./css/AdminDash.css";

const AdminDash = (props) => {
  const { user } = props;
  return (
    <div id="adminDash">
      {user && user.isAdmin ? (
        <div>
          <h1>Admin Dashboard</h1>
          <AdminDashNav />
          <Routes>
            <Route path={"users"} />
          </Routes>
        </div>
      ) : (
        <div className="authError">
          <h1>You don't have authorization for this page</h1>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
