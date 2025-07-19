import Url from '../../models/urlModel.js';

// Handle URL redirection
const redirectShortUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.redirect('https://shortifyplus.onrender.com/');
            // res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        console.error('Error handling redirection:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export default redirectShortUrl;