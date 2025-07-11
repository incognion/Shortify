const CustomUrlToggle = ({ checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="useCustomUrl"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
      />
      <label htmlFor="useCustomUrl" className="text-sm text-gray-700">
        Use custom short URL
      </label>
    </div>
  );
};

export default CustomUrlToggle;
