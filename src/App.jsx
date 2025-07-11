import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header";
import UrlForm from "./components/UrlForm/UrlForm";
import UrlList from "./components/UrlList/UrlList";
import AuthHandler from "./components/AuthHandler";
import Notification from "./components/Notification";
import Loader from "./components/Loader";

import { useAuth } from "./hooks/useAuth";
import { useNotification } from "./hooks/useNotification";
import { isValidUrl } from "./utils/urlUtils";
import { fetchUserUrls, shortenUrl, deleteUrl } from "./utils/apiUtils";
import { GOOGLE_CLIENT_ID, BASE_URL } from "./config/config";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { notification, setNotification } = useNotification();
  const { user, setUser, userUrls, setUserUrls, loading } =
    useAuth(setNotification);

  // Reset to first page whenever URLs or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [userUrls, itemsPerPage]);

  const handleSubmit = async (e, customUrl = null) => {
    e.preventDefault();
    if (!isValidUrl(originalUrl)) {
      setNotification({ type: "error", message: "Please enter a valid URL." });
      return;
    }

    await shortenUrl(
      originalUrl,
      user?.sub,
      customUrl,
      setShortUrl,
      setNotification,
      () => fetchUserUrls(user?.sub, setUserUrls, setNotification)
    );
    setOriginalUrl("");
  };

  const handleDeleteUrl = async (shortUrlToDelete) => {
    await deleteUrl(shortUrlToDelete, user?.sub, setNotification, () =>
      fetchUserUrls(user?.sub, setUserUrls, setNotification)
    );
  };

  const handleRedirect = (slug) =>
    (window.location.href = `${BASE_URL}/${slug}`);

  const handleCopyToClipboard = (txt) =>
    navigator.clipboard
      .writeText(txt)
      .then(() =>
        setNotification({ type: "success", message: "Copied to clipboard!" })
      );

  // Pagination logic
  const indexOfLastUrl = currentPage * itemsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - itemsPerPage;
  const currentUrls = userUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} setUser={setUser} setUserUrls={setUserUrls} />
        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 py-8">
          {loading ? (
            <Loader />
          ) : (
            <div className="space-y-8">
              {/* Auth Section */}
              {!user && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to Shortify
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Sign in to start creating and managing your short links
                  </p>
                  <AuthHandler
                    user={user}
                    setUser={setUser}
                    setUserUrls={setUserUrls}
                    fetchUserUrls={fetchUserUrls}
                    setNotification={setNotification}
                  />
                </div>
              )}

              {/* URL Form */}
              {user && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Create Short Link
                  </h2>
                  <UrlForm
                    originalUrl={originalUrl}
                    setOriginalUrl={setOriginalUrl}
                    handleSubmit={handleSubmit}
                    shortUrl={shortUrl}
                    handleCopyToClipboard={handleCopyToClipboard}
                  />
                </div>
              )}

              {/* URL List */}
              {user && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Links
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    <label
                      htmlFor="itemsPerPage"
                      className="text-sm text-gray-600"
                    >
                      Show:
                    </label>
                    <select
                      id="itemsPerPage"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </select>
                    <span className="text-sm text-gray-600">URLs per page</span>
                  </div>
                  <UrlList
                    userUrls={currentUrls}
                    handleRedirect={handleRedirect}
                    handleCopyToClipboard={handleCopyToClipboard}
                    handleDeleteUrl={handleDeleteUrl}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    totalCount={userUrls.length}
                  />
                </div>
              )}

              {/* Sign Out */}
              {user && (
                <div className="text-center">
                  <AuthHandler
                    user={user}
                    setUser={setUser}
                    setUserUrls={setUserUrls}
                    fetchUserUrls={fetchUserUrls}
                    setNotification={setNotification}
                  />
                </div>
              )}
            </div>
          )}
        </main>

        <Notification
          notice={notification}
          clear={() => setNotification(null)}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
