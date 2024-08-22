import { resourceUrl } from "../../../services/axios-client";

const stages = [
  {
    name: "In-Review",
    stage: "passed",
  },
  {
    name: "Shortlist",
    stage: "passed",
  },
  {
    name: "Interview",
    stage: "current",
  },
  {
    name: "Hired/Declined",
    stage: null,
  },
];

function Resume({data, applicant}) {
  const bgColor = (current) => {
    if (current.stage === "passed") {
      return "bg-primaryColor/80";
    } else if (current.stage === "current") {
      return "bg-primaryColor";
    } else {
      return "bg-gray-300";
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between px-10">
        <div className="flex flex-col text-little justify-center items-start gap-[2px]">
          <span className="font-semibold ">Portfolio Url</span>
          <a href={data?.portfolio_url} className="font-semibold ">{data?.portfolio_url}</a>
        </div>

        <div className="flex flex-col text-little justify-center items-start gap-[2px]">
          <span className="font-semibold ">NIN</span>
          <img
            src={`${resourceUrl}/${applicant?.nin_slip}`}
            className="h-[60px] w-[60px] bg-gray-400 rounded-full"
          />
        </div>
      
      </div>

      <div className="flex w-full px-10 mt-[5px]">
        <div className="flex flex-col w-[60%]">
          <h3 className="font-serif tracking-wide text-sm">Experience</h3>

          <ul className="flex flex-col text-gray-400 gap-[10px] text-little">
            <li className="flex flex-col gap-[5px] border-b">
              <span className="font-semibold text-gray-700 text-sm">
                Senior UI/UX Product Designer
              </span>
              <span className="">Enterprise Name: Satoshi Compant LTD</span>
              <span className="">Duration: Aug 2018 to present</span>
              <span className="">
                Description: Directly collaborated with CEO and Product team to
                prototype, design and deliver the UI and UX experience with a
                lean design process: research, design, test, and iterate.
              </span>
            </li>
            <li className="flex flex-col gap-[5px] border-b">
              <span className="font-semibold text-gray-700 text-sm">
                Senior UI/UX Product Designer
              </span>
              <span className="">Enterprise Name: Satoshi Compant LTD</span>
              <span className="">Duration: Aug 2018 to present</span>
              <span className="">
                Description: Directly collaborated with CEO and Product team to
                prototype, design and deliver the UI and UX experience with a
                lean design process: research, design, test, and iterate.
              </span>
            </li>
            <li className="flex flex-col gap-[5px] border-b">
              <span className="font-semibold text-gray-700 text-sm">
                Senior UI/UX Product Designer
              </span>
              <span className="">Enterprise Name: Satoshi Compant LTD</span>
              <span className="">Duration: Aug 2018 to present</span>
              <span className="">
                Description: Directly collaborated with CEO and Product team to
                prototype, design and deliver the UI and UX experience with a
                lean design process: research, design, test, and iterate.
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-end w-[35%] pt-4">

          <p className="w-[70%] text-gray-400 text-end text-little">leromebell@gmail.com +44 1245 572 135 Vernouillet</p>
        </div>
      </div>
    </>
  );
}

export default Resume;
