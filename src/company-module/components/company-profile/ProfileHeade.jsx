import wheelIcon from "../../../assets/pngs/wheel-icon-black.png";
import { FaRegEdit } from "react-icons/fa";
import { resourceUrl } from "../../../services/axios-client";

function ProfileHeader({ children, isOpen, setIsOpen, details }) {
  const getImageURL = (e, setStateFunctionUrl) => {
    const { name } = e.target;
    const file = e.target.files[0]; //filelist is an object carrying all details of file, .files[0] collects the value from key 0 (not array), and stores it in file

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // You can also perform additional actions with the valid file
      const generatedUrl = URL.createObjectURL(file);
      setStateFunctionUrl(generatedUrl);
    } else {
      // Handle invalid file type
      alert("Please select a valid JPEG or PNG file.");
    }
  };


  console.log(`${resourceUrl}/${details?.logo_image}`)

  return (
    <div className="w-full h-[50vh] md:h-[25%] border flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 flex items-center justify-center relative">
        <img
          className="h-[80px] w-[80px] rounded-full mx-2"
          src={details?.logo_image ? `${resourceUrl}/${details?.logo_image}` : wheelIcon}
        />
      </div>

      {/* Right hand */}
      <div className="flex flex-col h-full justify-between w-full md:w-[90%] p-2">
        {/* Circle section */}
        <div className="flex justify-between h-[60%] items-center">
          <div className="flex flex-col gap-[3px] text-gray-800">
            <h2 className="font-bold text-3xl">{details?.company_name}</h2>
          
            <div className="flex flex-col md:flex-row md:w-full md:items-center gap-[10%]">
            <span className="flex gap-[5px] text-little">
              Email:
              <a className=" hover:underline cursor-pointer ">{details?.email}</a>
            </span>
            <hr className="md:block hidden w-[50px] border-gray-400 bg-gray-400 border h-[8px]"/>
            <span className="flex gap-[5px] text-little">
              Phone:
              <a className=" ">{details?.phone_number}</a>
            </span>

            </div>

            <span className="flex gap-[5px] text-little">
              Profile url:
              <a className="hover:underline cursor-pointer ">
                {details?.profile_url}
              </a>
            </span>
          </div>
          <div className="flex gap-[5px]">
            <button
              onClick={() => setIsOpen(true)}
              className="text-primaryColor border h-fit border-primaryColor py-1 px-2 text-sm"
            >
              Update Details
            </button>
          </div>
        </div>

        {/* Attributes section */}
        <ul className=" grid grid-cols-2 w-full gap-2 md:gap-0 md:flex justify-between border mt-[5px] p-2 h-[40%] items-center">
          {children}
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
