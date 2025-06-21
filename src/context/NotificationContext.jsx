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
        getNotificationSetting,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
