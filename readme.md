# Cryptocurrency Price Tracker

A Node.js application that tracks prices of Bitcoin, Ethereum, and Matic using the CoinGecko API. The application stores historical price data and provides APIs to fetch latest statistics and price deviations.

## Features

- Automated price tracking every 2 hours
- Latest cryptocurrency statistics API
- Price deviation calculation API
- Support for Bitcoin, Ethereum, and Matic
- MongoDB integration for data persistence

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
COINGECKO_API_URL=https://api.coingecko.com/api/v3
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Get Latest Cryptocurrency Statistics

```
GET /stats?coin=<coin-id>
```

Parameters:
- `coin`: One of 'bitcoin', 'ethereum', or 'matic-network'

Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Deviation

```
GET /deviation?coin=<coin-id>
```

Parameters:
- `coin`: One of 'bitcoin', 'ethereum', or 'matic-network'

Response:
```json
{
    "deviation": 4082.48
}
```

## Deployment

### MongoDB Atlas

1. Create a MongoDB Atlas account
2. Set up a new cluster
3. Get your connection string
4. Update MONGODB_URI in your environment variables

### Heroku

1. Install Heroku CLI
2. Login to Heroku:
```bash
heroku login
```

3. Create Heroku app:
```bash
heroku create
```

4. Set environment variables:
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
```

5. Deploy:
```bash
git push heroku main
```

## Project Structure

```
src/
  ├── config/         # Configuration files
  ├── models/         # Database models
  ├── jobs/          # Background jobs
  ├── routes/        # API routes
  ├── services/      # Business logic
  ├── utils/         # Utility functions
  └── app.js         # Application entry point
```

## Error Logs

Logs are stored in:
- `error.log`: Error-level logs
- `combined.log`: All logs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.