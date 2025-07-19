import Url from '../../models/urlModel.js';

// Retrieve all URLs for a specific user
const getUserUrls = async (req, res) => {
  const { userId } = req.params;
  
  // Prevent access to anonymous URLs
  if (!userId || userId === 'anonymous') {
    return res.status(401).json({ 
      error: 'Authentication required to view URL history. Please sign in.' 
    });
  }

  try {
    const urls = await Url.find({ userId }).sort({ _id: -1 });
    res.json(urls);
  } catch (err) {
    console.error('Error retrieving URLs:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export default getUserUrls;