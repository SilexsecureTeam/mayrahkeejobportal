import { clear } from "idb-keyval";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";

function SideBarItem({ data, dispatch, state, setIsOpen }) {
  const { setAuthDetails } = useContext(AuthContext);

  const navigate = useNavigate();

  const navigateToPage = () => {
    if (data.type === "LOG-OUT") {
      sessionStorage.clear();
      localStorage.clear(); // in case you use it anywhere
      window.location.href = data.route; // ✅ full reload to login or landing page
    } else {
      dispatch({ ...data });
      navigate(data.route);
      setIsOpen(false);
    }
  };

  return (
    <li
      onClick={navigateToPage}
      className={`cursor-pointer flex gap-[10px] hover:bg-green-800 group items-center z-10 p-[5px] ${
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
    </li>
  );
}

export default React.memo(SideBarItem);
