import axios from 'axios';
import { BASE_URL } from '../config/config';

export const fetchUserUrls = async (userId, setUserUrls, setNotification) => {
  try {
    const response = await axios.get(`${BASE_URL}/urls/${userId}`);
    const mappedUrls = response.data.map((url) => ({
      ...url,
      fullUrl: `${BASE_URL}/${url.shortUrl}`,
    }));
    setUserUrls(mappedUrls);
  } catch (error) {
    console.error('Error fetching user URLs', error);
    setNotification && setNotification({ type: 'error', message: 'Error fetching URLs.' });
  }
};

export const shortenUrl = async (originalUrl, userId, setShortUrl, setNotification, refreshUrls) => {
  try {
    const response = await axios.post(`${BASE_URL}/shorten`, {
      originalUrl,
      userId,
    });
    setShortUrl(response.data.shortUrl);
    setNotification && setNotification({ type: 'success', message: 'URL shortened successfully!' });
    refreshUrls && refreshUrls(userId);
  } catch (error) {
    console.error('Error shortening URL', error);
    setNotification && setNotification({ type: 'error', message: 'Error shortening URL.' });
  }
};
