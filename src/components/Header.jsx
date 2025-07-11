import { googleLogout } from "@react-oauth/google";

const Header = ({ user, setUser, setUserUrls }) => {
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
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Shortify</h1>
        </div>

        {/* User Info & Sign Out */}
        {user ? (
          <div className="flex items-center space-x-4">
            <img
              src={user.picture}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
              {user.name}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
