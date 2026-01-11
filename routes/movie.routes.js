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



// Create a new movie (Admin only)
router.post("/create", authMiddleware(["admin"]), createMovie);

router.get("/get", authMiddleware(), getAllMovies);

router.get("/name/:movieName",  getMovieByName);

router.get("/get/:id",  getMovieById);

router.put("/update/:id", authMiddleware(["admin"]), updateMovie);

router.delete("/delete/:id", authMiddleware(["admin"]), deleteMovie);

module.exports = router;
