const TopControl = ({ itemsPerPage, setItemsPerPage, setCurrentPage }) => {
  const options = [5, 10, 15];

  const handleClick = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-sm text-gray-600">Show</span>
      <div className="flex items-center bg-gray-100 px-1 py-1 rounded-full">
        {options.map((value) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              itemsPerPage === value
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-600">URLs per page</span>
    </div>
  );
};

export default TopControl;
