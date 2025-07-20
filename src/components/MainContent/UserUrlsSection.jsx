import UrlList from "../UrlList/UrlList";
import TopControl from "../utils/pagination/TopControl";
import BottomControl from "../utils/pagination/BottomControl";

const UserUrlsSection = ({
  user,
  userUrls,
  currentUrls,
  handleRedirect,
  handleCopyToClipboard,
  handleDeleteUrl,
  currentPage = 1,
  itemsPerPage = 5,
  setItemsPerPage,
  setCurrentPage,
  onPageChange
}) => {
  if (!user) return null;
  
  const totalPages = Math.ceil(userUrls.length / itemsPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 my-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Your Links
      </h2>
      
      <TopControl
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      
      <UrlList
        userUrls={currentUrls}
        handleRedirect={handleRedirect}
        handleCopyToClipboard={handleCopyToClipboard}
        handleDeleteUrl={handleDeleteUrl}
      />
      
      {totalPages > 1 && (
        <BottomControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      
    </div>
  );
};

export default UserUrlsSection;