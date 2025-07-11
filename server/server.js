import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongoConfig.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Set COOP header for all responses
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

// Register routes
app.use(urlRoutes);

// Global error handler (best practice)
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to MongoDB and start server only if successful
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