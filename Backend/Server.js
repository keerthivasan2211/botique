const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const uploadRoutes =require("./Routes/Uploads")
const OrderModel = require("./Models/Order");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve static files

// Routes
app.use("/api", uploadRoutes);

// Connect to MongoDB


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
