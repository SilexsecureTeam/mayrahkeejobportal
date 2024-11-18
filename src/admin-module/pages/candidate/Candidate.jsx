import { Helmet } from "react-helmet";
import {
  FaArrowTrendUp,
  FaPlus,
} from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { RiCalendarEventLine } from "react-icons/ri";
import { generateDateRange } from "../../../utils/formmaters";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { AdminRouteContext } from "../../../context/AdminRouteContext";
import { BsStopwatch } from "react-icons/bs";
import UseAdminManagement from "../../../hooks/useAdminManagement";
import CandidateUsageChart from './CandidateUsageChart';

function Candidate() {
  const { authDetails } = useContext(AuthContext);
  const { setSideBar } = useContext(AdminRouteContext);
  const { getCandidates } = UseAdminManagement();

  const [candidateCount, setCandidateCount] = useState(0);
  const [pending, setPending] = useState(0);
  const [interviewed, setInterviewed] = useState(0);
  const [shortlisted, setShortlisted] = useState(0);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    (async () => {
      const candidates = await getCandidates();
      console.log("candidate" + candidates);
      setCandidates(candidates);
      setCandidateCount(candidates.length);
      const pendingCandidates = candidates.filter(candid => candid.status === 'pending');
      setPending(pendingCandidates.length);
      const interviewedCandidates = candidates.filter(candid => candid.status === 'interviewed');
      setInterviewed(interviewedCandidates.length);
      const shortlistedCandidates = candidates.filter(candid => candid.status === 'shortlisted');
      setShortlisted(shortlistedCandidates.length);
    })();
  }, []);

  const navigate = useNavigate();
  const navigateToPage = (route, index) => {
    navigate(route);
    setSideBar(index);
  };

  return (
    <>
      <Helmet>
        <title>Admin| Dashboard</title>
      </Helmet>
      <div className="h-full p-6 w-full text-sm text-gray-800">
        <div className="text-sm">
          <div className="flex justify-between">
            <div className="">
              <h4 className="font-bold text-2xl mb-2">
                Welcome back, {authDetails?.user?.first_name}{" "}
                {authDetails?.user?.surname}
              </h4>
              <p>
                Here a summary of your recent activities {generateDateRange()}
              </p>
            </div>
            <div>
              <button className="border p-2 hidden md:flex items-center">
                {generateDateRange()}
                <RiCalendarEventLine className="ml-2" size={15} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            <div className="bg-orange-400 text-white px-4 py-12 rounded-md flex flex-col items-start cursor-pointer" onClick={() => navigate('/admin/candidates/all')}>
              <h3 className="text-xl font-bold">{candidateCount}</h3>
              <p>All Candidates</p>
            </div>
            <div className="bg-green-500 text-white px-4 py-12 rounded-md flex flex-col items-start">
              <h3 className="text-xl font-bold">{pending}</h3>
              <p>Pending</p>
            </div>
            <div className="bg-yellow-500 text-white px-4 py-12 rounded-md flex flex-col items-start">
              <h3 className="text-xl font-bold">{interviewed}</h3>
              <p>Interviewed</p>
            </div>
            <div className="bg-blue-700 text-white px-4 py-12 rounded-md flex flex-col items-start">
              <h3 className="text-xl font-bold">{shortlisted}</h3>
              <p>Shortlisted</p>
            </div>
            <div className="bg-cyan-950 text-white px-4 py-12 rounded-md flex flex-col items-start">
              <h3 className="text-xl font-bold">{candidateCount}</h3>
              <p>Total Jobs Applied</p>
            </div>
          </div>
          <div className="mt-8">
            <CandidateUsageChart candidates={candidates} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Candidate;