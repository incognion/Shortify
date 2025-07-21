import { useState } from "react";
import { googleLogout } from "@react-oauth/google";

import TitleLogo from "./TitleLogo";
import UserProfile from "./UserProfile";
import SignOutModal from "../Auth/SignOutModal";

const Header = ({ user, setUser, setUserUrls, setShortUrl, onSignInClick, setNotification }) => {
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const confirmSignOut = () => {
    setUser(null);
    setUserUrls([]);
    setShortUrl("");
    localStorage.clear();
    googleLogout();
    setShowSignOutModal(false);
    setNotification({
      type: "success",
      message: "You have successfully signed out.",
    });
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <TitleLogo />

        {user ? (
          <div className="flex items-center space-x-2">
            <UserProfile user={user} />
            <button
              onClick={() => setShowSignOutModal(true)}
              className="px-2 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700 focus:outline-none transition-colors text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={onSignInClick}
            className="px-4 py-2 bg-white text-indigo-600 border border-indigo-300 rounded-lg shadow-sm hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-800 focus:outline-none transition-colors text-sm font-medium"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Sign Out Confirmation Modal */}
      <SignOutModal
        open={showSignOutModal}
        onCancel={() => setShowSignOutModal(false)}
        onConfirm={confirmSignOut}
      />
    </header>
  );
};

export default Header;
