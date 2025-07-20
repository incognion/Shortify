const AuthTexts = ({onCloseAuthModal}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Welcome to Shortify
          </h3>
          <button
            onClick={onCloseAuthModal}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-6 text-center">
          Sign in to create custom URLs and manage your link history
        </p>
    </>
  )
}

export default AuthTexts
