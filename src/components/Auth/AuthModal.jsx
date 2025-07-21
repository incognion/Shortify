import AuthHandler from "./AuthHandler";
import AuthTexts from "./AuthTexts";

const AuthModal = ({
  showAuthModal,
  onCloseAuthModal,
  user,
  setUser,
  setUserUrls,
  fetchUserUrls,
  setShortUrl,
  setNotification,
}) => {
  if (!showAuthModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <AuthTexts onCloseAuthModal={onCloseAuthModal} />

        <AuthHandler
          user={user}
          setUser={setUser}
          setUserUrls={setUserUrls}
          fetchUserUrls={fetchUserUrls}
          setShortUrl={setShortUrl}
          setNotification={setNotification}
          onSuccess={onCloseAuthModal}
        />
      </div>
    </div>
  );
};

export default AuthModal;
