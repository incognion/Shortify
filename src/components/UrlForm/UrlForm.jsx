import { useState, useEffect } from "react";

import WelcomeTexts from "./WelcomeTexts";
import LongUrl from "./LongUrl";
import CustomUrlToggle from "./CustomUrlToggle";
import CustomUrlInput from "./CustomUrlInput";
import ResultDisplay from "./ResultDisplay";

const UrlForm = ({
  user,
  originalUrl,
  setOriginalUrl,
  handleSubmit,
  shortUrl,
  handleCopyToClipboard,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useCustomUrl, setUseCustomUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [customUrlStatus, setCustomUrlStatus] = useState("");

  const isAnonymous = !user;

  // Reset custom URL state when user authentication changes
  useEffect(() => {
    setUseCustomUrl(false);
    setCustomUrl("");
    setCustomUrlStatus("");
  }, [user?.sub]);

  const handleCustomUrlToggle = (e) => {
    const checked = e.target.checked;
    setUseCustomUrl(checked);
    if (!checked) {
      setCustomUrl("");
      setCustomUrlStatus("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await handleSubmit(e, useCustomUrl ? customUrl : null);
    setIsSubmitting(false);

    // Reset custom URL state after successful submission
    setUseCustomUrl(false);
    setCustomUrl("");
    setCustomUrlStatus("");
  };

  const isFormDisabled = (useCustomUrl && !customUrl.trim()) ||
    (customUrlStatus && !customUrlStatus.includes("Available"));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <WelcomeTexts user={user} />

      <form onSubmit={onSubmit} className="space-y-4">
        <LongUrl
          urlValue={originalUrl}
          onUrlChange={(e) => setOriginalUrl(e.target.value)}
          isSubmitting={isSubmitting}
          isFormDisabled={isFormDisabled}
        />

        {/* Custom URL Toggle - Only for authenticated users */}
        {!isAnonymous && (
          <CustomUrlToggle
            checked={useCustomUrl}
            onChange={handleCustomUrlToggle}
            disabled={isSubmitting}
          />
        )}

        {/* Custom URL Input - Only for authenticated users */}
        {!isAnonymous && useCustomUrl && (
          <CustomUrlInput
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            onStatusChange={setCustomUrlStatus}
            disabled={isSubmitting}
          />
        )}
      </form>

      <ResultDisplay
        shortUrl={shortUrl}
        onCopy={handleCopyToClipboard}
        isAnonymous={isAnonymous}
      />
    </div>
  );
};

export default UrlForm;
