const LongUrl = ({
  urlValue,
  onUrlChange,
  isSubmitting,
  isFormDisabled
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
      {/* URL INPUT */}
      <input
        type="url"
        value={urlValue}
        onChange={onUrlChange}
        placeholder="Enter your long URL here..."
        required
        disabled={isSubmitting}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-transparent text-sm"
      />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting || isFormDisabled}
        className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg
                   hover:bg-indigo-700 focus:outline-none focus:ring-2
                   focus:ring-indigo-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-sm font-medium transition-colors"
      >
        {isSubmitting ? 'Creating…' : 'Shorten'}
      </button>
    </div>
  );
};

export default LongUrl;
