// DEPENDENCIES
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

// APP
const app = express();

// CONFIG
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "Innovate Inc. Login API is running.",
    });
});

// DATABASE CONNECTION
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });