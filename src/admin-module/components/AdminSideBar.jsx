import React, { useContext } from "react";
import mainLogo from "../../assets/svgs/main-logo.svg";
import mainLogoTwo from "../../assets/pngs/main-logo-icon.png";
import useCompanyProfile from "../../hooks/useCompanyProfile";
import { resourceUrl } from "../../services/axios-client";
import { MdClose } from "react-icons/md";

function AdminSideBar({
  children,
  authDetails,
  toogleIsOpen,
  isMenuOpen,
  userName, // Add userName prop
}) {

  
  return (
    <>
      <aside className="w-[18%] hidden h-full items-center bg-secondaryColor px-2 pb-2 md:flex flex-col justify-start overflow-y-auto">
        <img src={mainLogoTwo} className="w-[80%] max-w-[150px] my-4" />
        <img src={authDetails?.user?.profile_image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeD-zj7jRUxUFZ6zAIqvdnR2YPYRQHMi4Mvw&s"}
         alt="admin profile" className="h-[70px] w-[70px] rounded-full object-cover mb-4" />
        <h1 className="pb-4 font-bold">{authDetails?.name}</h1> {/* Display userName */}
        <nav className="w-full flex flex-col justify-start gap-[20px] divide-y-2">
          {children[0]}
          <div className="flex flex-col gap-[5px] ">
            <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">
              Personalise
            </h3>
            {children[1]}
          </div>
        </nav>
      </aside>

      <aside
        className={`${isMenuOpen ? "left-0" : "left-[-100%]"
          } w-[70%] absolute z-[999] h-screen items-center bg-secondaryColor px-2 pb-2 flex flex-col overflow-y-auto`}
      >
        <div className="flex items-center gap-[10px] my-4">
          <MdClose
            onClick={toogleIsOpen}
            className="text-primarycolor text-3xl"
          />
          <img src={mainLogoTwo} className="w-[80%] max-w-[150px] my-4" />
          </div>
       <div className="flex flex-col ">
       
        <img src={authDetails?.user?.profile_image ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeD-zj7jRUxUFZ6zAIqvdnR2YPYRQHMi4Mvw&s"}
         alt="admin profile" className="h-[70px] w-[70px] rounded-full object-cover mb-4" />
        <h1 className="pb-4 font-bold">{authDetails?.user?.name}</h1> {/* Display userName */}
       </div>
        

        <nav className="w-full flex flex-col justify-start gap-[20px] divide-y-2">
          {children[0]}
          <div className="flex flex-col gap-[5px] ">
            <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">
              Personalise
            </h3>
            {children[1]}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default React.memo(AdminSideBar);