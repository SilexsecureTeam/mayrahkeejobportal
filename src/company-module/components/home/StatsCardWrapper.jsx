import { useContext } from "react";
import { stats_cards_dummies } from "../../../utils/dummies";
import StatsCard from "./StatsCard";
import { CompanyRouteContext } from "../../../context/CompanyRouteContext";
import { useNavigate } from "react-router-dom";

function StatsCardWrapper({ applicants }) {
  const { setSideBar } = useContext(CompanyRouteContext);
  const navigate = useNavigate();

  return (
    <ul className="flex w-full justify-between h-[50px]">
      {stats_cards_dummies.map((currentStat) => {
        let value = 0;
        let onClick = () => {};
        if (currentStat.id == 1) {
          value = applicants;
          onClick = () => {
            setSideBar(2);
            navigate('/company/applicants')
          };
        }
        return <StatsCard key={currentStat.id} data={currentStat} value={value} onClick={onClick} />;
      })}
    </ul>
  );
}

export default StatsCardWrapper;
