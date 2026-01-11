const mongoose = require("mongoose");

const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    character: {
      type: String,
    },
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
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
    country: {
      type: String,
      required: true,
    },

    casts: {
      type: [castSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const moviesDetails = mongoose.model("movies", movieSchema);
module.exports = moviesDetails;
