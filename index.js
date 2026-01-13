const express = require("express");
const app = express();
const dbConnection = require("./config/dbConnection.config");
const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movie.routes");
const review = require("./routes/review.route");
const adminReviewRoutes = require("./routes/admin.route");

const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
dbConnection();
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);
app.use("/review", review);
app.use("/admin", adminReviewRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on ", process.env.PORT);
});
