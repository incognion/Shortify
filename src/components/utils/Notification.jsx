import { useEffect } from "react";

const Notification = ({ notice, clear }) => {
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(clear, 4000);
    return () => clearTimeout(timer);
  }, [notice, clear]);

  if (!notice) return null;

  const isError = notice.type === "error";
  const baseClasses =
    "fixed top-4 right-1 z-50 max-w-sm w-full p-4 rounded-lg shadow-lg border";
  const typeClasses = isError
    ? "bg-red-50 border-red-200 text-red-800"
    : "bg-green-50 border-green-200 text-green-800";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {isError ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{notice.message}</p>
        </div>
        <button
          onClick={clear}
          className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
