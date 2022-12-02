import AdminDashNav from "./AdminDashNav";
import "./css/AdminDash.css";
import DataTable from "./DataTable";
import React, { useEffect, useState } from "react";

const AdminDash = (props) => {
  const { user, games, token } = props;
  return (
    <div id="adminDash">
      {user && user.isAdmin ? (
        <div className="adminDashContent">
          <h1>Admin Dashboard</h1>
          <div className="sideNav">
            <AdminDashNav />
          </div>
          <div className="dataT">
            <DataTable games={games} user={user} token={token} />
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
