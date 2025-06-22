import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import { ChatContext } from "../../context/ChatContext";
import { ApplicationContext } from "../../context/ApplicationContext";

function SideBarItem({ data, dispatch, state, setIsOpen }) {
  const navigate = useNavigate();
  const { unreadMessage } = useContext(ChatContext);
  const navigateToPage = async () => {
    if (data.type === "LOG-OUT") {
      sessionStorage.clear();
      localStorage.clear(); // in case you use it anywhere
      window.location.href = data.route; // ✅ full reload to login or landing page
    } else {
      dispatch({ ...data });
      navigate(data.route);
    }
    setIsOpen(false);
  };

  return (
    <li
      onClick={navigateToPage}
      className={`relative cursor-pointer flex gap-[10px] hover:bg-green-800 group items-center z-10 p-[5px] ${
        state?.type === data?.type ? "bg-primaryColor" : "bg-none"
      }`}
    >
      <img
        className="h-[20px] w-[20px]"
        src={state?.type === data?.type ? data.iconActive : data.icon}
      />
      <span
        className={`${
          state?.type === data?.type ? "text-white" : "text-primary"
        } text-sm group-hover:text-white`}
      >
        {data.title}
      </span>

      {/* Show a red dot for new messages */}
      {data.title === "Messages" && unreadMessage?.length > 0 && (
        <span className="absolute top-0 bottom-0 my-auto h-max right-2 px-2 bg-red-500 text-white font-medium rounded-full flex items-center justify-center">
          {unreadMessage?.length}
        </span>
      )}
    </li>
  );
}

export default React.memo(SideBarItem);
