const Movie = require("../models/moviesDetails.model");
const Review = require("../models/review.model");

const getAdminReviews = async (req, res) => {
  try {
    const adminId = req.user.id;

    const movies = await Movie.find({ createdBy: adminId }).select("_id");

    if (!movies.length) {
      return res.status(200).json([]);
    }

    const movieIds = movies.map((m) => m._id);

    const reviews = await Review.find({ movieId: { $in: movieIds } })
      .populate("userId", "name email")
      .populate("movieId", "movieName posterImage")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch admin reviews",
      error: error.message,
    });
  }
};

const deleteAdminReview = async (req, res) => {
  try {
    const adminId = req.user.id;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const movie = await Movie.findOne({
      _id: review.movieId,
      createdBy: adminId,
    });
    if (!movie) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};

module.exports = { getAdminReviews, deleteAdminReview };
