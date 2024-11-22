import React, { useContext,useEffect } from "react";
import mainLogo from "../../assets/svgs/main-logo.svg";
import mainLogoTwo from "../../assets/pngs/main-logo-icon.png";
import { MdClose } from "react-icons/md";
import { resourceUrl } from "../../services/axios-client";
import { ResourceContext } from "../../context/ResourceContext";
import { IMAGE_URL } from "../../utils/base";

function SideBar({ children, authDetails, toogleIsOpen, isMenuOpen }) {
  const { getCandidate, setGetCandidate } = useContext(ResourceContext);s
  
  useEffect(() => {
    setGetCandidate((prev) => ({
      ...prev, isDataNeeded: true
    }));
  }, []);

  const candidate = getCandidate.data?.details;
  // const {} = useContext()

  return (
    <>
      <aside className="w-[18%] min-w-[200px] hidden relative h-full items-center bg-secondaryColor px-2 pb-2 md:flex flex-col justify-end">
        <img src={mainLogoTwo} className="w-[80%]" />
        <nav className="h-[92%] w-full flex flex-col justify-start gap-[20px] divide-y-2">
          {children[0]}
          <div className="flex flex-col gap-[5px] ">
            <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">
              More
            </h3>
            {children[1]}
          </div>
        </nav>

        {/* Green slide */}
        <div className="absolute bottom-0 left-0 w-full h-40  overflow-hidden">
        <div className="w-[500px] h-full relative bg-primaryColor transform -rotate-12 origin-bottom-right" />
      </div>

        {/* user info  */}
        <div className="max-w-full absolute bottom-3 pl-2 flex gap-[5px]  items-center">
        
          <div className="w-1/5 flex-1 flex flex-col">
            <span className="text-secondaryColor text-sm">
              {`${authDetails?.user?.first_name} ${authDetails?.user?.last_name}`}
            </span>
            <span className="text-gray-300 text-[11px]">
              {authDetails?.user?.email}
            </span>
          </div>
          <img
             src={candidate?.profile ? `${IMAGE_URL}/${candidate.profile}` : 'https://via.placeholder.com/150'}
            className="flex-shrink-0 h-[45px] w-[45px] rounded-full bg-secondaryColor max-[1200px]:mt-[-30px] transition-all duration-500 object-cover"
          />
        </div>
      </aside>

      <aside
        className={`${
          isMenuOpen ? "left-0" : "left-[-100%]"
        } w-[300px] absolute z-[999] h-screen items-center bg-secondaryColor px-2 pb-2 flex flex-col`}
      >
        <div className="flex items-center gap-[10px]">
          <MdClose
            onClick={toogleIsOpen}
            className="text-primarycolor text-3xl"
          />
          <img src={mainLogoTwo} className="w-[60%]" />
        </div>
        <nav className="h-[92%] w-full flex flex-col justify-start gap-[20px] divide-y-2">
          {children[0]}
          <div className="flex flex-col gap-[5px] ">
            <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">
              More
            </h3>
            {children[1]}
          </div>
        </nav>

        {/* Green slide */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
          <div className="w-[120%] h-full relative bg-primaryColor transform -rotate-12 origin-bottom-right" />
        </div>

        {/* user info  */}
        <div className="absolute bottom-3 right-4 flex gap-3  items-center">
         
          <div className="flex-col flex">
            <span className="text-secondaryColor text-sm">
              {`${authDetails?.user?.first_name} ${authDetails?.user?.last_name}`}
            </span>
            <span className="text-gray-300 text-[11px]">
              {authDetails?.user?.email}
            </span>
          </div>
          <img
          src={candidate?.profile ? `${IMAGE_URL}/${candidate.profile}` : 'https://via.placeholder.com/150'}
            className="h-[45px] w-[45px] rounded-full bg-primaryColor object-cover"
          />
        </div>
      </aside>
    </>
  );
}

export default React.memo(SideBar);
