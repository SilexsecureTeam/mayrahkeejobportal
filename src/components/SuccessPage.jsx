// SuccessPage.js
import { useLocation, useNavigate } from "react-router-dom";
import img from "../assets/pngs/success-img.png";
import { AuthContext } from "../context/AuthContex";
import { useContext } from "react";

const SuccessPage = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const { authDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = authDetails.user.role === "employer" ? "company" : "applicant";
  const type =
    data && data[0]?.domestic_staff?.staff_category?.includes("artisan")
      ? "artisan"
      : "staff";
  console.log(data);

  const navigateToApplicantDetails = () =>
    navigate(`/${role}/staff/contract-history`, {
      state: {
        data: { type },
      },
    });

  if (!data) {
    navigate(-1);
    return;
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-white p-8 h-fit rounded-lg text-center">
        <img
          src={img}
          alt="Success Illustration"
          className="mx-auto mb-6 w-52 md:w-[413px] md:h-[355px]"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Payment approved
        </h1>
        <p className="text-lg text-gray-600 mb-4">Congratulations</p>
        <button
          onClick={navigateToApplicantDetails}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
