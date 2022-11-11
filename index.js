import React from "react";
import ReactDOM from "react-dom/client";
//import ReactDOM from "react-dom";
import App from "./components/App.js";
import { BrowserRouter, Route } from "react-router-dom";

//ReactDOM.render(<App />, document.querySelector("#app"));

const appElement = document.getElementById("app");
const root = ReactDOM.createRoot(appElement);
root.render(<App />);

// GET /api/games

const express = require("express");
const apiRouter = require("./api");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { client } = require("./db");
client.connect();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log("Server is up on ", PORT);
});
