import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import UrlList from './components/UrlList';
import UrlForm from './components/UrlForm';
import AuthHandler from './components/AuthHandler';
import Notification from './components/Notification';
import Loader from './components/Loader';

import { useAuth } from './hooks/useAuth';
import { useNotification } from './hooks/useNotification';
import { isValidUrl } from './utils/urlUtils';
import { fetchUserUrls, shortenUrl } from './utils/apiUtils';
import { GOOGLE_CLIENT_ID, BASE_URL } from './config/config';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const { notification, setNotification } = useNotification();
  const { user, setUser, userUrls, setUserUrls, loading } = useAuth(setNotification);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(originalUrl)) {
      setNotification({ type: 'error', message: 'Please enter a valid URL.' });
      return;
    }

    try {
      await shortenUrl(originalUrl, user.sub, setShortUrl, setNotification, () =>
        fetchUserUrls(user.sub, setUserUrls, setNotification)
      );
      setOriginalUrl('');
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to shorten URL.' });
    }
  };

  const handleRedirect = (shortUrl) => {
    window.location.href = `${BASE_URL}/${shortUrl}`;
  };

  const handleCopyToClipboard = (fullUrl) => {
    navigator.clipboard.writeText(fullUrl);
    setNotification({ type: 'success', message: 'Shortened URL copied to clipboard!' });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Shortify Plus</h1>

        {loading ? (
          <Loader />
        ) : (
          <>
            <Notification notification={notification} />

            <AuthHandler
              user={user}
              setUser={setUser}
              setUserUrls={setUserUrls}
              fetchUserUrls={fetchUserUrls}
              setNotification={setNotification}
            />

            {user && (
              <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4">
                <UrlForm
                  originalUrl={originalUrl}
                  setOriginalUrl={setOriginalUrl}
                  handleSubmit={handleSubmit}
                  shortUrl={shortUrl}
                  handleCopyToClipboard={handleCopyToClipboard}
                />

                <UrlList
                  userUrls={userUrls}
                  handleRedirect={handleRedirect}
                  handleCopyToClipboard={handleCopyToClipboard}
                />
              </div>
            )}
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
