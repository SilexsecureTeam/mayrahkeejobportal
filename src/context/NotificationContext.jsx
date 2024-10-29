import { createContext } from "react";
import useApplicationManagement from "../hooks/useApplicationManagement";
import useNotification from "../hooks/useNotification";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const {
    loading,
    details,
    notifications,
    setDetails,
    onTextChange,
    updateNotificationSetting,
    getNotifications,
    getNotificationSetting,
  } = useNotification();

  return (
    <NotificationContext.Provider
      value={{
        loading,
        details,
        notifications,
        setDetails,
        onTextChange,
        updateNotificationSetting,
        getNotifications,
        getNotificationSetting,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
