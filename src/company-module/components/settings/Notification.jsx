import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../../context/NotificationContext";
import NotificationCard from "./NotificationCard";
import FormButton from "../../../components/FormButton";
import { onSuccess } from "../../../utils/notifications/OnSuccess";

const notificatioTypes = [
  {
    id: "application_notifications",
    name: "Application Notification",
    description: "Subscribe to receiving applicants-based notifications",
  },
  {
    id: "email_notifications",
    name: "Email Notification",
    description: "Subscribe to receiving email notifications",
  },
];

function Notification() {
  const {
    updateNotificationSetting,
    loading,
    details,
    getNotificationSetting,
    setDetails,
  } = useContext(NotificationContext);

  const [initialValues, setInitialValues] = useState({});
  const [fetching, setFetching] = useState(true); // 🔥 separate fetching state

  useEffect(() => {
    const initData = async () => {
      setFetching(true);
      try {
        const data = await getNotificationSetting();
        setInitialValues(data);
      } finally {
        setFetching(false);
      }
    };

    initData();
  }, []);

  if (fetching) {
    // 🔥 Loading screen
    return (
      <div className="flex items-center justify-center w-full h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col p-2">
      {notificatioTypes.map((current) => (
        <NotificationCard
          key={current.id}
          id={current.id}
          initialValue={initialValues[current.id] ? true : false}
          details={details}
          setDetails={setDetails}
          title={current.name}
          description={current.description}
        />
      ))}

      <FormButton
        loading={loading}
        onClick={() =>
          updateNotificationSetting(() => {
            onSuccess({
              message: "Notifications",
              success: "Updated Successfully",
            });
          })
        }
        width="w-full md:w-max mt-[10px] bg-primaryColor text-white text-sm px-2"
      >
        Save Changes
      </FormButton>
    </div>
  );
}

export default Notification;
