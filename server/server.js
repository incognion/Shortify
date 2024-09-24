const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const shortid = require('shortid');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    userId: String, // Store the user ID who created the short URL
});

const Url = mongoose.model('Url', urlSchema);

// Route to create a short URL
app.post('/shorten', async (req, res) => {
    let { originalUrl, userId } = req.body;

    // Validate and ensure the original URL includes http/https
    if (!/^https?:\/\//i.test(originalUrl)) {
        originalUrl = 'http://' + originalUrl;
    }

    const shortUrl = shortid.generate();
    const newUrl = new Url({ originalUrl, shortUrl, userId });

    try {
        await newUrl.save();
        res.json({ originalUrl, shortUrl });
    } catch (err) {
        console.error('Error saving the URL:', err);
        res.status(500).json('Server error');
    }
});

// Route to retrieve all URLs for a specific user
app.get('/urls/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const urls = await Url.find({ userId });
        res.json(urls);
    } catch (err) {
        console.error('Error retrieving URLs:', err);
        res.status(500).json('Server error');
    }
});

// Route to handle redirection
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (url) {
        res.redirect(url.originalUrl);
    } else {
        res.status(404).json('URL not found');
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
