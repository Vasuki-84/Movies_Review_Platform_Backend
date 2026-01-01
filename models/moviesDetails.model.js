const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  posterImage: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  genres: {
    type: String,
    enum: ["Action", "Drama", "Comedy", "Thriller", "Sci-Fi"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  certification: {
    type: String,
    enum: ["U", "UA", "A", "PG", "PG-13", "R"],
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const moviesDetails = mongoose.model("movies", movieSchema);
module.exports = moviesDetails;
