const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection.config");
const userRoutes = require("./routes/user.routes");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
dbConnection();
app.use("/user", userRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server running on ", process.env.PORT);
});
