const reviewModel = require("../models/review.model");

const postReview = async (req, res) => {
  try {
    const { movieId, userId, review, rating } = req.body;

    if (!movieId || !userId || !review || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const newReview = new reviewModel({
      movieId,
      userId,
      review,
      rating,
    });
    await newReview.save();
    res.status(201).json({
      message: "Review added successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Review not added",
      error: error.message,
    });
  }
};
module.exports = postReview;
