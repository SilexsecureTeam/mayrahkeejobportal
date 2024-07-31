import React from "react";
import mainLogo from '../../assets/svgs/main-logo.svg'


function SideBar({ children, authDetails }) {
  return (
    <aside className="w-[18%] relative h-full items-center bg-secondaryColor p-2 flex flex-col justify-end">
      <img src={mainLogo} className="w-[80%]"/>

      <nav className="h-[92%] w-full flex flex-col justify-start gap-[20px] divide-y-2">
        {children[0]}
        <div className="flex flex-col gap-[5px] ">
          <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">Personalise</h3>
          {children[1]}
        </div>
      </nav>

      {/* Green slide */}
      <div class="absolute bottom-0 left-0 w-full h-32  overflow-hidden">
        <div class="w-[120%] h-full relative bg-primaryColor transform -rotate-12 origin-bottom-right" />
      </div>

      {/* user info  */}
      <div className="absolute bottom-8 left-3 flex gap-[5px] w-full   items-center">
        <img className="h-[35px] w-[35px] rounded-full bg-secondaryColor" />
        <div className="flex-col flex">
          <span className="text-secondaryColor text-sm">{`${authDetails?.user?.first_name} ${authDetails?.user?.last_name}`}</span>
          <span className="text-gray-300 text-[11px]">{authDetails?.user?.email}</span>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(SideBar);
