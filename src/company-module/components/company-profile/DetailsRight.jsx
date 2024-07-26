import editIcon from "../../../assets/pngs/edit-icon.png";
import contactIcon from "../../../assets/pngs/add-icon.png";
import { company_stack_socials } from "../../../utils/constants";

function DetailsRight() {
    return ( <div className="w-[30%] flex flex-col gap-[20px]">
      
        {/* Tech Stack Section */}
        <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
          <div className="flex justify-between items-center w-full ">
            <h2 className="font-semibold text-lg">Tech Stack</h2>
            <div className="flex gap-[10px]">
              <img
                src={contactIcon}
                className="h-[25px] cursor-pointer w-[25px]"
              />
              <img src={editIcon} className="h-[25px] cursor-pointer w-[25px]" />
            </div>
          </div>
  
          <ul className="w-full flex justify-between text-start  text-gray-400 text-little">
            {company_stack_socials.map((current) => (
              <li className=" flex flex-col gap-[5px] items-center p-2">
                <img src={current.icon} className="w-[30px] h-[30px]" />
                <span className="text-little ">{current.name}</span>
              </li>
            ))}
          </ul>
        </div>
  
  
        {/* Working Nomad Section */}
        <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
          <div className="flex justify-between items-center w-full ">
            <h2 className="font-semibold text-lg">Office Location</h2>
            <div className="flex gap-[10px]">
              <img
                src={contactIcon}
                className="h-[25px] cursor-pointer w-[25px]"
              />
              <img src={editIcon} className="h-[25px] cursor-pointer w-[25px]" />
            </div>
          </div>

          <ul className="flex flex-col gap-[10px] text-sm font-semibold">
            <li> -United States</li>
            <li>-England</li>
            <li>-Japan</li>
          </ul>
  
        </div>
      </div>);
}

export default DetailsRight;