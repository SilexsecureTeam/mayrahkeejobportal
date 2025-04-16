import { useLocation, useParams } from "react-router-dom";
import ApplicantHeader from "./ApplicantHeader";
import ApplicantProfileCard from "./ApplicantProfileCard";
import MainContent from "./MainContent";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../services/axios-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContex";
import { PiSpinnerGap } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6"
const ApplicantDetails = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const initData = async () => {
      setLoading(true)
      try {
        const { data } = await client.get(`/domesticStaff/get-staff/${id}`);
        console.log(id, data)
        if (data.data) {
          setStaff(data.data);
        }
      } catch (error) {
        toast.error("Unable to retrieve staff data");
      }finally{
        setLoading(false)
      }
    };

    initData();
  }, []);

  return (
    <div className="p-5 bg-white min-h-screen text-gray-900">
    <button
        type="button"
        onClick={() => window.history.back()}
        className="my-2 w-max flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
      >
        <FaArrowLeftLong className="me-4 text-green-500" />Back
      </button>
      {!loading ? (
        staff &&
        <>
        

          <ApplicantHeader staff={staff} setStaff={setStaff} />
          <div className="flex gap-4 flex-col lg:flex-row">
            <ApplicantProfileCard userData={staff} />
            <MainContent staff={staff} />
          </div>
        </>
      ) : (
        <div className="h-screen w-full flex text-3xl text-primaryColor  flex-col items-center justify-center gap-3">
          <PiSpinnerGap className="animate-spin" />
          <span className="text-sm">Fetching data....</span>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetails;
