import React from 'react';
import { BASE_URL } from '../config/config';

const UrlForm = ({
  originalUrl,
  setOriginalUrl,
  handleSubmit,
  shortUrl,
  handleCopyToClipboard,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col mb-4">
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter the URL"
          className="border border-gray-300 rounded-md p-2 mb-2 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Shorten
        </button>
      </form>

      {shortUrl && (
        <div className="mb-4">
          <p>Shortened URL:</p>
          <input
            type="text"
            value={`${BASE_URL}/${shortUrl}`}
            readOnly
            className="border border-gray-300 rounded-md p-2 mb-2 w-full outline-none"
          />
          <button
            onClick={() =>
              handleCopyToClipboard(`${BASE_URL}/${shortUrl}`)
            }
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
