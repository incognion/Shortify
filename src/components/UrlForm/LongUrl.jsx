const LongUrl = ({ urlValue, onUrlChange, isSubmitting, isFormDisabled }) => {
  return (
    <div className="w-full bg-gray-50 border border-gray-100 rounded-lg p-6 shadow-sm">
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-gray-800">Paste Long URL</h2>
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
      {/* URL INPUT */}
      <input
        type="url"
        value={urlValue}
        onChange={onUrlChange}
        placeholder="https://your-long-url.com/page"
        required
        disabled={isSubmitting}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-1 focus:ring-indigo-500
                   focus:border-transparent text-sm"
      />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting || isFormDisabled}
        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg
                   hover:bg-indigo-700 focus:outline-none
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-sm font-medium transition-colors"
      >
        {isSubmitting ? "Creating…" : "Shorten"}
      </button>
    </div>
      </div>
    </div>
  );
};

export default LongUrl;
