import { Route, Routes } from "react-router-dom";
import AdminDashNav from "./AdminDashNav";
import DataTable from "./DataTable";
import DataTableU from "./DataTableU";
import "./css/AdminDash.css";
import { useEffect, useState } from "react";

const AdminDash = (props) => {
  const { user, games, token, setGames, allUsers, setAllUsers } = props;

  const [management, setManagement] = useState(false);

  const handleView = (event) => {
    event.preventDefault();
  };

  if (user && user.isAdmin === true) {
    return (
      <div id="adminDash">
        {management ? (
          <div className="adminDashContent">
            <div className="managementType">
              <button
                className="adminDashButton"
                onClick={(event) => {
                  event.preventDefault();
                  setManagement(true);
                }}
              >
                Game Management
              </button>
              <button
                className="adminDashButton"
                onClick={(event) => {
                  event.preventDefault();
                  setManagement(false);
                }}
              >
                User Management
              </button>
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
          <div className="adminDashContent">
            <div className="managementType">
              <button
                className="adminDashButton"
                onClick={(event) => {
                  event.preventDefault();
                  setManagement(true);
                }}
              >
                Game Management
              </button>
              <button
                className="adminDashButton"
                onClick={(event) => {
                  event.preventDefault();
                  setManagement(false);
                }}
              >
                User Management
              </button>
            </div>
            <div className="dataT">
              <DataTableU
                user={user}
                token={token}
                allUsers={allUsers}
                setAllUsers={setAllUsers}
              />
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div id="adminDash">
        <div className="authError">
          <h1>You don't have authorization for this page</h1>
        </div>
      </div>
    );
  }
};

export default AdminDash;
