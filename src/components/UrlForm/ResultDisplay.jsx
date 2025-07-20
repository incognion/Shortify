import { BASE_URL } from "../../config/config";

const ResultDisplay = ({ shortUrl, onCopy }) => {
  if (!shortUrl) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 mb-1">Your shortened URL:</p>
          <code className="text-sm font-mono text-indigo-600 break-all">
            {BASE_URL}/{shortUrl}
          </code>
        </div>
        <button
          onClick={() => onCopy(`${BASE_URL}/${shortUrl}`)}
          className="ml-3 px-3 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 transition-colors"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;