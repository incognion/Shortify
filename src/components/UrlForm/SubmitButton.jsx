const SubmitButton = ({ isSubmitting, disabled = false, type = "submit" }) => {
  return (
    <button
      type={type}
      disabled={isSubmitting || disabled}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
    >
      {isSubmitting ? "Creating..." : "Shorten"}
    </button>
  );
};

export default SubmitButton;
