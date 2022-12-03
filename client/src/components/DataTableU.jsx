// import "./css/dataTable.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import * as React from "react";
// import { Link } from "react-router-dom";

// const DataTable = ({ games, user, token }) => {
//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <Link
//               to={`/games/${params.row.id}`}
//               style={{ textDecoration: "none" }}
//             >
//               <div className="viewButton">View</div>
//             </Link>
//           </div>
//         );
//       },
//     },
//   ];

//   //   var test = games.map((game) => game);

//   const gameColumns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "NAME", width: 250 },
//     { field: "description", headerName: "DESCRIPTION", width: 500 },
//     { field: "publisher", headerName: "PUBLISHER", width: 100 },
//     {
//       field: "category",
//       headerName: "CATEGORY",
//       width: 100,
//     },
//     {
//       field: "price",
//       headerName: "PRICE",
//       width: 100,
//     },
//   ];

//   //   const rows = [
//   //     { id: 1, name: "Snow", publisher: "Jon", category: "FPS", price: 35 },
//   //   ];

//   return (
//     <div className="dataTable">
//       <div className="dataTableTitle">
//         Game Management
//         <Link to="/users/new" className="link">
//           Add New Game
//         </Link>
//       </div>
//       <DataGrid
//         className="dataGrid"
//         rows={games}
//         columns={gameColumns.concat(actionColumn)}
//         pageSize={10}
//         rowsPerPageOptions={[10]}
//         // onCellClick={(params, event) => {
//         //   console.log(params.row);
//         //   setSelectedGame(params.row);
//         // }}
//       />
//       {/* {!clicked ? <EditGame selectedGame={selectedGame} /> : null} */}
//     </div>
//   );
// };

// export default DataTable;
