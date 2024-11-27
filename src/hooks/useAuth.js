import { useEffect, useState, useCallback } from 'react';
import jwt_decode from 'jwt-decode';
import { fetchUserUrls } from '../utils/apiUtils';

export const useAuth = (setNotification) => {
  const [user, setUser] = useState(null);
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrls = useCallback(
    async (userId) => {
      setLoading(true);
      try {
        await fetchUserUrls(userId, setUserUrls, setNotification);
      } catch (error) {
        setNotification({ type: 'error', message: 'Failed to fetch user URLs.' });
      } finally {
        setLoading(false);
      }
    },
    [setNotification]
  );

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && Date.now() < expiration) {
      const userObject = jwt_decode(token);
      setUser(userObject);
      fetchUrls(userObject.sub);
    } else {
      localStorage.removeItem('userToken');
      localStorage.removeItem('tokenExpiration');
      setLoading(false);
    }
  }, [fetchUrls]);

  return { user, setUser, userUrls, setUserUrls, loading };
};
