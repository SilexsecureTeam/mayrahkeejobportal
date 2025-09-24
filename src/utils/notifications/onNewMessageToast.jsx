import { toast } from "react-toastify";
import { FaCommentDots } from "react-icons/fa";
import notificationSound from "../../assets/audio/bell.mp3";
import audioController from "../audioController";

export const onNewNotificationToast = ({
  senderName,
  message,
  type = "message", // "message" | "call"
  onClick = () => {},
}) => {
  audioController.playRingtone(notificationSound);

  const toastComponent = (
    <div className="flex items-start gap-3 cursor-pointer">
      <FaCommentDots className="text-2xl text-oliveDark mt-1" />

      <div>
        <p className="font-semibold text-sm text-oliveDark">
          {`New message from ${senderName}`}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
          {message || "You received a new message"}
        </p>
      </div>
    </div>
  );

  toast(toastComponent, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    onClick,
  });
};
