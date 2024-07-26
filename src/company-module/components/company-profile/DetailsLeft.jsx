import editIcon from "../../../assets/pngs/edit-icon.png";
import contactIcon from "../../../assets/pngs/add-icon.png";
import { company_socials } from "../../../utils/constants";

function DetailsLeft() {
  return (
    <div className="w-[60%] flex flex-col gap-[20px]">
      {/* Company Profile Section */}
      <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
        <div className="flex justify-between items-center w-full ">
          <h2 className="font-semibold text-lg">Company Profile</h2>
          <img src={editIcon} className="h-[25px] cursor-pointer w-[25px]" />
        </div>

        <p className="w-full text-start text-gray-400 text-little">
          Nomad is a software platform for starting and running internet
          businesses. Millions of businesses rely on Stripe’s software tools to
          accept payments, expand globally, and manage their businesses online.
          Stripe has been at the forefront of expanding internet commerce,
          powering new business models, and supporting the latest platforms,
          from marketplaces to mobile commerce sites. We believe that growing
          the GDP of the internet is a problem rooted in code and design, not
          finance. Stripe is built for developers, makers, and creators. We work
          on solving the hard technical problems necessary to build global
          economic infrastructure—from designing highly reliable systems to
          developing advanced machine learning algorithms to prevent fraud.
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
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
          {company_socials.map((current) => (
            <li className="border-primaryColor w-[90%] border flex gap-[10px] p-2">
              <img src={current.icon} className="w-[20px] h-[20px]" />
              <span className="text-primaryColor underline cursor-pointer">{current.name}</span>
            </li>
          ))}
        </ul>
      </div>


      {/* Working Nomad Section */}
      <div className="flex w-full flex-col gap-[10px] border-b pb-[10px]">
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

      </div>
    </div>
  );
}

export default DetailsLeft;
