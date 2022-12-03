import { Route, Routes } from "react-router-dom";
import AdminDashNav from "./AdminDashNav";
import DataTable from "./DataTable";
import "./css/AdminDash.css";

const AdminDash = (props) => {
  const { user, games, token, setGames } = props;
  return (
    <div id="adminDash">
      {user && user.isAdmin ? (
        <div className="adminDashContent">
          <h1>Admin Dashboard</h1>
          <div className="sideNav">
            <AdminDashNav />
          </div>
          <div className="dataT">
            <DataTable
              games={games}
              user={user}
              token={token}
              setGames={setGames}
            />
          </div>
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
