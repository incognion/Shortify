import Url from '../../models/urlModel.js';

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

export default checkCustomUrlAvailability;