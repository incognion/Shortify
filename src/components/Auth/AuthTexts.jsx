import CrossIcon from "../UtilComponents/icons/CrossIcon";

const AuthTexts = ({ onCloseAuthModal }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Welcome to Shortify
        </h3>
        <button
          onClick={onCloseAuthModal}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <CrossIcon className="w-6 h-6" />
        </button>
      </div>
      <p className="text-gray-600 mb-6 text-center">
        Sign in to create custom URLs and manage your link history
      </p>
    </>
  );
};

export default AuthTexts;
