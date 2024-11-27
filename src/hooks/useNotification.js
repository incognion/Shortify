import { useState, useEffect } from 'react';

export const useNotification = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return { notification, setNotification };
};
