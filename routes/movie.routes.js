const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  getMovieByName,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// http://localhost:8081/movie/create
router.post("/create", createMovie);

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.get("/name/:movieName", getMovieByName);

router.put("/update/:id", updateMovie);

router.delete("/delete/:id", deleteMovie);

module.exports = router;
