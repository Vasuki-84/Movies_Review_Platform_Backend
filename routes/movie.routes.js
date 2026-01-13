const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  getMovieByName,
  updateMovie,
  deleteMovie,
  getPublicMovies,
} = require("../controllers/movies.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/create", authMiddleware(["admin"]), createMovie);

router.get("/get", getAllMovies);

router.get("/name/:movieName", getMovieByName);

router.get("/get/:id", getMovieById);

router.put("/update/:id", authMiddleware(["admin"]), updateMovie);

router.delete("/delete/:id", authMiddleware(["admin"]), deleteMovie);

router.get("/public", getPublicMovies);

router.get("/admin", authMiddleware(["admin"]), getAllMovies);

module.exports = router;
