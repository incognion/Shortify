import axios from 'axios';
import { BASE_URL } from '../config/config.js';

export const fetchUserUrls = async (userId, setUserUrls, setNotification) => {
  try {
    const response = await axios.get(`${BASE_URL}/urls/${userId}`);
    const mappedUrls = response.data
      .map((url) => ({
        ...url,
        fullUrl: `${BASE_URL}/${url.shortUrl}`,
      }));
    setUserUrls(mappedUrls);
  } catch (error) {
    console.error('Error fetching user URLs', error);
    setNotification && setNotification({ type: 'error', message: 'Error fetching URLs.' });
  }
};

export const shortenUrl = async (originalUrl, userId, customShortUrl, setShortUrl, setNotification, refreshUrls) => {
  try {
    const payload = {
      originalUrl,
      userId,
    };

    // Add custom URL if provided
    if (customShortUrl && customShortUrl.trim()) {
      payload.customShortUrl = customShortUrl.trim();
    }

    const response = await axios.post(`${BASE_URL}/shorten`, payload);
    setShortUrl(response.data.shortUrl);
    setNotification && setNotification({ type: 'success', message: 'URL shortened successfully!' });
    refreshUrls && refreshUrls(userId);
  } catch (error) {
    console.error('Error shortening URL', error);

    // Handle specific errors from backend
    if (error.response && error.response.data && error.response.data.error) {
      setNotification && setNotification({ type: 'error', message: error.response.data.error });
    } else {
      setNotification && setNotification({ type: 'error', message: 'Error shortening URL.' });
    }
  }
};

export const deleteUrl = async (shortUrl, userId, setNotification, refreshUrls) => {
  try {
    await axios.delete(`${BASE_URL}/delete/${shortUrl}`, {
      data: { userId }
    });
    setNotification && setNotification({ type: 'success', message: 'URL deleted successfully!' });
    refreshUrls && refreshUrls(userId);
  } catch (error) {
    console.error('Error deleting URL', error);

    if (error.response && error.response.data && error.response.data.error) {
      setNotification && setNotification({ type: 'error', message: error.response.data.error });
    } else {
      setNotification && setNotification({ type: 'error', message: 'Error deleting URL.' });
    }
  }
};

export const checkCustomUrlAvailability = async (customShortUrl) => {
  try {
    const response = await axios.get(`${BASE_URL}/check/${customShortUrl}`);
    return response.data;
  } catch (error) {
    console.error('Error checking URL availability', error);
    return { available: false, message: 'Error checking availability' };
  }
};
