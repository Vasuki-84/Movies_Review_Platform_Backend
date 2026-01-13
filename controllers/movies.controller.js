const movieModel = require("../models/moviesDetails.model");

// POST api
const createMovie = async (req, res) => {
  const {
    movieName,
    posterImage,
    releaseDate,
    language,
    duration,
    genres,
    description,
    country,
  } = req.body;

  try {
    if (
      !movieName ||
      !posterImage ||
      !releaseDate ||
      !language ||
      !duration ||
      !genres ||
      !description ||
      !country
    ) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const newMovie = new movieModel({
      movieName,
      posterImage,
      releaseDate,
      language,
      duration,
      genres,
      description,
      country,
      createdBy: req.user.id,
    });

    await newMovie.save();

    res.status(201).json({
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (err) {
    console.error("Create Movie Error:", err);
    res.status(500).json({ message: "Movie not added" });
  }
};

// GET all movies api
// const getAllMovies = async (req, res) => {
//   try {
//     const movies = await movieModel
//       .find({ createdBy: req.user.id })
//       .sort({ createdAt: -1 });

//     res.status(200).json(movies);
//   } catch (err) {
//     console.error("Get Movies Error:", err);
//     res.status(500).json({ message: "Movie fetching failure" });
//   }
// };

const getAllMovies = async (req, res) => {
  try {
    let query = {};

    if (req.user?.id) {
      query.createdBy = req.user.id;
    }

    const movies = await movieModel.find(query).sort({ createdAt: -1 });

    res.status(200).json(movies);
  } catch (err) {
    console.error("Get Movies Error:", err);
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// GET movie by name api
const getMovieByName = async (req, res) => {
  const { movieName } = req.params;

  try {
    const movie = await movieModel.findOne({
      movieName: { $regex: new RegExp(`^${movieName}$`, "i") },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    console.error("Get Movie By Name Error:", err);
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// GET movie by id api
const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await movieModel.findOne({
      _id: id,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    console.error("Get Movie By ID Error:", err);
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// UPDATE api
const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await movieModel.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res
        .status(404)
        .json({ message: "Movie not found or access denied" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (err) {
    console.error("Update Movie Error:", err);
    res.status(500).json({ message: "Movie updation failure" });
  }
};

// DELETE api
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await movieModel.findOneAndDelete({
      _id: id,
      createdBy: req.user.id,
    });

    if (!deletedMovie) {
      return res
        .status(404)
        .json({ message: "Movie not found or access denied" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Delete Movie Error:", err);
    res.status(500).json({ message: "Movie deletion failed" });
  }
};
// GET all movies (PUBLIC)
const getPublicMovies = async (req, res) => {
  try {
    const movies = await movieModel.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    console.error("Get Public Movies Error:", err);
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
  getMovieByName,
  deleteMovie,
  getPublicMovies,
};
