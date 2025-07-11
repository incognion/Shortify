const DeleteModal = ({ shortUrl, isDeleting, onCancel, onConfirm }) => {
  if (!shortUrl) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Delete Short URL?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete this short URL? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700 disabled:opacity-50"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
