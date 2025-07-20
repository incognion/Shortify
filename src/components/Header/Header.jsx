import { googleLogout } from "@react-oauth/google";

import TitleLogo from "./TitleLogo";
import UserProfile from "./UserProfile";

const Header = ({ user, setUser, setUserUrls, onSignInClick }) => {
  // console.log("Header user:", user);
  const handleSignOut = () => {
    setUser(null);
    setUserUrls([]);
    localStorage.clear();
    googleLogout();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <TitleLogo />

        {/* User Info & Sign Out OR Sign In Button */}
        {user ? (
          <div className="flex items-center space-x-2">
            <UserProfile user={user} />
            
            <button
              onClick={handleSignOut}
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
    </header>
  );
};

export default Header;
