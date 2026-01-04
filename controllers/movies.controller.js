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
      return res.status(400).json({ message: "All fields are required" });
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
    });
    await newMovie.save();
    res.status(201).json({
      message: "Movie added successfully",
      movie: newMovie,
    });
  } catch (err) {
    res.status(500).json({ message: "Movie not added" });
  }
};

// GET all movies api
const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// GET movie by name
const getMovieByName = async (req, res) => {
  const { movieName } = req.params;

  try {
    const movie = await movieModel.findOne({ movieName });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Movie fetching failure" });
  }
};

// GET movie by ID
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
    const updateMovie = await movieModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Movie updated" });
  } catch (err) {
    res.status(500).json({ message: "Movie Updation failure" });
  }
};

// DELETE api
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await movieModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie Deleted Successfully " });
  } catch (err) {
    res.status(500).json({ message: "Movie Deletion Failed" });
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
