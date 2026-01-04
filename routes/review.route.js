const express = require("express");

const postReview = require("../controllers/review.controller");
// const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// http:localhost:8081/review/add
router.post("/add",  postReview);

module.exports = router;
