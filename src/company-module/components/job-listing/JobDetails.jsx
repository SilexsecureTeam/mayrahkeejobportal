import blueTickIcon from "../../../assets/pngs/blue-tick-icon.png";

function JobDetails() {
  return (
    <div className="p-1 flex flex-col w-full gap-[15px]">
      <div className="w-full border justify-between px-2 py-1 flex items-center ">
        <div className="flex gap-[10px] items-center">
          <div className="h-[50px] w-[50px] bg-gray-300" />

          <h3 className="font-bold text-lg">Social Media Assistant</h3>
        </div>

        <button className="px-2 py-1 text-little border border-primaryColor text-primaryColor">
          Edit Job Details
        </button>
      </div>

      <div className="w-full">
        <div className="w-full flex justify-between">
          {/* Descriptions e.t.c */}
          <div className="w-[60%] flex flex-col gap-[10px]">
            <div className="flex flex-col">
              <span className="font-semibold text-md">Description</span>
              <p className=" text-little text-gray-400">
                Pattern is looking for Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </p>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-md">Responsibilities</span>
              <ul className=" flex flex-col gap-[5px] text-little text-gray-400">
                <li className="flex items-center gap-[5px]">
                  <img src={blueTickIcon} className="h-[15px] " />
                  <span>
                    Focus on social media content development and publication
                  </span>
                </li>
                <li className="flex items-center gap-[5px]">
                  <img src={blueTickIcon} className="h-[15px] " />
                  <span>
                    Community engagement to ensure that is supported and
                    actively represented online
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-md">Who are we</span>
              <ul className=" flex flex-col gap-[5px] text-little text-gray-400">
                <li className="flex items-center gap-[5px]">
                  <img src={blueTickIcon} className="h-[15px] " />
                  <span>
                    Focus on social media content development and publication
                  </span>
                </li>
                <li className="flex items-center gap-[5px]">
                  <img src={blueTickIcon} className="h-[15px] " />
                  <span>
                    Community engagement to ensure that is supported and
                    actively represented online
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="font-semibold text-md">Nice to haves</span>
              <ul className=" flex flex-col gap-[5px] text-little text-gray-400">
                <li className="flex items-center gap-[5px]">
                  <img src={blueTickIcon} className="h-[15px] " />
                  <span>
                    Focus on social media content development and publication
                  </span>
                </li>
                <li className="flex items-center gap-[5px]">
                  <img src={blueTickIcon} className="h-[15px] " />
                  <span>
                    Community engagement to ensure that is supported and
                    actively represented online
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* About the role */}
          <div className="flex flex-col justify- gap-[10px] pr-2">
            <div className="flex flex-col">
              <span className="font-semibold text-md">About this role</span>
              <div className=" text-little text-gray-400 gap-[10px] flex flex-col">
                <span className="font-semibold text-md p-2 bg-gray-100 text-center">
                  5 applied 0f 10 capacity
                </span>
                <span className=" text-md text-gray-400 gap-[10px] flex">
                  Apply before{" "}
                  <span className="text-gray-700">July 30, 2021</span>
                </span>
                <span className=" text-md text-gray-400 gap-[10px] flex">
                  Job posted on{" "}
                  <span className="text-gray-700">July 30, 2021</span>
                </span>
                <span className=" text-md text-gray-400 gap-[10px] flex">
                  Job Type<span className="text-gray-700">July 30, 2021</span>
                </span>
                <span className=" text-md text-gray-400 gap-[10px] flex">
                  Salary<span className="text-gray-700">$75k-$85k USD</span>
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-gray-300 w-full" />

            <div className="flex flex-col">
              <span className="font-semibold text-md">Categories</span>
              <div className="flex gap-[10px]">
                <span className=" text-little py-1 px-2 text-amber-500 rounded-[15px] bg-amber-300 text-center">
                  Marketing
                </span>
                <span className=" text-little py-1 px-2 text-green-500 rounded-[15px] bg-green-300 text-center">
                  Design
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-gray-300 w-full" />

            <div className="flex flex-col">
              <span className="font-semibold text-md">Required skills</span>
              <div className="flex gap-[10px]">
                <span className=" text-little py-1 px-2 text-green-400  bg-green-200 text-center">
                  Project Management
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
