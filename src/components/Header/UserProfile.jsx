const UserProfile = ({ user }) => {
  return (
    <>
      <img
        src={user.picture}
        alt={user.name}
        className="w-8 h-8 rounded-full"
        onError={(e) => {
          console.error("Profile image failed to load:", e);
          e.currentTarget.src = "./default_img.svg";
        }}
      />

      <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
        {user.name}
      </span>
    </>
  );
};

export default UserProfile;
