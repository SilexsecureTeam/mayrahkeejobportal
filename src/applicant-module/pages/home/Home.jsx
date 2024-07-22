import { Helmet } from "react-helmet";
import docsIcon from "../../../assets/pngs/doc-vector.png"
import chatsIcon from "../../../assets/pngs/multiple-chat.png"
import RoundChart from "../../components/charts/RoundCharts";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdChevronLeft, MdChevronRight, MdOutlineMoreHoriz } from "react-icons/md";
import newApplicant from "../../../assets/pngs/applicant-logo1.png"
import newApplicant2 from "../../../assets/pngs/applicant-Logo2.png"
import newApplicant3 from "../../../assets/pngs/applicant-logo3.png"
import RecentlyAdded from "./RecentlyAdded";

function Home() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Home</title>
      </Helmet>
      <div className="h-full epilogue w-full text-sm p-4 text-primary">
        <div className="text-sm">
          <div className="flex justify-between align-center">
            <div className="">
              <h4 className="fair_clash bold text-2xl mb-5">Good morning, Jake</h4>
              <p>Here is what’s happening with your job search applications from July 19 - July 25.</p>
            </div>
            <div>
              <button className="border p-2 ">Jul 19 - Jul 25 </button>
            </div>
          </div>
          <div className="flex mt-8 gap-3">
            <div className="w-1/5 ">
              <div className="pb-1 h-1/2">
                <div className="border h-full mb-4 p-3 pb-0 flex flex-col justify-between">
                  <p className="font-medium">Total Jobs Applied</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-6xl font-medium">45</p>
                    <div className="">
                      <img src={docsIcon} alt="" className="w-10" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-1 h-1/2">
                <div className="border h-full mb-4 p-3 pb-0 flex flex-col justify-between">
                  <p className="font-medium">Interviewed</p>
                  <div className="flex justify-between items-end mt-4">
                    <p className="text-6xl font-medium">18</p>
                    <div className="">
                      <img src={chatsIcon} alt="" className="w-[60px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/5 border">
              <div className=" p-3">
                <p>Jobs Applied Status</p>
                <div className="my-5 flex items-center">
                  <div className="w-3/5">
                    <RoundChart />
                  </div>
                  <div className="w-2/5">
                    <div className="flex items-center">
                      <div className="size-3 rounded bg-[#0F5A02] mr-3"></div>
                      <div className="mb-2">
                        <p className="font-bold">60%</p>
                        <p>Unsuitable</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="size-3 rounded bg-[#E9EBFD] mr-3"></div>
                      <div className="mb-2">
                        <p className="font-bold">40%</p>
                        <p>Interviewed</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex my-3 items-center cursor-pointer prime_text hover:opacity-90">
                  <p>View All Applications</p>
                  <span className="ml-2"> <FaArrowRightLong /></span>
                </div>
              </div>
            </div>
            <div className="w-3/5 border py-3 text-sm">
              <div className="px-3 border-b">
                <p className="font-bold my-3">Upcomming Interviews</p>
              </div>
              <div className="px-3 flex border-b justify-between items-center">
                <p className=" my-3"><b>Today</b>, 26 November</p>
                <div className="flex">
                  <span className="mr-2"><MdChevronLeft /> </span>
                  <span><MdChevronRight /> </span>
                </div>
              </div>
              <div className="px-3 my-3 flex items-center">
                <p className="w-1/6">10:00 AM</p>
                <p className="border-b w-5/6 pt-1"> </p>
              </div>
              <div className="px-3 my-3 flex items-center">
                <p className="w-1/6">10:30 AM</p>
                <div className="bg-[#47AA4933] rounded w-5/6 p-3">
                  <div className="flex items-center">
                    <div className="size-12 mr-3 rounded-full bg-gray-100"></div>
                    <div className="w-80 divide-y-1 divide-inherit">
                      <p className="prime_text border-b border-4 font-medium">Joe Bartmann</p>
                      <p className="font-bold">HR Manager at Divvy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3 my-3 flex items-center">
                <p className="w-1/6">11:00 AM</p>
                <p className="border-b w-5/6 pt-1"> </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-12">
          <div className="border">
            <div className="p-3 border-b">
              <p className="font-bold text-base">Recent Application History</p>
            </div>
            <div className="p-3">
              <RecentlyAdded newApplicant={newApplicant} />
              <RecentlyAdded newApplicant={newApplicant2} />
              <RecentlyAdded newApplicant={newApplicant3} />

              <div className="my-4 flex justify-center">
                <div className="flex my-3 items-center cursor-pointer prime_text hover:opacity-90">
                  <p>View All Applications</p>
                  <span className="ml-2"> <FaArrowRightLong /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
