import { useState } from "react";
import UrlInput from "./UrlInput";
import CustomUrlToggle from "./CustomUrlToggle";
import CustomUrlInput from "./CustomUrlInput";
import SubmitButton from "./SubmitButton";
import ResultDisplay from "./ResultDisplay";

const UrlForm = ({
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

    // Reset custom URL fields after successful submission
    setUseCustomUrl(false);
    setCustomUrl("");
    setCustomUrlStatus("");
  };

  const isFormDisabled =
    isSubmitting ||
    (useCustomUrl && !customUrl.trim()) ||
    (customUrlStatus && !customUrlStatus.includes("Available"));

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Main URL Input and Submit Button */}
        <div className="flex space-x-2">
          <UrlInput
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            disabled={isSubmitting}
          />
          <SubmitButton isSubmitting={isSubmitting} disabled={isFormDisabled} />
        </div>

        {/* Custom URL Toggle */}
        <CustomUrlToggle
          checked={useCustomUrl}
          onChange={handleCustomUrlToggle}
          disabled={isSubmitting}
        />

        {/* Custom URL Input */}
        {useCustomUrl && (
          <CustomUrlInput
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            onStatusChange={setCustomUrlStatus}
            disabled={isSubmitting}
          />
        )}
      </form>

      {/* Result Display */}
      <ResultDisplay shortUrl={shortUrl} onCopy={handleCopyToClipboard} />
    </div>
  );
};

export default UrlForm;
