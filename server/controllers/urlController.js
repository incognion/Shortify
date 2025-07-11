import shortid from 'shortid';
import Url from '../models/urlModel.js';

// Create a short URL
const createShortUrl = async (req, res) => {
    let { originalUrl, userId, customShortUrl } = req.body;

    if (!/^https?:\/\//i.test(originalUrl)) {
        originalUrl = 'http://' + originalUrl;
    }

    let shortUrl;

    // Check if user provided a custom short URL
    if (customShortUrl) {
        // Validate custom short URL format
        if (!/^[a-zA-Z0-9-_]+$/.test(customShortUrl)) {
            return res.status(400).json({
                error: 'Custom URL can only contain letters, numbers, hyphens, and underscores'
            });
        }

        // Check length constraints
        if (customShortUrl.length < 3 || customShortUrl.length > 20) {
            return res.status(400).json({
                error: 'Custom URL must be between 3 and 20 characters long'
            });
        }

        // Check if custom short URL already exists in the entire database
        const existingUrl = await Url.findOne({ shortUrl: customShortUrl });
        if (existingUrl) {
            return res.status(409).json({
                error: 'This custom URL is already taken. Please choose a different one.'
            });
        }

        shortUrl = customShortUrl;
    } else {
        // Generate random short URL using shortid
        shortUrl = shortid.generate();
    }

    const newUrl = new Url({ originalUrl, shortUrl, userId });

    try {
        await newUrl.save();
        res.json({ originalUrl, shortUrl });
    } catch (err) {
        console.error('Error saving the URL:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Retrieve all URLs for a specific user
const getUserUrls = async (req, res) => {
    const { userId } = req.params;
    try {
        const urls = await Url.find({ userId }).sort({ _id: -1 });
        res.json(urls);
    } catch (err) {
        console.error('Error retrieving URLs:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Handle URL redirection
const redirectShortUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        console.error('Error handling redirection:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a short URL
const deleteShortUrl = async (req, res) => {
    const { shortUrl } = req.params;
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const deletedUrl = await Url.findOneAndDelete({ shortUrl, userId });

        if (!deletedUrl) {
            return res.status(404).json({
                error: 'URL not found or you do not have permission to delete it'
            });
        }

        res.json({
            message: 'URL deleted successfully',
            deletedUrl: deletedUrl.shortUrl
        });
    } catch (err) {
        console.error('Error deleting URL:', err);
        res.status(500).json({ error: 'Server error' });
    }
};


// Check if a custom short URL is available
const checkCustomUrlAvailability = async (req, res) => {
    const { customShortUrl } = req.params;

    try {
        const existingUrl = await Url.findOne({ shortUrl: customShortUrl });
        res.json({
            available: !existingUrl,
            message: existingUrl ? 'This URL is already taken' : 'This URL is available'
        });
    } catch (err) {
        console.error('Error checking URL availability:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const urlController = {
    createShortUrl,
    getUserUrls,
    redirectShortUrl,
    deleteShortUrl,
    checkCustomUrlAvailability
};

export default urlController;
