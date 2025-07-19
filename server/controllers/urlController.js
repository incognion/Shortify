import createShortUrl from './createShortUrl.js';
import getUserUrls from './getUserUrls.js';
import redirectShortUrl from './redirectShortUrl.js';
import deleteShortUrl from './deleteShortUrl.js';
import checkCustomUrlAvailability from './checkCustomUrlAvailability.js';

// Consolidate all URL-related controllers
const urlController = {
    createShortUrl,
    getUserUrls,
    redirectShortUrl,
    deleteShortUrl,
    checkCustomUrlAvailability
};

export default urlController;