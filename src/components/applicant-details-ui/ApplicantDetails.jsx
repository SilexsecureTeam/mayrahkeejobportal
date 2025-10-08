import { useParams } from "react-router-dom";
import ApplicantHeader from "./ApplicantHeader";
import ApplicantProfileCard from "./ApplicantProfileCard";
import MainContent from "./MainContent";
import { useContext, useEffect, useState } from "react";
import { axiosClient } from "../../services/axios-client";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContex";
import { PiSpinnerGap } from "react-icons/pi";
import { FaArrowLeftLong } from "react-icons/fa6";

const ApplicantDetails = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails.token);
  const { id } = useParams();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      try {
        // Fetch contract details for this staff
        const contractRes = await client.post(`/contracts/details`, {
          user_id: authDetails?.user?.id,
          user_type: authDetails?.user?.role,
          domestic_staff_id: id,
        });

        const contractData = contractRes?.data?.contracts[0];

        setStaff(contractData);
      } catch (error) {
        console.error("Error fetching staff details:", error);
        toast.error("Unable to retrieve staff and contract data.");
      } finally {
        setLoading(false);
      }
    };

    if (authDetails?.user && id) {
      initData();
    }
  }, [authDetails, id]);

  return (
    <div className="p-5 bg-white min-h-screen text-gray-900">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="my-2 w-max flex items-center gap-2 outline outline-offset-5 outline-green-500 px-4 py-2 rounded text-green-500 hover:bg-green-100"
      >
        <FaArrowLeftLong className="me-4 text-green-500" />
        Back
      </button>

      {!loading ? (
        staff ? (
          <>
            <ApplicantHeader staff={staff} setStaff={setStaff} />
            <div className="flex gap-4 flex-col lg:flex-row">
              <ApplicantProfileCard userData={staff} />
              <MainContent staff={staff} />
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 mt-20">
            No staff details found.
          </div>
        )
      ) : (
        <div className="h-screen w-full flex text-3xl text-primaryColor flex-col items-center justify-center gap-3">
          <PiSpinnerGap className="animate-spin" />
          <span className="text-sm">Fetching data...</span>
        </div>
      )}
    </div>
  );
};

export default ApplicantDetails;
