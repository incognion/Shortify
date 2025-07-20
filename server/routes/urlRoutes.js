import express from 'express';
import urlController from '../controllers/url/urlController.js';

const router = express.Router();

// Create short URL (supports both regular and custom URLs)
router.post('/shorten', urlController.createShortUrl);

// Get all URLs for a specific user
router.get('/urls/:userId', urlController.getUserUrls);

// Delete a specific short URL
router.delete('/delete/:shortUrl', urlController.deleteShortUrl);

// Check if custom short URL is available
router.get('/check/:customShortUrl', urlController.checkCustomUrlAvailability);

// Redirect short URL (should be last to avoid conflicts)
router.get('/:shortUrl', urlController.redirectShortUrl);

export default router;