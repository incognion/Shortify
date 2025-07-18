import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const AuthHandler = ({
  user,
  setUser,
  setUserUrls,
  fetchUserUrls,
  setNotification,
}) => {
  const handleCallbackResponse = (res) => {
    const profile = jwt_decode(res.credential);
    setUser(profile);
    localStorage.setItem("userToken", res.credential);
    localStorage.setItem("tokenExpiration", Date.now() + 24 * 60 * 60 * 1000);
    fetchUserUrls(profile.sub, setUserUrls, setNotification);
  };

  return (
    <div className="flex items-center justify-center">
      {!user && (
        <GoogleLogin
          onSuccess={handleCallbackResponse}
          onError={() =>
            setNotification({
              type: "error",
              message: "Sign in failed. Please try again.",
            })
          }
          text="signin_with"
          shape="rectangular"
          theme="outline"
          width="280"
        />
      )}
    </div>
  );
};

export default AuthHandler;
