const express = require("express");
const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();


// http://localhost:8081/admin/register
router.post("/register", registerAdmin);

// http://localhost:8081/admin/login
router.post("/login", loginAdmin);

module.exports = router;
