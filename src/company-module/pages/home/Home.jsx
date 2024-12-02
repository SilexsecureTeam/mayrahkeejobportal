import { Helmet } from "react-helmet";
import calanderTest from "../../../assets/pngs/calander-test.png";
import StatsCardWrapper from "../../components/home/StatsCardWrapper";
import JobStatsAndSummary from "../../components/home/JobStatsAndSummary";
import JobStatistic from "../../components/home/JobStatistic";
import JobOpen from "../../components/home/JobOpen";
import ApplicantSummary from "../../components/home/ApplicantSummary";
import JobUpdates from "../../components/home/JobUpdates";
import useJobManagement from "../../../hooks/useJobManagement";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContex";
import { ApplicationContext } from "../../../context/ApplicationContext";
import { useEffect } from "react";
import { JobContext } from "../../../context/JobContext";
import { stages } from "../../../utils/constants";
import { generateDateRange } from "../../../utils/formmaters";
import { SubscriptionContext } from "../../../context/SubscriptionContext";
import { IoGift } from "react-icons/io5";
import SubscriptionOffer from "../../../components/SubsciptionOffer";

function Home() {
  const { authDetails } = useContext(AuthContext);
  const jobUtils = useJobManagement();

  const { getApplicantsByEmployee, applicants } =
    useContext(ApplicationContext);

  const { jobList } = useContext(JobContext);

  const openJobs = jobList?.filter((current) => (current.status = "1"));

  const applicantsJobType = () => {
    const categories = [];

    applicants?.map((current) => {
      const findCat = categories.find(
        (currentCat) => currentCat == current.job_id
      );
      if (findCat?.length > 0 || typeof findCat !== "undefined") {
        return;
      }

      categories.push(current.job_id);
    });

    const categoriesWithValues = {};

    categories.map((current) => {
      const catApplicants = applicants.filter(
        (currentApp) => currentApp.job_id === current
      );

      categoriesWithValues[current] = [...catApplicants];
    });

    return categoriesWithValues;
  };

  const value = applicantsJobType();

  const applicantToReview = applicants.filter(
    (current) =>
      current.status === stages[0].name || current.status === "pending"
  );

  useEffect(() => {
    getApplicantsByEmployee();
  }, []);

  return (
    <>
      <Helmet>
        <title>Company Dashboard | Home</title>
      </Helmet>
      <div className="h-fit w-full py-5 px-2 md:px-12 gap-[15px] flex flex-col">
        <SubscriptionOffer />
        {/* First ROw */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-[5px]">
            <h2 className="font-semibold text-lg">
              Welcome back, {authDetails.user.name.split(" ")[0]}
            </h2>
            <span className="text-little text-gray-400">
              Here is your job listings statistic report from{" "}
              {generateDateRange()}.
            </span>
          </div>

          {/* <img src={calanderTest} className="w-[12%] h-[35px] object-contain" /> */}

          {/* <div className="px-1 py-1 border hidden md:flex cursor-pointer gap-[10px] h-fit text-little items-center">
            <span>{new Date().toLocaleDateString()}</span>
            <GrSchedules className="text-primaryColor text-sm" />
          </div> */}
        </div>

        {/* Second Row */}
        <StatsCardWrapper applicants={applicantToReview} />

        {/* Third Row */}
        <JobStatsAndSummary>
          <JobStatistic applicants={applicants} byCategory={value} />
          <div className="flex flex-col w-full md:w-[30%] px-3 h-fit md:h-full justify-between">
            <JobOpen data={openJobs} />
            <ApplicantSummary applicants={applicants} byCategory={value} />
          </div>
        </JobStatsAndSummary>

        {/* Fourth Row */}
        {applicants && (
          <JobUpdates jobs={jobUtils.jobList} applicants={applicants} />
        )}
      </div>
    </>
  );
}

export default Home;
