const axios = require("axios");
const CryptoData = require("../models/CryptoData");

// CoinGecko API details
const COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price";
const COINS = ["bitcoin", "matic-network", "ethereum"];
const VS_CURRENCY = "usd";

const fetchCryptoData = async () => {
  try {
    // Fetch price, market cap, and 24h change for the coins
    const response = await axios.get(COINGECKO_API, {
      params: {
        ids: COINS.join(","),
        vs_currencies: VS_CURRENCY,
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    const data = response.data;

    // Iterate over each coin and save to DB
    for (let coin of COINS) {
      const record = new CryptoData({
        coin,
        price: data[coin][VS_CURRENCY],
        marketCap: data[coin][`${VS_CURRENCY}_market_cap`],
        change24h: data[coin][`${VS_CURRENCY}_24h_change`],
      });

      await record.save();
      console.log(`Saved data for ${coin}`);
    }
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
};

module.exports = fetchCryptoData;