import React from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const AuthHandler = ({
    user,
    setUser,
    setUserUrls,
    fetchUserUrls,
    setNotification,
}) => {
    const handleCallbackResponse = (response) => {
        const userObject = jwt_decode(response.credential);
        setUser(userObject);

        localStorage.setItem('userToken', response.credential);
        localStorage.setItem('tokenExpiration', Date.now() + 24 * 60 * 60 * 1000);

        setTimeout(() => {
            fetchUserUrls(userObject.sub, setUserUrls, setNotification);
        }, 0);
    };

    const handleSignOut = () => {
        setUser(null);
        setUserUrls([]);
        localStorage.removeItem('userToken');
        localStorage.removeItem('tokenExpiration');
        googleLogout();
    };

    return (
        <>
            <div className="flex justify-between items-center w-full max-w-xl mx-auto mb-4">
                <div className="flex items-center">
                    {user && (
                        <>
                            <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full mr-2" />
                            <h1 className="text-xl font-semibold">{user.name}</h1>
                        </>
                    )}
                </div>
                {user && (
                    <button
                        onClick={handleSignOut}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                )}
            </div>

            <div className="mb-4">
                {!user && (
                    <GoogleLogin
                        onSuccess={handleCallbackResponse}
                        onError={() => setNotification({ type: 'error', message: 'Login Failed' })}
                    />
                )}
            </div>
        </>
    );
};

export default AuthHandler;
