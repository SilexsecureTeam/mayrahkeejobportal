import editIcon from "../../../assets/pngs/edit-icon.png";
import contactIcon from "../../../assets/pngs/add-icon.png";
import { company_socials } from "../../../utils/constants";

function DetailsLeft({ data }) {
  return (
    <div className="w-[60%] flex flex-col gap-[20px]">
      {/* Company Profile Section */}
      <div className="flex w-full flex-col gap-[10px] ">

        <div className="flex justify-between items-center w-full ">
          <h2 className="font-semibold text-md">Company Profile</h2>
        </div>
        <div
          className="text-sm text-gray-500 border border-dotted p-2"
          dangerouslySetInnerHTML={{ __html: data?.company_profile }}
        />
      </div>

      {/* Contact Section */}
      {/* <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
        <div className="flex justify-between items-center w-full ">
          <h2 className="font-semibold text-lg">Contact</h2>
          <div className="flex gap-[10px]">
            <img
              src={contactIcon}
              className="h-[25px] cursor-pointer w-[25px]"
            />
            <img src={editIcon} className="h-[25px] cursor-pointer w-[25px]" />
          </div>
        </div>

        <ul className="w-full grid grid-cols-2 text-start gap-y-2 text-gray-400 text-little">
          
        </ul>
      </div> */}

      {/* Working Nomad Section */}
      {/* <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
        <div className="flex justify-between items-center w-full ">
          <h2 className="font-semibold text-lg">Working at Nomad</h2>
          <div className="flex gap-[10px]">
            <img
              src={contactIcon}
              className="h-[25px] cursor-pointer w-[25px]"
            />
            <img src={editIcon} className="h-[25px] cursor-pointer w-[25px]" />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default DetailsLeft;
