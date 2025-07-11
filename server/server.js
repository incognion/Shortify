import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongoConfig.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Proper CORS configuration: allow only your frontend origin
app.use(
  cors({
    origin: 'https://shortifyplus.onrender.com',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Set COOP header for all responses
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

// Global error handler (best practice)
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
