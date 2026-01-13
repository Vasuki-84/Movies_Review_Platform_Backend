const reviewModel = require("../models/review.model");

const postReview = async (req, res) => {
  try {
    const { movieId, review, rating } = req.body;
    const userId = req.user.id;

    if (!movieId || !review || !rating) {
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

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find()
      .populate("userId", "name email")
      .populate("movieId", "name year image")
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

module.exports = { postReview, getAllReviews };
