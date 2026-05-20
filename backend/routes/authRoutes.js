const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// ==========================
// SIGNUP
// ==========================
router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const errors = {};

    // Validation
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (password && password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation error",
        errors
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Validation error",
        errors: {
          email: "Email already registered"
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error during signup",
      error: error.message
    });
  }
});


// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Validation error",
        errors
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Authentication failed",
        errors: {
          email: "No account found with this email"
        }
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Authentication failed",
        errors: {
          password: "Incorrect password"
        }
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error during login",
      error: error.message
    });
  }
});

module.exports = router;