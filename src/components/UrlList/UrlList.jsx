import { useState } from "react";
import EmptyState from "./EmptyState";
import UrlItem from "./UrlItem";
import DeleteModal from "./DeleteModal";

const UrlList = ({
  userUrls,
  handleRedirect,
  handleCopyToClipboard,
  handleDeleteUrl
}) => {
  const [deletingUrls, setDeletingUrls] = useState(new Set());
  const [confirmingDelete, setConfirmingDelete] = useState(null);

  const handleConfirmDelete = async () => {
    setDeletingUrls((prev) => new Set(prev).add(confirmingDelete));
    await handleDeleteUrl(confirmingDelete);
    setDeletingUrls((prev) => {
      const newSet = new Set(prev);
      newSet.delete(confirmingDelete);
      return newSet;
    });
    setConfirmingDelete(null);
  };

  if (!userUrls || userUrls.length === 0) {
    return <EmptyState />;
  }

  return (
    <div>
      <div className="space-y-3">
        {userUrls.map((url) => (
          <UrlItem
            key={url._id}
            url={url}
            deleting={deletingUrls.has(url.shortUrl)}
            onRedirect={handleRedirect}
            onCopy={handleCopyToClipboard}
            onRequestDelete={setConfirmingDelete}
          />
        ))}
      </div>

      <DeleteModal
        shortUrl={confirmingDelete}
        isDeleting={deletingUrls.has(confirmingDelete)}
        onCancel={() => setConfirmingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UrlList;
