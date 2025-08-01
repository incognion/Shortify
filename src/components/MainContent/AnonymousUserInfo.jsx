import KeyIcon from "../UtilComponents/icons/KeyIcon";
import UserPlusIcon from "../UtilComponents/icons/UserPlusIcon";

const AnonymousUserInfo = ({ isAnonymous, onSignInClick }) => {
  if (!isAnonymous) return null;

  return (
    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
      <div className="flex items-center justify-center mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <KeyIcon />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Unlock More Features
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Create custom short links, track your URLs, and manage your link
          history with a free account.
        </p>

        <button
          onClick={onSignInClick}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg border border-indigo-600 hover:bg-white hover:text-indigo-600 focus:bg-white focus:text-indigo-600 transition-colors duration-400 focus:outline-none"
        >
          <UserPlusIcon />
          Sign In to Get Started
        </button>
      </div>
    </div>
  );
};

export default AnonymousUserInfo;
