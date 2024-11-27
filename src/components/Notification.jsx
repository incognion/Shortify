const Notification = ({ notification }) => {
    if (!notification) return null;
  
    return (
        <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded shadow-lg text-white transition-opacity ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{ opacity: notification ? 1 : 0 }}
      >
        {notification.message}
      </div>
      
    );
  };
  
  export default Notification;
  