const express = require("express");

const {
  postReview,
  getAllReviews,
} = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// http:localhost:8081/review/add
router.post("/add", authMiddleware(["user"]), postReview);

router.get("/get", getAllReviews);
module.exports = router;
