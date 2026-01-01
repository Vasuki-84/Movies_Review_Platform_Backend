const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection.config");

require("dotenv").config();
app.use(express.json());
dbConnection();
app.listen(process.env.PORT, () => {
  console.log("Server running on ", process.env.PORT);
});
