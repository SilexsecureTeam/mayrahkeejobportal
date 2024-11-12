import wheelIcon from "../../../assets/pngs/wheel-icon.png";
import contactIcon from "../../../assets/pngs/add-icon.png";
import { company_stack_socials } from "../../../utils/constants";
import { apiURL, resourceUrl } from "../../../services/axios-client";

function DetailsRight({ data }) {
  return (
    <div className="w-full md:w-[30%] flex flex-col gap-[20px]">
      {/* Tech Stack Section */}
      <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
        <div className="flex justify-between items-center w-full ">
          <h2 className="font-semibold text-lg">Campany Logo</h2>
        </div>
        <img
          className="h-[80px] w-[80px] md:h-[100px] md:w-[100px] rounded-full object-cover"
          src={data?.logo_image ? `${resourceUrl}/${data?.logo_image}` : wheelIcon}
          alt="Profile"
        />

        {/*<ul className="w-full grid grid-cols-3 justify-between text-start  text-gray-400 text-little">
          {data?.company_campaign_photos?.map((current) => (
            <li className=" flex flex-col gap-[5px] items-center p-2">
              <img src={`${resourceUrl}/${current}`} className="w-[50px] bg-gray-300 h-[50px]" />
            </li>
          ))}
        </ul>*/}
      </div>

      {/* Working Nomad Section */}
      <div className="flex w-full flex-col gap-[5px] pb-[10px]">
        <div className="flex justify-between items-center w-full ">
          <h2 className="font-semibold text-lg">Primary Details</h2>
        </div>

        <ul className="flex flex-col divide-y-[1px] *:pt-[5px] gap-[5px] text-gray-800 text-little font-semibold">
          <li className="flex w-full justify-between pr-[10%]">
           <span>Company size</span>
           <span>{data?.company_size}</span>
          </li>

          <li className="flex w-full justify-between pr-[10%]">
           <span>Company Address</span>
           <span>{data?.address}</span>
          </li>

          <li className="flex w-full justify-between pr-[10%]">
           <span>RC Number</span>
           <span>{data?.rc_number}</span>
          </li>

          <li className="flex w-full justify-between pr-[10%]">
           <span>Sector</span>
           <span>{data?.sector}</span>
          </li>

          <li className="flex w-full justify-between pr-[10%]">
           <span>Incorperation Year</span>
           <span>{data?.year_of_incorporation}</span>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default DetailsRight;
