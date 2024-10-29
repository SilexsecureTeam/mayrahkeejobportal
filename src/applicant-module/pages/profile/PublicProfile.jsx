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
import { BASE_URL, IMAGE_URL } from "../../../utils/base";

function PublicProfile() {

  const { getCandidate, setGetCandidate } = useContext(ResourceContext);
  const { authDetails, userUpdate } = useContext(AuthContext);
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
  console.log(userUpdate)
  const bgImage = candidate?.background_profile ? `url('${IMAGE_URL}/${candidate?.background_profile}')` : "";
  console.log(bgImage)
  return (
    <>
      <Helmet>
        <title>Dashboard | Public Profile </title>
      </Helmet>
      <div className="h-full w-full p-8 px-5 md:px-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3">
            <div className="border">
              <div className="bg_layout p-4 h-[150px]" style={{ backgroundImage: bgImage}}>
                <div className="flex justify-end text-white">
                  {/* <button className="p-1 border border-white hover:text-gray-200"><FaRegEdit /></button> */}
                </div>
              </div>
              <div className="p-4 flex flex-wrap md:flex-nowrap">
                <div className="">
                  <div className="-mt-[50%] size-[120px] bg-gray-30">
                    <img src={`${IMAGE_URL}/${candidate?.profile}`} className=" ring-white ring-4 rounded-full " alt="profile image" />
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="">
                    <h4 className="font-bold mb-4">{candidate?.full_name}</h4>
                    <div className="text-[#7C8493]">
                      <p>{candidate?.preferred_job_role} <b className="text-black ml-2"></b></p>
                      <div className="my-3 flex">
                        <span className="mr-3">
                          <GrLocation />
                        </span>
                        <span className="">{candidate?.state}, {candidate?.country}</span>
                      </div>
                      <p><b>Address :</b> <span className="ml-2">{candidate?.contact_address}</span></p>
                      <div className="flex justify-between">
                        <p><b>Educational Qualification</b></p>
                        <p>{candidate?.educational_qualification?.toUpperCase()}</p>
                      </div>
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
                  {/* <button className="p-1 border border-green-500 text-green-700 hover:text-gray-600"><FaRegEdit /></button> */}
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
                  {/* <button className="p-1 border border-green-500   text-green-700 hover:text-gray-600"><IoMdAdd /></button> */}
                </div>
                <div className="  divide-y">
                  <div className="py-6 text-sm text-[#515B6F]">
                    <div className="flex justify-b">
                      {/* {candidate?.experience} */}
                      <p dangerouslySetInnerHTML={{ __html: candidate?.experience }} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="border my-4">
            </div>
            <div className="border my-4">
              <div className="p-4">
                <div className="flex justify-between">
                  <p className="font-bold mb-4">Keyword</p>
                  {/* <button className="p-1 border border-green-500 text-green-700 hover:text-gray-600"><IoMdAdd /></button> */}
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
          <div className="w-full md:w-1/3 px-3">
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
