import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header/Header";
import FormContent from "./components/MainContent/FormContent";
import UserUrlsSection from "./components/MainContent/UserUrlsSection";
import AuthModal from "./components/Auth/AuthModal";
import Notification from "./components/UtilComponents/Notification";
import Loader from "./components/UtilComponents/Loader";

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
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { notification, setNotification } = useNotification();
  const { user, setUser, userUrls, setUserUrls, loading } =
    useAuth(setNotification);

  useEffect(() => {
    setCurrentPage(1);
  }, [userUrls, itemsPerPage]);

  const handleSubmit = async (e, customUrl = null) => {
    e.preventDefault();
    if (!isValidUrl(originalUrl)) {
      setNotification({ type: "error", message: "Please enter a valid URL." });
      return;
    }

    const effectiveUserId = user?.sub || "anonymous";

    await shortenUrl(
      originalUrl,
      effectiveUserId,
      customUrl,
      setShortUrl,
      setNotification,
      user ? () => fetchUserUrls(user?.sub, setUserUrls, setNotification) : null
    );
    setOriginalUrl("");
  };

  const handleDeleteUrl = async (shortUrlToDelete) => {
    await deleteUrl(shortUrlToDelete, user?.sub, setNotification, () =>
      fetchUserUrls(user?.sub, setUserUrls, setNotification)
    );
  };

  const handleRedirect = (slug) => {
    window.location.href = `${BASE_URL}/${slug}`;
  };

  const handleCopyToClipboard = (txt) => {
    navigator.clipboard
      .writeText(txt)
      .then(() =>
        setNotification({ type: "success", message: "Copied to clipboard!" })
      );
  };

  const handleSignInClick = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);

  // Pagination logic
  const indexOfLastUrl = currentPage * itemsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - itemsPerPage;
  const currentUrls = userUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          setUser={setUser}
          setUserUrls={setUserUrls}
          setShortUrl={setShortUrl}
          onSignInClick={handleSignInClick}
          setNotification={setNotification}
        />

        <main className="max-w-2xl mx-auto px-4 py-6">
          {loading ? (
            <Loader />
          ) : (
            <>
              <FormContent
                user={user}
                originalUrl={originalUrl}
                setOriginalUrl={setOriginalUrl}
                handleSubmit={handleSubmit}
                shortUrl={shortUrl}
                handleCopyToClipboard={handleCopyToClipboard}
                onSignInClick={handleSignInClick}
              />

              <UserUrlsSection
                user={user}
                userUrls={userUrls}
                currentUrls={currentUrls}
                handleRedirect={handleRedirect}
                handleCopyToClipboard={handleCopyToClipboard}
                handleDeleteUrl={handleDeleteUrl}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setCurrentPage={setCurrentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>

        <AuthModal
          showAuthModal={showAuthModal}
          onCloseAuthModal={handleCloseAuthModal}
          user={user}
          setUser={setUser}
          setUserUrls={setUserUrls}
          fetchUserUrls={fetchUserUrls}
          setShortUrl={setShortUrl}
          setNotification={setNotification}
        />

        <Notification
          notice={notification}
          clear={() => setNotification(null)}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
