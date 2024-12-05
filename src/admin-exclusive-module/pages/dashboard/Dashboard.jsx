import { admin_exlusve_dummies } from "../../../utils/dummies";
import GridTableWrap from "../../components/GridTableWrap";
import SummaryCard from "../../components/SummaryCard";

function Dashboard() {

  return (
    <div className="px-12 py-5 flex flex-col gap-3">

      <div className="bg-primaryColor text-white gap-3 flex flex-col p-3">
        <p className="font-semibold">Manage all exclusive employers here</p>
        <p>
          You can add new employers, update the status of existing ones and
          manage all thier businesses
        </p>
      </div>

      
      <ul className="w-full grid grid-cols-3 gap-4 mt-8">
          {admin_exlusve_dummies.map(current => <SummaryCard key={current.id} {...current}/>)}
      </ul>

      {/*  */}
       <GridTableWrap/>
    </div>
  );
}

export default Dashboard;
