const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
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
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },

   
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const moviesDetails = mongoose.model("movies", movieSchema);
module.exports = moviesDetails;
