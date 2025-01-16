import React, { useContext } from "react";
import mainLogo from "../../assets/svgs/main-logo.svg";
import mainLogoTwo from "../../assets/pngs/main-logo-icon.png";
import useCompanyProfile from "../../hooks/useCompanyProfile";
import { resourceUrl } from "../../services/axios-client";
import { MdClose } from "react-icons/md";
import wheelIcon from "../../assets/pngs/wheel-icon-black.png";

function SideBar({
  children,
  authDetails,
  companyHookProps,
  toogleIsOpen,
  isMenuOpen,
}) {
  const { details } = useCompanyProfile();

  const getImageURL = (image) => {
   

    if (typeof image === "string") {
      return `${resourceUrl}/${image}`
     
    } else {
      const generatedUrl = URL.createObjectURL(image);
      return generatedUrl
    }
  };
  return (
    <>
      {/* Main Sidebar */}
      <aside className="max-w-[220px] hidden h-full items-center bg-secondaryColor px-2 pb-2 lg:flex flex-col justify-between">
        {/* Logo */}
        <img src={mainLogoTwo} className="w-[80%]" />

        {/* Navigation */}
        <nav className="h-[92%] w-full flex flex-col justify-start gap-[20px] divide-y-2">
          {children[0]}
          <div className="flex flex-col gap-[5px]">
            <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">More</h3>
            {children[1]}
          </div>
        </nav>

        {/* Decorative Green Slide */}
        <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden">
          <div className="w-[500px] h-full relative bg-primaryColor transform -rotate-12 origin-bottom-right" />
        </div>

        {/* User Info Section */}
        <div className="absolute bottom-0 left-0 p-2 flex gap-[5px] items-end w-[220px]">
          <div className="flex-1 flex-col flex truncate">
            <span className="text-secondaryColor text-sm font-semibold truncate">{authDetails?.user?.name}</span>
            <span className="text-gray-300 text-xs truncate">{authDetails?.user?.email}</span>
          </div>
          <img
            src={details?.logo_image ? getImageURL(details?.logo_image) : "https://via.placeholder.com/150"}
            className="flex-shrink-0 h-[60px] w-[60px] rounded-full bg-secondaryColor max-[1200px]:mt-[-30px] transition-all duration-500 object-cover"
          />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`${
          isMenuOpen ? "left-0" : "left-[-100%]"
        } w-[70%] sm:w-[300px] absolute z-[999] h-screen items-center bg-secondaryColor px-2 pb-2 flex flex-col`}
      >
        <div className="flex items-center gap-[10px]">
          <MdClose onClick={toogleIsOpen} className="text-primarycolor text-3xl" />
          <img src={mainLogoTwo} className="w-[60%]" />
        </div>

        <nav className="h-[90%] overflow-y-auto w-full flex flex-col justify-start gap-[20px] divide-y-2">
          {children[0]}
          <div className="flex flex-col gap-[5px]">
            <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">Personalise</h3>
            {children[1]}
          </div>
        </nav>

        {/* Decorative Green Slide */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
          <div className="w-[120%] h-full relative bg-primaryColor transform -rotate-12 origin-bottom-right" />
        </div>

        {/* User Info Section (Mobile) */}
        <div className="absolute bottom-3 right-4 flex gap-3 items-end">
          <div className="flex-col flex">
            <span className="text-secondaryColor text-sm">{authDetails?.user?.name}</span>
            <span className="text-gray-300 text-xs">{authDetails?.user?.email}</span>
          </div>
          <img
            src={details?.logo_image ? getImageURL(details?.logo_image) : "https://via.placeholder.com/150"}
            className="h-[70px] w-[70px] rounded-full bg-primaryColor object-cover"
          />
        </div>
      </aside>
    </>
  );
}

export default React.memo(SideBar);
