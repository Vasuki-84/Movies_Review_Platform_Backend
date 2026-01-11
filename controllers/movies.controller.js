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
    casts, 
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
      casts: casts || [], 
    });

    await newMovie.save();

    res.status(201).json({
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Movie not added" });
  }
};

// GET api
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// GET movie by name
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
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// GET movie by id
const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await movieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// PUT api
const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await movieModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (err) {
    res.status(500).json({ message: "Movie updation failure" });
  }
};

// DELETE api
const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await movieModel.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Movie deletion failed" });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  getAllMovies,
  getMovieById,
  getMovieByName,
  deleteMovie,
};
