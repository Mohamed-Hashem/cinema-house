require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) =>
  res.json({
    message: "Cinema House API",
    version: "1.0.0",
    status: "healthy",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", dataRoutes);

app.use((req, res) =>
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const connectDB = async (retries = 5) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ MongoDB connected");
  } catch (err) {
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts left)`);
      global.setTimeout(() => connectDB(retries - 1), 5000);
    } else {
      console.error("✗ MongoDB connection failed:", err.message);
      process.exit(1);
    }
  }
};

connectDB();

app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
