require("dotenv").config();
const express = require("express");
const cors = require("cors");

const taskManagerRoute = require("./src/routes/taskRoutes");
const connectDB = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 8080;

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).send("Task Manager API is running 🚀");
});

/* ================= ROUTES ================= */
app.use("/api", taskManagerRoute);

/* ================= START SERVER ================= */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
