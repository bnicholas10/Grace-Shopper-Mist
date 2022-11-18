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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server is up on ", PORT);
});
