import React from "react";

function SideBar({ children, user }) {
  return (
    <aside className="w-[18%] relative h-full items-center bg-secondaryColor p-2 flex flex-col justify-end">
      <nav className="h-[92%] w-full flex flex-col justify-start gap-[20px] divide-y-2">
        {children[0]}
        <div className="flex flex-col gap-[5px] ">
          <h3 className="px-2 text-primary text-sm mt-[10px] font-semibold">Personalise</h3>
          {children[1]}
        </div>
      </nav>

      {/* Green slide */}
      <div class="absolute bottom-0 left-0 w-full h-36 overflow-hidden">
        <div class="w-[120%] h-full relative bg-primaryColor transform -rotate-12 origin-bottom-right" />
      </div>

      {/* user info  */}
      <div className="absolute bottom-10 left-10 flex gap-[5px]  items-center">
        <img className="h-[35px] w-[35px] rounded-full bg-secondaryColor" />
        <div className="flex-col flex">
          <span className="text-secondaryColor text-sm">{user.name}</span>
          <span className="text-gray-300 text-[11px]">{user.email}</span>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(SideBar);
