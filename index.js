const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection.config");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");

require("dotenv").config();
app.use(express.json());
dbConnection();
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.listen(process.env.PORT, () => {
  console.log("Server running on ", process.env.PORT);
});
