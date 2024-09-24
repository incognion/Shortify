import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

function App() {
  const [user, setUser] = useState({});
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [userUrls, setUserUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);
    setUser(userObject);

    localStorage.setItem('userToken', response.credential);
    localStorage.setItem('tokenExpiration', Date.now() + 24 * 60 * 60 * 1000);

    fetchUserUrls(userObject.sub);
    setOriginalUrl('');
    setShortUrl('');
  };

  const handleSignOut = () => {
    setUser({});
    setUserUrls([]);
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiration');
    googleLogout();

    setOriginalUrl('');
    setShortUrl('');
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && Date.now() < expiration) {
      const userObject = jwt_decode(token);
      setUser(userObject);
      fetchUserUrls(userObject.sub);
    } else {
      localStorage.removeItem('userToken');
      localStorage.removeItem('tokenExpiration');
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null); // Clear notification after 3 seconds
      }, 1000);

      return () => clearTimeout(timer); // Clean up timer on unmount or when notification changes
    }
  }, [notification]);

  const isValidUrl = (urlString) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-z0-9](?!-)[a-z0-9-]{0,61}[a-z0-9])\\.)+[a-z]{2,6}|' +
      'localhost|' +
      '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' +
      '\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)' +
      '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)*$',
      'i'
    );
    return !!pattern.test(urlString);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(originalUrl)) {
      setNotification({ type: 'error', message: 'Please enter a valid URL.' });
      return;
    }

    try {
      const response = await axios.post('https://srfty.onrender.com/shorten', {
        originalUrl,
        userId: user.sub,
      });
      setShortUrl(response.data.shortUrl);
      fetchUserUrls(user.sub);
      setOriginalUrl('');
      setNotification({ type: 'success', message: 'URL shortened successfully!' });
    } catch (error) {
      setNotification({ type: 'error', message: 'Error shortening URL.' });
      console.error('Error shortening URL', error);
    }
  };

  const handleRedirect = (shortUrl) => {
    window.location.href = `https://srfty.onrender.com/${shortUrl}`;
  };

  const handleCopyToClipboard = (fullUrl) => {
    navigator.clipboard.writeText(fullUrl);
    setNotification({ type: 'success', message: 'Shortened URL copied to clipboard!' });
  };

  const fetchUserUrls = async (userId) => {
    try {
      const response = await axios.get(`https://srfty.onrender.com/urls/${userId}`);
      const mappedUrls = response.data.map((url) => ({
        ...url,
        fullUrl: `https://srfty.onrender.com/${url.shortUrl}`,
      }));
      setUserUrls(mappedUrls);
    } catch (error) {
      console.error('Error fetching user URLs', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">Shortify Plus</h1>

        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : (
          <>
            {notification && (
              <div
                className={`mb-4 p-2 rounded ${
                  notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}
              >
                {notification.message}
              </div>
            )}

            <div className="flex justify-between items-center w-full max-w-xl mx-auto mb-4">
              <div className="flex items-center">
                {Object.keys(user).length !== 0 && (
                  <>
                    <img
                      src={user.picture}
                      alt=""
                      className="w-10 h-10 rounded-full mr-2"
                    />
                    <h1 className="text-xl font-semibold">{user.name}</h1>
                  </>
                )}
              </div>
              {Object.keys(user).length !== 0 && (
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Sign Out
                </button>
              )}
            </div>

            <div className="mb-4">
              {Object.keys(user).length === 0 && (
                <GoogleLogin
                  onSuccess={handleCallbackResponse}
                  onError={() => {
                    setNotification({ type: 'error', message: 'Login Failed' });
                  }}
                />
              )}
            </div>

            {Object.keys(user).length !== 0 && (
              <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4">
                <form onSubmit={handleSubmit} className="flex flex-col mb-4">
                  <input
                    type="text"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="Enter the URL"
                    className="border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Shorten
                  </button>
                </form>
                {shortUrl && (
                  <div className="mb-4">
                    <p>Shortened URL:</p>
                    <input
                      type="text"
                      value={`https://srfty.onrender.com/${shortUrl}`}
                      readOnly
                      className="border border-gray-300 rounded-md p-2 mb-2 w-full"
                    />
                    <button
                      onClick={() =>
                        handleCopyToClipboard(`https://srfty.onrender.com/${shortUrl}`)
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2">Your Shortened URLs</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Full URL</th>
                        <th className="py-2 px-4 border-b">Shortened URL</th>
                        <th className="py-2 px-4 border-b">Copy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userUrls.map((url) => (
                        <tr key={url.shortUrl} className="border-b">
                          <td className="py-2 px-4 max-w-xs truncate">
                            {url.originalUrl}
                          </td>
                          <td className="py-2 px-4 max-w-xs truncate">
                            <span
                              className="cursor-pointer text-blue-500 underline"
                              onClick={() => handleRedirect(url.shortUrl)}
                            >
                              {url.fullUrl}
                            </span>
                          </td>
                          <td className="py-2 px-4">
                            <button
                              onClick={() => handleCopyToClipboard(url.fullUrl)}
                              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                            >
                              Copy
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
