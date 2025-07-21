import Url from '../../models/urlModel.js';

// Delete a short URL
const deleteShortUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Prevent deletion of anonymous URLs
  if (userId === 'anonymous') {
    return res.status(401).json({
      error: 'Authentication required to delete URLs. Please sign in.'
    });
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

export default deleteShortUrl;