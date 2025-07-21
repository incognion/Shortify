import LinkIcon from "../UtilComponents/icons/LinkIcon";

const WelcomeTexts = ({ user }) => {
  return (
    <div className="flex flex-col items-center gap-1 border border-gray-100 rounded-lg bg-gray-50 py-3 px-2 mb-3">
      <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-50 text-indigo-500 rounded-full">
        <LinkIcon />
      </span>
      {!user ? (
        <>
          <span className="text-base font-semibold text-gray-800">
            Shorten URLs instantly
          </span>
          <span className="text-sm text-gray-500">
            No login needed. Paste a link, get a short URL.
          </span>
        </>
      ) : (
        <span className="text-base font-semibold text-gray-800">
          Welcome, {user?.name?.split(" ")[0] || "User"}!
        </span>
      )}
    </div>
  );
};

export default WelcomeTexts;
