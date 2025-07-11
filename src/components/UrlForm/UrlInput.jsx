const UrlInput = ({ value, onChange, disabled = false }) => {
  return (
    <input
      type="url"
      value={value}
      onChange={onChange}
      placeholder="Enter your long URL here..."
      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
      required
      disabled={disabled}
    />
  );
};

export default UrlInput;
