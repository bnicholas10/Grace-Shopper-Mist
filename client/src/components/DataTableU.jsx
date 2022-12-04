import "./css/dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteGameFunc, fetchGames } from "../api";

const DataTableU = ({
  games,
  user,
  token,
  setGames,
  allUsers,
  setAllUsers,
}) => {
  const handleDelete = async (gameId) => {
    // // console.log(token);
    // console.log(gameId);
    const isActive = false;
    const deletedGame = await deleteGameFunc(gameId, token, isActive, user);
    console.log(deletedGame);
    if (!deletedGame) {
      console.log("something went wrong");
    } else {
      const allGames = await fetchGames();
      setGames(allGames.data);
      // console.log("DELETED");
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/games/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={(event) => {
                event.preventDefault();
                // setGameId(params.row.id);
                handleDelete(params.row.id);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  //   var test = games.map((game) => game);

  const gameColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "NAME", width: 100 },
    { field: "username", headerName: "USERNAME", width: 170 },
    { field: "isAdmin", headerName: "isAdmin", width: 150 },
    { field: "isActive", headerName: "isActive", width: 150 },
  ];

  //   const rows = [
  //     { id: 1, name: "Snow", publisher: "Jon", category: "FPS", price: 35 },
  //   ];

  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        User Management
        {/* <Link to="/creategame" className="link">
          Add New Game
        </Link> */}
      </div>
      <DataGrid
        className="dataGrid"
        rows={allUsers}
        columns={gameColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        // onCellClick={(params, event) => {
        //   console.log(params.row);
        //   setSelectedGame(params.row);
        // }}
      />
      {/* {!clicked ? <EditGame selectedGame={selectedGame} /> : null} */}
    </div>
  );
};

export default DataTableU;
