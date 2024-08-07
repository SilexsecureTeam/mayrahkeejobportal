import { Helmet } from "react-helmet";
import { CiFlag1, CiInstagram, CiTwitter } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { GrLanguage, GrLocation } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import twitter from "../../../assets/pngs/twitter-icon.png"
import thread from "../../../assets/pngs/thread.png"
import eduIcon from "../../../assets/pngs/edu-icon.png"
import eduIcon2 from "../../../assets/pngs/edu-icon2.png"
import { MdOutlineEmail, MdOutlinePhoneIphone } from "react-icons/md";
import { IoLanguageOutline } from "react-icons/io5";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContex";
import UpdateCandidateProfile from "../settings/components/UpdateCandidateProfile";
import { ResourceContext } from "../../../context/ResourceContext";

function PublicProfile() {

  const { getCandidate, setGetCandidate } = useContext(ResourceContext);
  const { authDetails } = useContext(AuthContext);
  const user = authDetails?.user

  useEffect(() => {
    setGetCandidate((prev) => {
      return {
        ...prev, isDataNeeded: true
      }
    })
  }, [])

  const candidate = getCandidate.data?.details
  console.log(getCandidate.data)

  return (
    <>
      <Helmet>
        <title>Dashboard | Public Profile </title>
      </Helmet>
      <div className="h-full w-full p-6">
        <div className="flex">
          <div className="md:w-[70%]">
            <div className="border">
              <div className="bg_layout p-4 h-[150px]">
                <div className="flex justify-end text-white">
                  <button className="p-1 border border-white hover:text-gray-200"><FaRegEdit /></button>
                </div>
              </div>
              <div className="p-4 flex">
                <div className="mr-5">
                  <div className="size-[120px] -mt-[50%] ring-white ring-4 rounded-full bg-gray-300"></div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="">
                    <h4 className="font-bold mb-4">{user?.first_name} {user?.last_name}</h4>
                    <div className="text-[#7C8493]">
                      <p>{candidate?.preferred_job_role} <b className="text-black ml-2">Twitter</b></p>
                      <div className="my-3 flex">
                        <span className="mr-3">
                          <GrLocation />
                        </span>
                        <span className="">{candidate?.state}, {candidate?.country}</span>
                      </div>
                      <p><b>Address :</b> <span className="ml-2">{candidate?.address}</span></p>

                      <button className="p-2 mt-5 flex bg-green-100 hover:bg-green-200 text-green-900 items-center rounded">
                        <span className="mr-2">
                          <CiFlag1 />
                        </span>
                        OPEN FOR OPPORTUNITIES
                      </button>
                    </div>
                  </div>
                  <div className="">
                    <UpdateCandidateProfile />

                  </div>
                </div>
              </div>
            </div>
            <div className="border my-4">
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="font-bold">About Me</p>
                  <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
                </div>
                <div className="my-3 text-[#515B6F]">
                  <p className="my-3">{candidate?.personal_profile} </p>
                </div>
              </div>
            </div>
            <div className="border my-4">
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="font-bold">Experience</p>
                  <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><IoMdAdd /></button>
                </div>
                <div className="  divide-y">
                  <div className="py-6 text-sm text-[#515B6F]">
                    <div className="flex justify-b">
                      {/* {candidate?.experience} */}
                  <p dangerouslySetInnerHTML={{ __html: candidate?.experience }} />

                      {/* <div className="w-[30%]">
                        <img src={twitter} alt="" />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="font-bold ">Product Designer</p>
                          <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
                        </div>
                        <div className="">
                          <p><span className="font-medium">Twitter</span> · Full Time · Full TimeJun 2019 - Present (1y 1m)</p>
                          <p>Manchester, UK</p>
                          <p>
                            Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div className="py-6 text-sm text-[#515B6F]">
                    <div className="flex justify-b">
                      <div className="w-[30%]">
                        <img src={thread} alt="" />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="font-bold ">Product Designer</p>
                          <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
                        </div>
                        <div className="">
                          <p><span className="font-medium">Twitter</span> · Full Time · Full TimeJun 2019 - Present (1y 1m)</p>
                          <p>Manchester, UK</p>
                          <p>
                            Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-4">
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="font-bold">Education</p>
                  <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><IoMdAdd /></button>
                </div>
                <div className="  divide-y">
                  <div className="py-6 text-sm text-[#515B6F]">
                    {/* <div className="flex justify-b">
                      <div className="w-[30%]">
                        <img src={eduIcon} alt="" />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="font-bold ">International University</p>
                          <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
                        </div>
                        <div className="">
                          <p>Bachelor’s degree, Applied Psychology</p>
                          <p>2010 - 2012</p>
                          <p>
                            As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities by observing, analysing, researching and changing behaviour.                          </p>
                        </div>
                      </div>
                    </div> */}
                    {/* <p>{candidate?.educational_qualification}</p> */}
                    <p dangerouslySetInnerHTML={{ __html: candidate?.educational_qualification }} />

                  </div>
                  <div className="py-6 text-sm text-[#515B6F]">
                    <div className="flex justify-b">
                      <div className="w-[30%]">
                        <img src={eduIcon2} alt="" />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <p className="font-bold ">Product Designer</p>
                          <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
                        </div>
                        <div className="">
                          <p><span className="font-medium">Twitter</span> · Full Time · Full TimeJun 2019 - Present (1y 1m)</p>
                          <p>Manchester, UK</p>
                          <p>
                            Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-4">
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="font-bold">Education</p>
                  <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><IoMdAdd /></button>
                </div>
                <div className="flex flex-wrap">
                  <button className="p-2 m-2 flex bg-green-100 hover:bg-green-200 text-green-900 items-center rounded">
                    Communication
                  </button>
                  <button className="p-2 m-2 flex bg-green-100 hover:bg-green-200 text-green-900 items-center rounded">
                    Analytics
                  </button>
                  <button className="p-2 m-2 flex bg-green-100 hover:bg-green-200 text-green-900 items-center rounded">
                    Facebook Ads
                  </button>
                  <button className="p-2 m-2 flex bg-green-100 hover:bg-green-200 text-green-900 items-center rounded">
                    Content Planning
                  </button>
                  <button className="p-2 m-2 flex bg-green-100 hover:bg-green-200 text-green-900 items-center rounded">
                    Community Manager
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[30%] px-3">
            <div className="border p-2 mb-4">
              <div className="flex justify-between">
                <p className="font-bold ">Additional Details</p>
                <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
              </div>
              <div className="my-3 flex text-[#7C8493]">
                <span className="mr-2"><MdOutlineEmail />                </span>
                <div className="">
                  <p>Email</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="my-3 flex text-[#7C8493]">
                <span className="mr-2"><MdOutlinePhoneIphone />                </span>
                <div className="">
                  <p>Phone</p>
                  <p>{candidate?.phone_number}</p>
                </div>
              </div>
              <div className="my-3 flex text-[#7C8493]">
                <span className="mr-2"><IoLanguageOutline />                </span>
                <div className="">
                  <p>Language</p>
                  <p>{candidate?.languages}</p>
                </div>
              </div>
            </div>
            <div className="border p-2 mb-4">
              <div className="flex justify-between">
                <p className="font-bold ">Social Links</p>
                <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><FaRegEdit /></button>
              </div>
              {
                candidate?.social_media_handle?.map((social) => (
                  <div key={social.url} className="my-3 flex text-[#7C8493]">
                    <span className="mr-2"><CiInstagram />                </span>
                    <div className="">
                      <p>{social.network}</p>
                      <p className="text-green-700">{social.url}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PublicProfile;
