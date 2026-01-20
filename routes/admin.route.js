const express = require("express");
const {
  getAdminReviews,
  deleteAdminReview,
} = require("../controllers/adminReview.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// http://localhost:8081/admin/reviews
router.get("/reviews", authMiddleware(["admin"]), getAdminReviews);

router.delete("/reviews/:id", authMiddleware(["admin"]), deleteAdminReview);

module.exports = router;
