import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/config";
import { checkCustomUrlAvailability } from "../../utils/apiUtils";

const CustomUrlInput = ({
  value,
  onChange,
  onStatusChange,
  disabled = false,
}) => {
  const [status, setStatus] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  // Check custom URL availability with debounce
  useEffect(() => {
    if (!value.trim()) {
      setStatus("");
      onStatusChange && onStatusChange("");
      return;
    }

    const timeoutId = setTimeout(async () => {
      if (value.length < 3) {
        const errorStatus = "Custom URL must be at least 3 characters long";
        setStatus(errorStatus);
        onStatusChange && onStatusChange(errorStatus);
        return;
      }

      if (value.length > 20) {
        const errorStatus = "Custom URL must be 20 characters or less";
        setStatus(errorStatus);
        onStatusChange && onStatusChange(errorStatus);
        return;
      }

      if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
        const errorStatus =
          "Custom URL can only contain letters, numbers, hyphens, and underscores";
        setStatus(errorStatus);
        onStatusChange && onStatusChange(errorStatus);
        return;
      }

      setIsChecking(true);
      const result = await checkCustomUrlAvailability(value);
      const resultStatus = result.available ? "Available!" : "Already taken";
      setStatus(resultStatus);
      onStatusChange && onStatusChange(resultStatus);
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value, onStatusChange]);

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {/* Base URL always on its own line on mobile, inline on desktop */}
        <span className="text-sm text-gray-500">{BASE_URL}/</span>
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="your-custom-url"
            className="min-w-[120px] w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_-]+"
            disabled={disabled}
          />
          <div className="w-5 h-5 flex items-center justify-center">
            {isChecking && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
            )}
          </div>
        </div>
      </div>

      {status && (
        <p
          className={`text-xs ${
            status.includes("Available") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default CustomUrlInput;
