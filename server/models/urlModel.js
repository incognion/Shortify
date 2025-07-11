import mongoose from 'mongoose';

// URL schema
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
