import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongoConfig.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Apply CORS middleware
app.use(
  cors({
    origin: ['https://shortifyplus.onrender.com'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Handle preflight OPTIONS requests
app.options('*', cors());

// Manual CORS headers as a fallback (ensure headers are always set)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://shortifyplus.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Set COOP header for popup compatibility
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// Register routes
app.use(urlRoutes);

// Redirect root backend URL to frontend
app.get('/', (req, res) => {
  res.redirect('https://shortifyplus.onrender.com/');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server and connect to MongoDB
const port = process.env.PORT || 5000;
(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB. Server not started.', err);
    process.exit(1);
  }
})();
