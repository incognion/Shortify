const express = require('express');
const shortid = require('shortid');
const Url = require('../models/urlModel');

const router = express.Router();

// Route to create a short URL
router.post('/shorten', async (req, res) => {
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
router.get('/urls/:userId', async (req, res) => {
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
router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });
    if (url) {
        res.redirect(url.originalUrl);
    } else {
        res.status(404).json('URL not found');
    }
});

module.exports = router;
