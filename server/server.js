const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectMongoDB = require('./config/mongoConfig');
const urlRoutes = require('./routes/urlRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
connectMongoDB();

// Routes
app.use(urlRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
