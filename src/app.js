const cron = require("node-cron");
const fetchCryptoData = require("./jobs/fetchCryptoData");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const cryptoRoutes = require("./routes/cryptoRoutes");


const app = express();
app.use(express.json());


// Run the job every 2 hours
cron.schedule("0 */2 * * *", fetchCryptoData, {
    timezone: "UTC",
  });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/v1", cryptoRoutes);

// Start the background job immediately
fetchCryptoData();

module.exports = app;

