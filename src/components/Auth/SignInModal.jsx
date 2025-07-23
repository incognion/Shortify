import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import CrossIcon from "../UtilComponents/icons/CrossIcon";

const SignInModal = ({
  isOpen,
  onClose,
  user,
  setUser,
  setUserUrls,
  fetchUserUrls,
  setShortUrl,
  setNotification,
}) => {
  if (!isOpen) return null;

  const handleSignInSuccess = (res) => {
    const profile = jwt_decode(res.credential);
    setUser(profile);
    
    localStorage.setItem("userToken", res.credential);
    localStorage.setItem("tokenExpiration", Date.now() + 24 * 60 * 60 * 1000);
    
    fetchUserUrls(profile.sub, setUserUrls, setNotification);
    
    setShortUrl("");
    
    onClose();
    
    setNotification({
      type: "success",
      message: `Welcome, ${profile.name}!`,
    });
  };

  const handleSignInError = () => {
    setNotification({
      type: "error",
      message: "Sign in failed. Please try again.",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Welcome to Shortify
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CrossIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <p className="text-gray-600 mb-6 text-center">
          Sign in to create custom URLs and manage your link history
        </p>

        {/* Google Sign In Button */}
        <div className="flex items-center justify-center">
          {!user && (
            <GoogleLogin
              onSuccess={handleSignInSuccess}
              onError={handleSignInError}
              text="signin_with"
              shape="rectangular"
              theme="outline"
              width="260"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInModal;