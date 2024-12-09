import { useState } from "react";
import {
  admin_exlusve_dummies,
  exclusives_table_head_dummies,
  job_table_head_dummies,
} from "../../../utils/dummies";
import SummaryCard from "../../components/SummaryCard";
import TableRow from "../../components/TableRow";
import TableWrap from "../../components/TableWrap";
import { useNavigate } from "react-router-dom";

function SingleExclusive() {
  const navigate = useNavigate();
  const [selectedCard, setSelectCard] = useState(admin_exlusve_dummies[1]);

  const navigateToSingle = () => {
    navigate("/admin-exclusives/job/1");
  };

  return (
    <div className="w-full flex flex-col px-10 h-full mt-5">
      <div className="grid grid-cols-2 justify-between items-center w-full min-h-[30%] bg-gray-50">
        <div className=" p-5 flex flex-col gap-2">
          <h1 className="text-md font-semibold text-gray-500">
            Employer Information
          </h1>

          <div className="w-full flex-col flex ">
            <span className="p-1 text-gray-500 bg-gray-100">Full Name</span>
            <span className="p-1">Example User</span>
          </div>

          <div className="w-full flex-col flex ">
            <span className="p-1 text-gray-500 bg-gray-100">Email Address</span>
            <span className="p-1">mr@example.com</span>
          </div>

          <div className="w-full flex-col flex ">
            <span className="p-1 text-gray-500 bg-gray-100">Phone Numbr</span>
            <span className="p-1">09035673994</span>
          </div>

          <span className="text-green-500 cursor-pointer hover:underline">
            Show More
          </span>
        </div>

        <div className=" p-5 flex flex-col gap-2">
          <h1 className="text-md font-semibold text-gray-500">
            Company Information
          </h1>

          <div className="w-full flex-col flex ">
            <span className="p-1 text-gray-500 bg-gray-100">Company Name</span>
            <span className="p-1">Example User</span>
          </div>

          <div className="w-full flex-col flex ">
            <span className="p-1 text-gray-500 bg-gray-100">Email Address</span>
            <span className="p-1">mr@example.com</span>
          </div>

          <div className="w-full flex-col flex ">
            <span className="p-1 text-gray-500 bg-gray-100">Phone Numbr</span>
            <span className="p-1">09035673994</span>
          </div>
          <span className="text-green-500 cursor-pointer hover:underline">
            Show More
          </span>
        </div>

        <div className="w-[45%]"></div>
      </div>

      <ul className="w-full grid grid-cols-3 gap-4 my-8 ">
        {admin_exlusve_dummies
          .filter((current) => current.id !== 1)
          .map((current) => (
            <div onClick={() => setSelectCard(current)}>
              <SummaryCard key={current.id} {...current} />
            </div>
          ))}
      </ul>

      <div className="flex flex-col gap-3">
        <span className="text-lg font-semibold">
          List of {selectedCard.id === 2 ? `Applicants` : "Jobs"}
        </span>
        <TableWrap
          rows={
            selectedCard.id === 2
              ? exclusives_table_head_dummies
              : job_table_head_dummies
          }
        >
          <TableRow navigateToSingle={navigateToSingle} />
        </TableWrap>
      </div>
    </div>
  );
}

export default SingleExclusive;
