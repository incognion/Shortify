import React from 'react';

const UrlList = ({ userUrls, handleRedirect, handleCopyToClipboard }) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">Your Shortened URLs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Full URL</th>
              <th className="py-2 px-4 border-b">Shortened URL</th>
              <th className="py-2 px-4 border-b">Copy</th>
            </tr>
          </thead>
          <tbody>
            {userUrls.map((url) => (
              <tr key={url.shortUrl} className="border-b">
                <td className="py-2 px-4 max-w-xs truncate">{url.originalUrl}</td>
                <td className="py-2 px-4 max-w-xs truncate">
                  <span
                    className="cursor-pointer text-blue-500 underline"
                    onClick={() => handleRedirect(url.shortUrl)}
                  >
                    {url.fullUrl}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleCopyToClipboard(url.fullUrl)}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;
