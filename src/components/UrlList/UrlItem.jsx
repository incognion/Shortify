import { BASE_URL } from "../../config/config";
import CopyIcon from "../UtilComponents/icons/CopyIcon";
import DeleteIcon from "../UtilComponents/icons/DeleteIcon";

const UrlItem = ({ url, deleting, onRedirect, onCopy, onRequestDelete }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${
        deleting ? "opacity-50" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onRedirect(url.shortUrl)}
            className="truncate text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            title="Go to short URL"
          >
            {BASE_URL}/{url.shortUrl}
          </button>
          <button
            onClick={() => onCopy(`${BASE_URL}/${url.shortUrl}`)}
            className="text-gray-400 hover:text-indigo-600 transition-colors"
            title="Copy to clipboard"
            aria-label="Copy"
          >
            <CopyIcon />
          </button>
          <button
            onClick={() => onRequestDelete(url.shortUrl)}
            disabled={deleting}
            className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Delete URL"
            aria-label="Delete"
          >
            {deleting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            ) : (
              <DeleteIcon />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">{url.originalUrl}</p>
      </div>
    </div>
  );
};

export default UrlItem;
