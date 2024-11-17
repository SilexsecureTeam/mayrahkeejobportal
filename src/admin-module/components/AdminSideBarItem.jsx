import { clear } from "idb-keyval";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSideBarItem({ data, dispatch, state }) {
  const navigate = useNavigate();
console.log(state,data);

  const navigateToPage = () => {
    if (data.type === "LOG-OUT") {
      localStorage.clear();
      clear();
      navigate(data.route, { replace: true });
    } else {
      dispatch({ ...data });
      navigate(data.route);
    }
  };

  return (
    <li
      onClick={navigateToPage}
      className={`cursor-pointer flex gap-[10px] hover:bg-green-800 group items-center z-10 p-[5px] ${
        state?.type === data?.type ? "bg-[#47AA49]" : "bg-none"
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

export default React.memo(AdminSideBarItem);