const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//------- Health Check --------------------
app.get("/api/health", (_req, res) =>
  res.json({ message: "Server is running", status: "OK" }),
);

// ------ Error Handler -------------
app.use((err, _req, res, _next) => {
  console.error("Unhanced error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 PSG Intranet Backend running on Port ${PORT}`);
});
