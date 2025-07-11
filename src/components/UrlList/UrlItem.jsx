import { BASE_URL } from "../../config/config";

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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1 truncate">{url.originalUrl}</p>
      </div>
    </div>
  );
};

export default UrlItem;
