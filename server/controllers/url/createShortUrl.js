import shortid from 'shortid';
import Url from '../../models/urlModel.js';

// Create a short URL
const createShortUrl = async (req, res) => {
    let { originalUrl, userId, customShortUrl } = req.body;

    if (!/^https?:\/\//i.test(originalUrl)) {
        originalUrl = 'http://' + originalUrl;
    }

    let shortUrl;

    // Check if user provided a custom short URL
    if (customShortUrl) {
        // Custom URLs require authentication
        if (!userId || userId === 'anonymous') {
            return res.status(401).json({
                error: 'Custom URLs require user authentication. Please sign in to use this feature.'
            });
        }

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

    // Set default userId for anonymous users
    const finalUserId = userId || 'anonymous';

    const newUrl = new Url({ originalUrl, shortUrl, userId: finalUserId });

    try {
        await newUrl.save();
        res.json({
            originalUrl,
            shortUrl,
            isAnonymous: finalUserId === 'anonymous'
        });
    } catch (err) {
        console.error('Error saving the URL:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export default createShortUrl;