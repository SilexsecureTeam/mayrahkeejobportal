import { clear } from "idb-keyval";
import React from "react";
import { useNavigate } from "react-router-dom";

function SideBarItem({ data, dispatch, state }) {
<<<<<<< HEAD
=======
  
>>>>>>> 05fcba9ae1e82e443db1a4814162073e9cc5fe1f
  const navigate = useNavigate();

  const navigateToPage = () => {
    if (data.type === "LOG-OUT") {
      localStorage.clear();
      clear()
      navigate(data.route, { replace: true });
    } else {
      dispatch({ ...data });
      navigate(data.route);
    }
  };

<<<<<<< HEAD
=======

>>>>>>> 05fcba9ae1e82e443db1a4814162073e9cc5fe1f
  return (
    <li
      onClick={navigateToPage}
      className={`cursor-pointer flex gap-[10px] hover:bg-green-800 group items-center z-10 p-[5px] ${
        state?.type === data?.type ? "bg-primaryColor" : "bg-none"
      }`}
    >
<<<<<<< HEAD

=======
>>>>>>> 05fcba9ae1e82e443db1a4814162073e9cc5fe1f
      <img
        className="h-[20px] w-[20px]"
        src={state?.type === data?.type ? data.iconActive : data.icon}
      />
<<<<<<< HEAD
      
=======
>>>>>>> 05fcba9ae1e82e443db1a4814162073e9cc5fe1f
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
