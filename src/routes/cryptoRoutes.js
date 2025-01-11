const express = require("express");
const CryptoData = require("../models/CryptoData");
const calculateStandardDeviation = require("../utils/calculateDeviation");

const router = express.Router();

router.get("/hello", async (req, res) => {
  return res.status(400).json({
    message: "hello"
  })
})

// GET /stats?coin=bitcoin
router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin is required" });
  }

  try {
    const latestData = await CryptoData.findOne({ coin })
      .sort({ timestamp: -1 }) // Get the latest record
      .exec();

    if (!latestData) {
      return res.status(404).json({ error: "Data not found for the requested coin" });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET /deviation?coin=bitcoin
router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin is required" });
  }

  try {
    const last100Records = await CryptoData.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .exec();

    if (last100Records.length === 0) {
      return res.status(404).json({ error: "Not enough data for the requested coin" });
    }

    const prices = last100Records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;