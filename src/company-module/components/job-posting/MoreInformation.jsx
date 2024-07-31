import stethoscopeIcon from "../../../assets/pngs/stethoscope-icon.png";
import wavyIcon from "../../../assets/pngs/wavy-icon.png";
import cameraIcon from "../../../assets/pngs/camera-2-icon.png";
import { IoMdClose } from "react-icons/io";

const benefits = [
  {
    id: 1,
    title: "Full Healthcare",
    desc: "We believe in thriving communities and that starts with our team being happy and healthy.",
    icon: stethoscopeIcon,
  },
  {
    id: 2,
    title: "Unlimited Vacation",
    desc: "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    icon: wavyIcon,
  },
  {
    id: 3,
    title: "Skill Development",
    desc: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    icon: cameraIcon,
  },
];

function MoreInformation() {
  return (
    <div className="flex w-full flex-col p-2">
      {/* More Info */}
      <div className="flex flex-col gap-[15px] border-b pb-2">
        <h3 className="text-gray-700 text-sm font-semibold">
          More Information
        </h3>
        <span className="text-little text-gray-400">
          List out your top perks and benefits.
        </span>
      </div>

      {/* Benefits */}
      <div className="flex gap-[30px] border-b py-2 ">
        <div className="flex flex-col max-w-[25%] gap-[10px]">
          <h3 className="text-gray-700 text-sm font-semibold">
            Perks and Benefits
          </h3>
          <span className="text-little text-gray-400">
            Encourage more people to apply by sharing the attractive rewards and
            benefits you offer your employees
          </span>
        </div>

        <div className="flex flex-col gap-[3px] ">
          <button className="border py-[3px] px-1 w-fit text-little border-primaryColor text-primaryColor">
            Add Benefit
          </button>

          <ul className="grid grid-cols-2 gap-5">
            {benefits.map((current, index) => (
              <li className="w-[180px] h-[160px] gap-2 text-gray-400 justify-between py-3 px-2 border flex flex-col">
                <div className="flex w-full justify-between ">
                  <img src={current.icon} className="h-[30px]" />
                  <IoMdClose className="text-md" />
                </div>

                <div className="flex w-full text-little flex-col gap-1">
                  <span className="text-[15px] font-semibold text-gray-700">
                    {current.title}
                  </span>
                  <span className="text-little ">{current.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button onClick={() => setCurrentStep(data[1])} className="p-2 place-self-end mt-[10px] font-semibold w-fit text-little bg-primaryColor text-white">Do a Review</button>
    </div>
  );
}

export default MoreInformation;
