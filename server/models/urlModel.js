const mongoose = require('mongoose');

// URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    userId: String,
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
