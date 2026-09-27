const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check required fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email, and password are required.",
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "A user with that email already exists.",
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
        });

        // Remove password from response
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            message: "Server error.",
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const errorMessage = "Incorrect email or password.";

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: errorMessage,
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: errorMessage,
            });
        }

        // Compare password
        const isCorrectPassword = await user.isCorrectPassword(password);

        if (!isCorrectPassword) {
            return res.status(400).json({
                message: errorMessage,
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        // Send response without password
        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error.",
        });
    }
});

module.exports = router;