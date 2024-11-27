const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

module.exports = connectMongoDB;
