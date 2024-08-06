import wheelIcon from "../../../assets/pngs/wheel-icon-black.png";
import { FaRegEdit } from "react-icons/fa";

function ProfileHeader({ children, displayPic, setDisplayPic, isOpen, setIsOpen }) {

  
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


  console.log(displayPic)


  return (
    <div className="w-full h-[25%] border flex">
      <div className="w-[15%] flex items-center justify-center relative">
        <img className="h-[100px] w-[100px] rounded-full" src={displayPic ? displayPic : wheelIcon} />

        <input id='displayPic' type="file" onChange={(e) => {getImageURL(e, setDisplayPic)}} className="hidden" />
        <label htmlFor="displayPic" className="absolute left-4 top-4 cursor-pointer text-primaryColor text-lg" >
          <FaRegEdit />
        </label>
      </div>

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
            <button onClick={() => setIsOpen(true)} className="text-primaryColor border h-fit border-primaryColor py-1 px-2 text-sm">
              Update Details
            </button>
          </div>
        </div>

        {/* Attributes section */}
        <ul className="flex justify-between h-[50%] items-center">
          {children}
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
