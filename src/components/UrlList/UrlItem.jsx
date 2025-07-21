import { BASE_URL } from "../../config/config";
import CopyIcon from "../UtilComponents/icons/CopyIcon";
import DeleteIcon from "../UtilComponents/icons/DeleteIcon";

const UrlItem = ({ url, deleting, onRedirect, onCopy, onRequestDelete }) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition ${
        deleting ? "opacity-50" : ""
      }`}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onRedirect(url.shortUrl)}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm truncate"
            title="Go to short URL"
          >
            {BASE_URL}/{url.shortUrl}
          </button>

          <div className="flex items-center gap-3 flex-shrink-0 pl-2">
            <button
              onClick={() => onCopy(`${BASE_URL}/${url.shortUrl}`)}
              className="text-gray-400 hover:text-indigo-600 transition"
              title="Copy to clipboard"
              aria-label="Copy"
            >
              <CopyIcon />
            </button>
            <button
              onClick={() => onRequestDelete(url.shortUrl)}
              disabled={deleting}
              className="text-gray-400 hover:text-red-600 transition disabled:opacity-50"
              title="Delete URL"
              aria-label="Delete"
            >
              {deleting ? (
                <div className="h-4 w-4 border-2 border-red-600 border-b-transparent rounded-full animate-spin"></div>
              ) : (
                <DeleteIcon />
              )}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-1 truncate">{url.originalUrl}</p>
      </div>
    </div>
  );
};

export default UrlItem;
