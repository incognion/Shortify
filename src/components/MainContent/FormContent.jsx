import UrlForm from "../UrlForm/UrlForm";
import AnonymousUserInfo from "./AnonymousUserInfo";

const FormContent = ({
  user,
  originalUrl,
  setOriginalUrl,
  handleSubmit,
  shortUrl,
  handleCopyToClipboard,
  onSignInClick
}) => {
  return (
    <div className="space-y-6">
      <UrlForm
        user={user}
        originalUrl={originalUrl}
        setOriginalUrl={setOriginalUrl}
        handleSubmit={handleSubmit}
        shortUrl={shortUrl}
        handleCopyToClipboard={handleCopyToClipboard}
      />

      <AnonymousUserInfo 
        isAnonymous={!user}
        onSignInClick={onSignInClick} 
      />
    </div>
  );
};

export default FormContent;