import { googleLogout } from "@react-oauth/google";

const SignOutModal = ({
  isOpen,
  onClose,
  setUser,
  setUserUrls,
  setShortUrl,
  setNotification,
}) => {
  if (!isOpen) return null;

  const handleSignOutConfirm = () => {
    setUser(null);
    setUserUrls([]);
    setShortUrl("");
    
    localStorage.clear();
    
    googleLogout();
    
    onClose();
    
    setNotification({
      type: "success",
      message: "You have successfully signed out.",
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        {/* Modal Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Confirm Sign Out
        </h3>

        {/* Modal Content */}
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to sign out?
        </p>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSignOutConfirm}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;