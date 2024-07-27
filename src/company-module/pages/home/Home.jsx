import { Helmet } from "react-helmet";
import calanderTest from "../../../assets/pngs/calander-test.png";
import StatsCardWrapper from "../../components/home/StatsCardWrapper";
import JobStatsAndSummary from "../../components/home/JobStatsAndSummary";
import JobStatistic from "../../components/home/JobStatistic";
import JobOpen from "../../components/home/JobOpen";
import ApplicantSummary from "../../components/home/ApplicantSummary";
import JobUpdates from "../../components/home/JobUpdates";
import { applicants_summary_dummies, job_dummies } from "../../../utils/dummies";

function Home() {
  return (
    <>
      <Helmet>
        <title>Company Dashboard | Home</title>
      </Helmet>
      <div className="h-fit w-full p-5 gap-[15px] flex flex-col">

        {/* First ROw */}
        <div className="w-full flex justify-between">
          <div className="flex flex-col gap-[5px]">
            <h2 className="font-semibold">Good Morning, Maria</h2>
            <span className="text-little text-gray-400">
              Here is your job listings statistic report from July 19 - July 25.
            </span>
          </div>

          <img src={calanderTest} className="w-[12%] h-[35px] object-contain" />
        </div>

        {/* Second Row */}
        <StatsCardWrapper/>

        {/* Third Row */}
        <JobStatsAndSummary>
          <JobStatistic/>
          <div className="flex flex-col w-[30%] px-3 h-full justify-between">
             <JobOpen/>
             <ApplicantSummary applicants={applicants_summary_dummies}/>
          </div>
        </JobStatsAndSummary>
      
      
        {/* Fourth Row */}
        <JobUpdates jobs={job_dummies}/>
      </div>
    </>
  );
}

export default Home;
