const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Register Admin
const registerAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const emailCheck = await adminModel.findOne({ email });

    if (emailCheck) {
      return res.status(400).json({ message: "Admin account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newAdmin.save();
    res.status(201).json({ message: "New Admin added" });
  } catch (err) {
    res.status(500).json({ message: "Admin not added" });
  }
};

// User Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin account not found ,Please register" });
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password not match" });
    }

    // JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login Failed" });
  }
};

module.exports = { registerAdmin, loginAdmin };
