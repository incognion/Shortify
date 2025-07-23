const CustomUrlToggle = ({ checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700">Use custom short URL</span>
      <button
        type="button"
        onClick={() => !disabled && onChange({ target: { checked: !checked } })}
        className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        aria-pressed={checked}
        disabled={disabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default CustomUrlToggle;
