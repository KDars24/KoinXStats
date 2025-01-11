const mongoose = require("mongoose");

const cryptoDataSchema = new mongoose.Schema({
  coin: { type: String, required: true }, // e.g., 'bitcoin', 'matic-network', 'ethereum'
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true }, // 24-hour percentage change
  timestamp: { type: Date, default: Date.now } // Record timestamp
});

// Index for optimizing queries by coin and timestamp
cryptoDataSchema.index({ coin: 1, timestamp: -1 });

const CryptoData = mongoose.model("CryptoData", cryptoDataSchema);

module.exports = CryptoData;