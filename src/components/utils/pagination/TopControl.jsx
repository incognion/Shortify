const TopControl = ({ itemsPerPage, setItemsPerPage, setCurrentPage }) => {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
        Show:
      </label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="px-2 py-1 border border-gray-300 rounded text-sm"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
      </select>
      <span className="text-sm text-gray-600">URLs per page</span>
    </div>
  );
};

export default TopControl;