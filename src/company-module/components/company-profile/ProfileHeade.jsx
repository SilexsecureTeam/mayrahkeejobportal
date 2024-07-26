import wheelIcon from "../../../assets/pngs/wheel-icon-black-2.png";

function ProfileHeader({children}) {
  return (
    <div className="w-full h-[25%] border flex">
      <img className="p-4 w-[15%]" src={wheelIcon} />

      {/* Right hand */}
      <div className="flex flex-col h-full w-[85%] p-2">
        {/* Circle section */}
        <div className="flex justify-between h-[50%] items-center">
          <div className="flex flex-col gap-[5px]">
            <h2 className="font-bold text-3xl">Circle</h2>
            <a
              href="google.com"
              className="text-primaryColor underline text-sm"
            >
              https://circle.com
            </a>
          </div>
          <div className="flex gap-[5px]">
            <buttom className="text-primaryColor border h-fit border-primaryColor py-1 px-2 text-sm">
              Profile Setting
            </buttom>
          </div>
        </div>

        {/* Attributes section */}
         <ul className="flex justify-between h-[50%] items-center">{children}</ul>
      </div>   
    </div>
  );
}

export default ProfileHeader;
