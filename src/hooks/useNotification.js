import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../services/axios-client";
import { FormatError } from "../utils/formmaters";
import { onFailure } from "../utils/notifications/OnFailure";
import { AuthContext } from "../context/AuthContex";

function useNotification(role) {
  const [details, setDetails] = useState({
    application_notifications: false,
    message_notifications: false,
    email_notifications: false,
  });

  const [notifications, setNotifications] = useState()
  const { authDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    message: "",
    error: "",
  });
  const [] = useState();

  const client = axiosClient(authDetails?.token);

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const updateNotificationSetting = async (onSuccess) => {
    setLoading(true);
    try {
      const dataToSend = {
        user_id: authDetails.user.id,
        user_type: authDetails.user.role || 'domestic',
        ...details,
      };
      const {data} = await client.patch(`/notification-settings`, dataToSend);
      onSuccess();
      setDetails({...data.settings})
    } catch (e) {
      FormatError(e, setError, "Notification Error");
    } finally {
      setLoading(false);
    }
  };

  const getNotificationSetting = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        user_id: authDetails?.user.id,
        user_type: authDetails?.user.role || 'domestic',
      };
      const {data} = await client.post(`/notification-settings`, dataToSend);

      setDetails({...data.settings[0]})
      
      return data.settings ? {...data.settings[0]} : {}
    } catch (e) {
      FormatError(e, setError, "Notification Error");
      return {}
    } finally {
      setLoading(false);
    }
  };

  const getNotifications= async () => {
    setLoading(true);
    try {
      const dataToSend = {
        user_id: authDetails?.user?.id,
        user_type: authDetails?.user?.role,
      };
      const {data} = await client.post(`/notification`, dataToSend);
          
      if(data['notification not found'].length === 0 ){
          setNotifications([])
      }

    } catch (e) {
    //   FormatError(e, setError, "Notification Error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (error.message && error.error) {
      onFailure(error);
    }
  }, [error.message, error.error]);

 
  return {
    details,
    loading,
    notifications,
    setDetails,
    onTextChange,
    updateNotificationSetting,
    getNotifications,
    getNotificationSetting,
  };
}

export default useNotification;
