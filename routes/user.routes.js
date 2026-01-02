const express = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

// http://localhost:8081/user/register
router.post("/register", registerUser);

// http://localhost:8081/user/login
router.post("/login", loginUser);

module.exports = router;
